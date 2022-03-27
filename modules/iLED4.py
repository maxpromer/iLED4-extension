from machine import Pin, I2C
from os import uname

machine = uname().machine
if "KidBright32" in machine:
    i2c1 = I2C(1, scl=Pin(5), sda=Pin(4), freq=100000)
else:
    i2c1 = I2C(0, scl=Pin(22), sda=Pin(21), freq=100000)

ADDR = 0x70

iLED_BLINK_CMD=0x80        # < I2C register for BLINK setting
iLED_BLINK_DISPLAYON=0x01  #< I2C value for steady on
iLED_BLINK_OFF=0           # < I2C value for steady off
iLED_BLINK_2HZ=1           # < I2C value for 2 Hz blink
iLED_BLINK_1HZ=2           # < I2C value for 1 Hz blink
iLED_BLINK_HALFHZ=3		   # < I2C value for 0.5 Hz blink

iLED_CMD_BRIGHTNESS=0xE0

SEVENSEG_DIGITS = 5 # Digits in 7-seg displays, plus NUL end


numbertable = bytes([
	0x3F, # 0
	0x06, # 1 
	0x5B, # 2
	0x4F, # 3
	0x66, # 4
	0x6D, # 5
	0x7D, # 6
	0x07, # 7
	0x7F, # 8
	0x6F, # 9
	0x77, # a
	0x7C, # b
	0x39, # C
	0x5E, # d
	0x79, # E
	0x71, # F
])

displaybuffer = [ 0 ] * 8
position = 0

def setBrightness(b):
	if b > 15:
		b = 15
	
	i2c1.writeto(ADDR, bytes([ iLED_CMD_BRIGHTNESS | b ]))

def blinkRate(b):
	if b > 3:
		b = 0 # turn off if not sure

	i2c1.writeto(ADDR, bytes([ iLED_BLINK_CMD | iLED_BLINK_DISPLAYON | (b << 1) ]))

def begin():
	i2c1.writeto(ADDR, bytes([ 0x21 ]))

	blinkRate(iLED_BLINK_OFF)
	setBrightness(15); # max brightness

def writeDisplay():
	global displaybuffer
	data = bytearray(1 + 16)
	data[0] = 0x00
	for i in range(8):
		data[1 + (i * 2) + 0] = displaybuffer[i] & 0xFF
		data[1 + (i * 2) + 1] = displaybuffer[i] >> 8

	i2c1.writeto(ADDR, bytes(data))

def clear():
	global displaybuffer
	displaybuffer = [ 0 ] * len(displaybuffer)
	writeDisplay()

def print(n, base):
	if base == 0:
		write(n)
	else:
		printNumber(n, base)

def write(c):
	global position
	r = 0
	if c == '\n':
		position = 0
	if c == '\r':
		position = 0

	if c >= '0' and c <= '9':
		writeDigitNum(position, c - '0')
		r = 1

	position = position + 1
	if position == 2:
		position = position + 1

	return r

def writeDigitRaw(d, bitmask):
	global displaybuffer
	if d > 4:
		return None
	displaybuffer[d] = bitmask

def drawColon(state):
	global displaybuffer
	displaybuffer[4] = 0x01 if state else 0
	writeDisplay()

def writeColon():
	global displaybuffer
	i2c1.writeto(ADDR, bytes({ 0x08, displaybuffer[4] & 0xFF, displaybuffer[4] >> 8 }))

def writeDigitNum(d, num, dot):
	if d > 4:
		return None

	writeDigitRaw(d, numbertable[num] | (dot << 7))
	writeDisplay()

def printNumber(n, base):
	printFloat(n, 0, base)

def printFloat(n, fracDigits, base):
	numericDigits = 4 # available digits on display
	isNegative = False # true if the number is negative

	# is the number negative?
	if n < 0:
		isNegative = True # need to draw sign later
		numericDigits = numericDigits - 1;   # the sign will take up one digit
		n = n * -1		   # pretend the number is positive

	# calculate the factor required to shift all fractional digits
	# into the integer part of the number
	toIntFactor = 1.0
	for i in range(fracDigits):
		toIntFactor = toIntFactor * base

	# create integer containing digits to display by applying
	# shifting factor and rounding adjustment
	displayNumber = n * toIntFactor + 0.5

	# calculate upper bound on displayNumber given
	# available digits on display
	tooBig = 1
	for i in range(numericDigits):
		tooBig = tooBig * base

	# if displayNumber is too large, try fewer fractional digits
	while displayNumber >= tooBig:
		fracDigits = fracDigits - 1
		toIntFactor = toIntFactor / base
		displayNumber = n * toIntFactor + 0.5

	# did toIntFactor shift the decimal off the display?
	if toIntFactor < 1:
		printError()
	else:
		# otherwise, display the number
		displayPos = 3

		if displayNumber: # if displayNumber is not 0
			i = 0
			while displayNumber or i <= fracDigits:
				displayDecimal = (fracDigits != 0 and i == fracDigits)
				writeDigitNum(displayPos, displayNumber % base, displayDecimal)
				displayPos = displayPos - 1
				displayNumber /= base
				i = i + 1

		else:
			writeDigitNum(displayPos, 0, False)
			displayPos = displayPos - 1

		# display negative sign if negative
		if isNegative:
			writeDigitRaw(displayPos, 0x40)
			displayPos = displayPos - 1

		# clear remaining display positions
		while displayPos >= 0:
			writeDigitRaw(displayPos, 0x00)
			displayPos = displayPos - 1
	
	writeDisplay()

def printError():
	for i in range(SEVENSEG_DIGITS):
		writeDigitRaw(i, 0x00 if i == 2 else 0x40)

def showDotPoint(x, show):
	global displaybuffer
	if x > 4:
		return False
	if x == 4:
		drawColon(show)
		return True

	if show:
		displaybuffer[x] = displaybuffer[x] | (1 << 7)
	else:
		displaybuffer[x] = displaybuffer[x] & (~(1 << 7))
	
	writeDisplay()

def turn_on():
	i2c1.writeto(ADDR, bytes([ 0x81 ]))

def turn_off():
	i2c1.writeto(ADDR, bytes([ 0x80 ]))

begin()
