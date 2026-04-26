/**
 * NOEMA Display Driver
 * OLED display management
 */

#ifndef DISPLAY_H
#define DISPLAY_H

#include <Arduino.h>

class Display {
public:
  void init();
  void showStartup();
  void showCommand(int command, float confidence);
  void showSignals(float frontal, float motor, float temporal, float occipital);
  void update();
  
private:
  unsigned long lastUpdate;
};

#endif // DISPLAY_H
