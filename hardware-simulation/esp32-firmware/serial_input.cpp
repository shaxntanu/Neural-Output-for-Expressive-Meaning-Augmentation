/**
 * Serial Input Implementation
 */

#include "serial_input.h"

void SerialInput::init() {
  // Serial already initialized in main sketch
}

bool SerialInput::available() {
  return Serial.available() >= sizeof(SignalPacket);
}

SignalPacket SerialInput::readPacket() {
  if (available()) {
    Serial.readBytes((char*)&currentPacket, sizeof(SignalPacket));
  }
  return currentPacket;
}
