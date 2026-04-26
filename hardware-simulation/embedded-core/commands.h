/**
 * NOEMA Command Definitions
 * Command types and detection thresholds
 */

#ifndef NOEMA_COMMANDS_H
#define NOEMA_COMMANDS_H

// Command types
enum Command {
    CMD_NONE = 0,
    CMD_YES = 1,
    CMD_NO = 2,
    CMD_LEFT = 3,
    CMD_RIGHT = 4,
    CMD_HELP = 5
};

// Detection thresholds
const float BLINK_THRESHOLD = 250.0f;      // µV
const float JAW_THRESHOLD = 180.0f;        // µV
const float JAW_SHORT_DURATION = 0.8f;     // seconds
const float JAW_LONG_DURATION = 1.5f;      // seconds
const float DOUBLE_BLINK_WINDOW = 1.0f;    // seconds
const float LATERAL_THRESHOLD = 0.3f;      // 30% difference

// Confidence thresholds
const float MIN_CONFIDENCE = 0.6f;

#endif // NOEMA_COMMANDS_H
