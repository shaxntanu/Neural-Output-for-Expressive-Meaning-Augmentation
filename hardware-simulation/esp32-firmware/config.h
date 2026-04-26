/**
 * NOEMA ESP32 Configuration
 * Hardware pin definitions and settings
 */

#ifndef CONFIG_H
#define CONFIG_H

// Pin definitions
#define LED_PIN 2           // Built-in LED
#define I2C_SDA 21          // OLED SDA
#define I2C_SCL 22          // OLED SCL

// Serial settings
#define SERIAL_BAUD 115200
#define PACKET_SIZE 16      // bytes per packet

// Display settings
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

// Sample rate
#define SAMPLE_RATE 250     // Hz

// Buffer sizes
#define SIGNAL_BUFFER_SIZE 500

#endif // CONFIG_H
