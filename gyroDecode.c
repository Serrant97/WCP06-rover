#include <wiringPiI2C.h>
#include <stdlib.h>
#include <stdio.h>
#include <wiringPi.h>

#define Device_Address 0x68	/*Device Address/Identifier for MPU6050*/

#define PWR_MGMT_1   0x6B
#define SMPLRT_DIV   0x19
#define CONFIG       0x1A
#define GYRO_CONFIG  0x1B
#define INT_ENABLE   0x38
#define ACCEL_YOUT_H 0x3D

int fd;

void MPU6050_Init(){
	
	wiringPiI2CWriteReg8 (fd, SMPLRT_DIV, 0x07);	/* Write to sample rate register */
	wiringPiI2CWriteReg8 (fd, PWR_MGMT_1, 0x01);	/* Write to power management register */
	wiringPiI2CWriteReg8 (fd, CONFIG, 0);		/* Write to Configuration register */
	wiringPiI2CWriteReg8 (fd, GYRO_CONFIG, 24);	/* Write to Gyro Configuration register */
	wiringPiI2CWriteReg8 (fd, INT_ENABLE, 0x01);	/*Write to interrupt enable register */

	} 
short read_raw_data(int addr){
	short high_byte,low_byte,value;
	high_byte = wiringPiI2CReadReg8(fd, addr);
	low_byte = wiringPiI2CReadReg8(fd, addr+1);
	value = (high_byte << 8) | low_byte;
	return value;
}

void ms_delay(int val){
	int i,j;
	for(i=0;i<=val;i++)
		for(j=0;j<1200;j++);
}

int main(){
	
	float Acc_y;
	float Ay=0;
	fd = wiringPiI2CSetup(Device_Address);   /*Initializes I2C with device Address*/
	MPU6050_Init();		                 /* Initializes MPU6050 */
	
	while(1)
	{
		/* Read raw value of Accelerometer and gyroscope from MPU6050*/
		Acc_y = read_raw_data(ACCEL_YOUT_H);
		
		/* Divide raw value by sensitivity scale factor */
		Ay = Acc_y/16384.0;
		
		// printf("\nAy = %.3f g\n",Ay);
		if(Ay < 0) {
			while(Ay < 0) {
				printf("\nDevice is flipped.\n");
				Acc_y = read_raw_data(ACCEL_YOUT_H);
				Ay = Acc_y/16384.0;
				delay(1000);
			}
		}
		
		printf("\nDevice is fine.\n");
		delay(1000);
		
	}
	return 0;
}
