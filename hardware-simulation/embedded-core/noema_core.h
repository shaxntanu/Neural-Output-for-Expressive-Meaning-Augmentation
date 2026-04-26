/**
 * NOEMA Core Processing Engine
 * Hardware-independent signal processing and command detection
 */

#ifndef NOEMA_CORE_H
#define NOEMA_CORE_H

#include "commands.h"

class NoemaCore {
public:
    NoemaCore(int sampleRate = 250);
    ~NoemaCore();
    
    // Process incoming sample
    Command processSample(float frontal, float motor, float temporal, float occipital);
    
    // Get last detected command
    Command getLastCommand() const { return lastCommand; }
    
    // Get confidence score (0.0 to 1.0)
    float getConfidence() const { return confidence; }
    
    // Reset internal state
    void reset();
    
private:
    int sampleRate;
    Command lastCommand;
    float confidence;
    
    // Internal buffers
    static const int BUFFER_SIZE = 500;  // 2 seconds at 250 Hz
    float frontalBuffer[BUFFER_SIZE];
    float motorBuffer[BUFFER_SIZE];
    float temporalBuffer[BUFFER_SIZE];
    float occipitalBuffer[BUFFER_SIZE];
    int bufferIndex;
    int samplesCollected;
    
    // Feature extraction
    float calculateMean(const float* buffer, int length);
    float calculateVariance(const float* buffer, int length, float mean);
    float calculatePeakToPeak(const float* buffer, int length);
    int countZeroCrossings(const float* buffer, int length);
    
    // Pattern detection
    bool detectBlink(const float* buffer, int length);
    bool detectJawClench(const float* buffer, int length, float& duration);
    bool detectLateralAsymmetry(const float* leftBuffer, const float* rightBuffer, int length, bool& leftActive);
    
    // Command classification
    Command classifyPattern();
};

#endif // NOEMA_CORE_H
