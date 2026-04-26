/**
 * Display Implementation
 * Note: Requires Adafruit SSD1306 library for actual OLED
 */

#include "display.h"

void Display::init() {
  // TODO: Initialize OLED display
  // For now, use Serial output
  Serial.println("Display initialized (Serial mode)");
  lastUpdate = millis();
}

void Display::showStartup() {
  Serial.println("===================");
  Serial.println("   NOEMA v1.0");
  Serial.println("===================");
}

void Display::showCommand(int command, float confidence) {
  const char* commands[] = {"NONE", "YES", "NO", "LEFT", "RIGHT", "HELP"};
  Serial.print("Command: ");
  Serial.print(commands[command]);
  Serial.print(" (");
  Serial.print(confidence * 100);
  Serial.println("%)");
}

void Display::showSignals(float frontal, float motor, float temporal, float occipital) {
  Serial.print("F:");
  Serial.print(frontal, 1);
  Serial.print(" M:");
  Serial.print(motor, 1);
  Serial.print(" T:");
  Serial.print(temporal, 1);
  Serial.print(" O:");
  Serial.println(occipital, 1);
}

void Display::update() {
  // Periodic update logic
  lastUpdate = millis();
}
