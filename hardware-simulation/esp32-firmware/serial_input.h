/**
 * NOEMA Serial Input Handler
 * Handles incoming signal data from Python or sensors
 */

#ifndef SERIAL_INPUT_H
#define SERIAL_INPUT_H

#include <Arduino.h>

struct SignalPacket {
  float frontal;
  float motor;
  float temporal;
  float occipital;
};

class SerialInput {
public:
  void init();
  bool available();
  SignalPacket readPacket();
  
private:
  SignalPacket currentPacket;
};

#endif // SERIAL_INPUT_H
