/**
 * NOEMA ESP32 Firmware
 * Main Arduino sketch for ESP32 integration
 */

#include "config.h"
#include "serial_input.h"
#include "display.h"

// Global objects
SerialInput serialInput;
Display display;

// Command state
int currentCommand = 0;
float confidence = 0.0;

void setup() {
  Serial.begin(115200);
  
  // Initialize display
  display.init();
  display.showStartup();
  
  // Initialize serial input
  serialInput.init();
  
  // Initialize status LED
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  
  Serial.println("NOEMA ESP32 Firmware v1.0");
  Serial.println("Ready for signal input...");
  
  delay(2000);
}

void loop() {
  // Check for incoming serial data
  if (serialInput.available()) {
    SignalPacket packet = serialInput.readPacket();
    
    // TODO: Process with embedded core
    // Command cmd = core.processSample(packet.frontal, packet.motor, 
    //                                   packet.temporal, packet.occipital);
    
    // For now, just display raw values
    display.showSignals(packet.frontal, packet.motor, 
                       packet.temporal, packet.occipital);
    
    // Blink LED to show activity
    digitalWrite(LED_PIN, !digitalRead(LED_PIN));
  }
  
  // Update display periodically
  static unsigned long lastUpdate = 0;
  if (millis() - lastUpdate > 100) {  // 10 Hz update
    display.update();
    lastUpdate = millis();
  }
  
  delay(4);  // 250 Hz loop rate
}
