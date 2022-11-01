from machine import Pin, I2C
from os import uname

machine = uname().machine
if ("KidBright32" in machine) or ("KidMotor V4" in machine):
    i2c1 = I2C(1, scl=Pin(5), sda=Pin(4), freq=400000)
elif ("Mbits" in machine) or ("OpenBIT" in machine):
    i2c1 = I2C(0, scl=Pin(21), sda=Pin(22), freq=400000)
else:
    i2c1 = I2C(0, scl=Pin(22), sda=Pin(21), freq=400000)

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
    b = min(b, 15)
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

def writeDigitRaw(d, bitmask):
    global displaybuffer
    if d > 4:
        return None
    if d < 0:
        d = 0
    displaybuffer[d] = bitmask

def drawColon(state):
    global displaybuffer
    displaybuffer[4] = 0x01 if state else 0
    writeDisplay()

def writeDigitNum(d, num, dot):
    global numbertable
    if d > 4:
        return None
    print("Num => {}".format(num))
    writeDigitRaw(d, numbertable[int(num)] | (dot << 7))
    writeDisplay()

def printFloat(n, fracDigits=0, base=10):
    n_str = ""
    if base == 10:
        n_str = '{:.{prec}f}'.format(n, prec=fracDigits)
    elif base == 16:
        n_str = hex(int(n))[2:]
    elif base == 2:
        n_str = "{0:b}".format(n)
    elif base == 8:
        n_str = oct(int(n))[2:]
    else:
        return False
    n_str = bytearray(n_str)
    # print("Str: {}".format(n_str.decode('utf-8')))
    add_padding = 4
    for i in range(0, len(n_str)):
        c = n_str[i]
        if (c >= ord('0') and c <= ord('9')) or (c >= ord('a') and c <= ord('f')):
            add_padding = add_padding - 1
        elif c == ord('.'):
            continue # Skip
        elif c == ord('-'):
            add_padding = add_padding - 1
    digi = 0 if add_padding < 0 else add_padding
    for i in range(0, len(n_str)):
        c = n_str[i]
        if (c >= ord('0') and c <= ord('9')) or (c >= ord('a') and c <= ord('f')):
            c_num = 0
            if c >= ord('0') and c <= ord('9'):
                c_num = c - ord('0')
            elif c >= ord('a') and c <= ord('f'):
                c_num = c - ord('a') + 10
            dot = 1 if len(n_str) > (i + 1) and n_str[i + 1] == ord('.') and digi < 3 else 0
            # print("Digi {} write {} dot {}".format(digi, c_num, dot))
            writeDigitRaw(digi, numbertable[int(c_num)] | (dot << 7))
        elif c == ord('.'):
            continue # Skip
        elif c == ord('-'):
            # print("Digi {} write 0x40 dot 0".format(digi))
            writeDigitRaw(digi, 0x40)
        else:
            writeDigitRaw(digi, 0x00)
        digi = digi + 1
        if digi > 3:
            break
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