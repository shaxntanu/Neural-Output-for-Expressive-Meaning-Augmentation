/**
 * NOEMA Core Implementation
 */

#include "noema_core.h"
#include <cmath>
#include <cstring>

NoemaCore::NoemaCore(int sr) : sampleRate(sr), lastCommand(CMD_NONE), 
                                confidence(0.0f), bufferIndex(0), samplesCollected(0) {
    memset(frontalBuffer, 0, sizeof(frontalBuffer));
    memset(motorBuffer, 0, sizeof(motorBuffer));
    memset(temporalBuffer, 0, sizeof(temporalBuffer));
    memset(occipitalBuffer, 0, sizeof(occipitalBuffer));
}

NoemaCore::~NoemaCore() {}

Command NoemaCore::processSample(float frontal, float motor, float temporal, float occipital) {
    // Add to circular buffers
    frontalBuffer[bufferIndex] = frontal;
    motorBuffer[bufferIndex] = motor;
    temporalBuffer[bufferIndex] = temporal;
    occipitalBuffer[bufferIndex] = occipital;
    
    bufferIndex = (bufferIndex + 1) % BUFFER_SIZE;
    if (samplesCollected < BUFFER_SIZE) {
        samplesCollected++;
    }
    
    // Classify every 0.5 seconds
    if (samplesCollected >= sampleRate / 2 && samplesCollected % (sampleRate / 2) == 0) {
        lastCommand = classifyPattern();
    }
    
    return lastCommand;
}

void NoemaCore::reset() {
    bufferIndex = 0;
    samplesCollected = 0;
    lastCommand = CMD_NONE;
    confidence = 0.0f;
    memset(frontalBuffer, 0, sizeof(frontalBuffer));
    memset(motorBuffer, 0, sizeof(motorBuffer));
    memset(temporalBuffer, 0, sizeof(temporalBuffer));
    memset(occipitalBuffer, 0, sizeof(occipitalBuffer));
}

float NoemaCore::calculateMean(const float* buffer, int length) {
    float sum = 0.0f;
    for (int i = 0; i < length; i++) {
        sum += buffer[i];
    }
    return sum / length;
}

float NoemaCore::calculateVariance(const float* buffer, int length, float mean) {
    float sum = 0.0f;
    for (int i = 0; i < length; i++) {
        float diff = buffer[i] - mean;
        sum += diff * diff;
    }
    return sum / length;
}

float NoemaCore::calculatePeakToPeak(const float* buffer, int length) {
    float min_val = buffer[0];
    float max_val = buffer[0];
    
    for (int i = 1; i < length; i++) {
        if (buffer[i] < min_val) min_val = buffer[i];
        if (buffer[i] > max_val) max_val = buffer[i];
    }
    
    return max_val - min_val;
}

int NoemaCore::countZeroCrossings(const float* buffer, int length) {
    int count = 0;
    for (int i = 1; i < length; i++) {
        if ((buffer[i-1] >= 0 && buffer[i] < 0) || (buffer[i-1] < 0 && buffer[i] >= 0)) {
            count++;
        }
    }
    return count;
}

bool NoemaCore::detectBlink(const float* buffer, int length) {
    float peakToPeak = calculatePeakToPeak(buffer, length);
    return peakToPeak > BLINK_THRESHOLD;
}

bool NoemaCore::detectJawClench(const float* buffer, int length, float& duration) {
    float peakToPeak = calculatePeakToPeak(buffer, length);
    
    if (peakToPeak < JAW_THRESHOLD) {
        return false;
    }
    
    // Estimate duration by counting samples above threshold
    int aboveThreshold = 0;
    float mean = calculateMean(buffer, length);
    
    for (int i = 0; i < length; i++) {
        if (fabs(buffer[i] - mean) > JAW_THRESHOLD / 2) {
            aboveThreshold++;
        }
    }
    
    duration = (float)aboveThreshold / sampleRate;
    return true;
}

bool NoemaCore::detectLateralAsymmetry(const float* leftBuffer, const float* rightBuffer, 
                                       int length, bool& leftActive) {
    float leftPower = 0.0f;
    float rightPower = 0.0f;
    
    for (int i = 0; i < length; i++) {
        leftPower += leftBuffer[i] * leftBuffer[i];
        rightPower += rightBuffer[i] * rightBuffer[i];
    }
    
    leftPower /= length;
    rightPower /= length;
    
    float diff = fabs(leftPower - rightPower);
    float avg = (leftPower + rightPower) / 2.0f;
    
    if (avg == 0) return false;
    
    float ratio = diff / avg;
    
    if (ratio > LATERAL_THRESHOLD) {
        leftActive = (leftPower > rightPower);
        return true;
    }
    
    return false;
}

Command NoemaCore::classifyPattern() {
    if (samplesCollected < sampleRate) {
        return CMD_NONE;
    }
    
    int analyzeLength = samplesCollected < BUFFER_SIZE ? samplesCollected : BUFFER_SIZE;
    
    // Check for blink (HELP command)
    if (detectBlink(frontalBuffer, analyzeLength)) {
        confidence = 0.8f;
        return CMD_HELP;
    }
    
    // Check for jaw clench (YES/NO commands)
    float jawDuration = 0.0f;
    if (detectJawClench(frontalBuffer, analyzeLength, jawDuration)) {
        if (jawDuration > JAW_LONG_DURATION) {
            confidence = 0.85f;
            return CMD_YES;
        } else if (jawDuration < JAW_SHORT_DURATION) {
            confidence = 0.75f;
            return CMD_NO;
        }
    }
    
    // Check for lateral asymmetry (LEFT/RIGHT commands)
    bool leftActive = false;
    if (detectLateralAsymmetry(motorBuffer, temporalBuffer, analyzeLength, leftActive)) {
        confidence = 0.7f;
        return leftActive ? CMD_LEFT : CMD_RIGHT;
    }
    
    confidence = 0.0f;
    return CMD_NONE;
}
