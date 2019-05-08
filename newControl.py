#!/usr/bin/python

import RPi.GPIO as GPIO
import PiMotor
import time
import traceback
from socketIO_client import SocketIO

#Name of Individual MOTORS
motorL = PiMotor.Motor("MOTOR2",1)
motorR = PiMotor.Motor("MOTOR3",1)
#To drive all motors together
motorD = PiMotor.LinkedMotors(motorL,motorR)

# Names of arrows
ab = PiMotor.Arrow(1)
al = PiMotor.Arrow(2)
af = PiMotor.Arrow(3)
ar = PiMotor.Arrow(4)

direction = []
direction = [0,0,0]

def connect():
	""" Print a message when a connection to the output server is established."""
	print("Connected to  server")

def movement(*direction):
	print("the input is" ,direction);
	# Set direction of the motors
	if direction[0] == [0,0,0]: # Stop
		print("From newControl : Stop Motors")
		motorD.stop()
	elif direction[0] == [1,0,0]: # Reverse
		print("From newControl : Reverse 100%")
		motorD.stop()
		time.sleep(0.25)
		motorD.reverse(40)
		time.sleep(1)
		motorD.reverse(50)
		time.sleep(1)
	elif direction[0] == [1,0,1]: # Left Turn
		print("From newControl : Left turn 100%")
		motorD.stop()
		time.sleep(0.25)
		motorL.reverse(40)
		motorR.forward(40)
		time.sleep(1)
	elif direction[0] == [1,1,0]: # Right Turn
		print("From newControl : Right turn 100%")
		motorD.stop()
		time.sleep(0.25)
		motorL.forward(40)
		motorR.reverse(40)
		time.sleep(1)
	elif direction[0] == [1,1,1]: # Forward
		print("From newControl : Forward 100%")
		motorD.stop()
		time.sleep(0.25)
		motorD.forward(40)
		time.sleep(1)
		motorD.forward(50)
		time.sleep(1)

try:
	print("Connecting to output server")
	socketIO = SocketIO('127.0.0.1', 3000)

	socketIO.on('connect', connect)
	socketIO.on('reconnect', connect)
	socketIO.on('movement', movement)

	# Wait for events
	print("waiting!")
	socketIO.wait()

except Exception:
	traceback.print_exc()
	print("what")

finally:
	# Clean up GPIO
	GPIO.cleanup()
	print("Clean up successful")
