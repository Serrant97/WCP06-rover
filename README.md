# WCP06-rover

newControl.py is used to control motor commands. Requires PiMotor.py in the same folder to work.

index.js is the Pi server. Transfers input to newControl.py for direction control.

gyroTest.c is a MPU6050 gyroscope/accelorometer manipulation program taken from https://www.electronicwings.com/raspberry-pi/mpu6050-accelerometergyroscope-interfacing-with-raspberry-pi. Prints the gyroscope and accelerometer values to the terinal for the x-, y-, and z-axes.
-- Compile with "gcc gyroTest.c -lwiringPi -o test"

gyroDecode.c is the MPU6050 gyro/acc manipulation code to be used for the project. Prints to the terminal "Device is fine" or "Device is flipped" (for testing) and sets GPIO 11 (wiringPi pin 0) high if the device is upside down.
-- Compile with "gcc gyroDecode.c -lwiringPi -o test"
