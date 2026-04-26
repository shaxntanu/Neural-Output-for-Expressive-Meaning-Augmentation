/**
 * NOEMA Core Test Program
 * Test the embedded processing logic
 */

#include <iostream>
#include <cmath>
#include "noema_core.h"

using namespace std;

// Generate test signal
void generateTestSignal(float* buffer, int length, float amplitude, float frequency, int sampleRate) {
    for (int i = 0; i < length; i++) {
        float t = (float)i / sampleRate;
        buffer[i] = amplitude * sin(2.0f * M_PI * frequency * t);
    }
}

int main() {
    cout << "NOEMA Core Test Program" << endl;
    cout << "=======================" << endl << endl;
    
    NoemaCore core(250);  // 250 Hz sample rate
    
    // Test 1: Baseline signal (should detect NONE)
    cout << "Test 1: Baseline signal..." << endl;
    for (int i = 0; i < 250; i++) {  // 1 second
        float frontal = 50.0f * sin(2.0f * M_PI * 10.0f * i / 250.0f);
        float motor = 30.0f * sin(2.0f * M_PI * 15.0f * i / 250.0f);
        float temporal = 40.0f * sin(2.0f * M_PI * 8.0f * i / 250.0f);
        float occipital = 60.0f * sin(2.0f * M_PI * 10.0f * i / 250.0f);
        
        Command cmd = core.processSample(frontal, motor, temporal, occipital);
    }
    cout << "Detected: " << core.getLastCommand() << " (Expected: 0 = NONE)" << endl;
    cout << "Confidence: " << core.getConfidence() << endl << endl;
    
    // Test 2: Blink artifact (should detect HELP)
    cout << "Test 2: Blink artifact..." << endl;
    core.reset();
    for (int i = 0; i < 250; i++) {
        float frontal = 50.0f * sin(2.0f * M_PI * 10.0f * i / 250.0f);
        
        // Add blink spike at 0.5 seconds
        if (i >= 125 && i < 175) {
            frontal += 300.0f * exp(-((float)(i - 125) / 25.0f));
        }
        
        float motor = 30.0f * sin(2.0f * M_PI * 15.0f * i / 250.0f);
        float temporal = 40.0f * sin(2.0f * M_PI * 8.0f * i / 250.0f);
        float occipital = 60.0f * sin(2.0f * M_PI * 10.0f * i / 250.0f);
        
        Command cmd = core.processSample(frontal, motor, temporal, occipital);
    }
    cout << "Detected: " << core.getLastCommand() << " (Expected: 5 = HELP)" << endl;
    cout << "Confidence: " << core.getConfidence() << endl << endl;
    
    cout << "=======================" << endl;
    cout << "Tests complete!" << endl;
    
    return 0;
}
