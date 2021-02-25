#include <ArduinoBLE.h>
#include <Servo.h>
// Date and time functions using a DS3231 RTC connected via I2C and Wire lib
#include "RTClib.h"

RTC_DS3231 rtc;
//char daysOfTheWeek[7][12] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
Servo myservo;  // create servo object to control a servo
int pos = 0;    // variable to store the servo position

BLEService servoService("19B10000-E8F2-537E-4F6C-D104768A1214"); // BLE LED Service

// BLE LED Switch Characteristic - custom 128-bit UUID, read and writable by central
BLEIntCharacteristic switchCharacteristic("19B10001-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite | BLENotify);
BLEIntCharacteristic hourCharacteristic("19B10002-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite | BLENotify);
BLEIntCharacteristic minuteCharacteristic("19B10003-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite | BLENotify);
BLEIntCharacteristic repeatCharacteristic("19B10004-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite | BLENotify);

// time updating anc checking interval
unsigned long previousMillis = 0;
const long interval = 45000;  // 45 seconds

void setup() {
  Serial.begin(9600);
//  while (!Serial);

  // rtc setup
  if (! rtc.begin()) {
    Serial.println("Couldn't find RTC");
    Serial.flush();
    abort();
  }

  if (rtc.lostPower()) {
    Serial.println("RTC lost power, let's set the time!");
    // When time needs to be set on a new device, or after a power loss, the
    // following line sets the RTC to the date & time this sketch was compiled
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
    // This line sets the RTC with an explicit date & time, for example to set
    // January 21, 2014 at 3am you would call:
    // rtc.adjust(DateTime(2014, 1, 21, 3, 0, 0));
  }

  // servo setup
  myservo.attach(2);  // attaches the servo on pin 9 to the servo object

  // begin initialization
  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");

    while (1);
  }

  // set advertised local name and service UUID:
  BLE.setLocalName("DumbSmartSwitch");
  BLE.setAdvertisedService(servoService);

  // add the characteristic to the service
  servoService.addCharacteristic(switchCharacteristic);
  servoService.addCharacteristic(hourCharacteristic);
  servoService.addCharacteristic(minuteCharacteristic);
  servoService.addCharacteristic(repeatCharacteristic);

  // add service
  BLE.addService(servoService);

  // set the initial value for the characeristic:
  switchCharacteristic.writeValue(0);
  hourCharacteristic.writeValue(0);
  minuteCharacteristic.writeValue(1);
  repeatCharacteristic.writeValue(1);

  // start advertising
  BLE.advertise();

  Serial.println("BLE Servo Peripheral");
//  moveServo();
}

void loop() {
  // update millis
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    // save the last time you blinked the LED
    previousMillis = currentMillis;

    DateTime now = rtc.now();
    if (repeatCharacteristic.value()) {               // check if it is set to repeat daily
//      Serial.print(hourCharacteristic.value());
      // check if it is the right time to push button
      if (now.hour() == int(hourCharacteristic.value())
          && now.minute() == int(minuteCharacteristic.value())) {
        moveServo();
      }
    }
  }

  // listen for BLE peripherals to connect:
  BLEDevice central = BLE.central();


  // if a central is connected to peripheral:
  if (central) {
    Serial.print("Connected to central: ");
    // print the central's MAC address:
    Serial.println(central.address());

    // while the central is still connected to peripheral:
    while (central.connected()) {
      // if the remote device wrote to the characteristic,
      // use the value to control the LED:
      if (switchCharacteristic.written()) {
        if (switchCharacteristic.value()) {   // any value other than 0
          moveServo();
          switchCharacteristic.writeValue(0);
        } else {                              // a 0 value
          //          Serial.println(F("nothing"));
        }
      }
    }

    // when the central disconnects, print it out:
    Serial.print(F("Disconnected from central: "));
    Serial.println(central.address());
  }

//  BLE.poll();
//  switchCharacteristic.writeValue(0);
}

void moveServo() {
  Serial.println("move servo");


  for (pos = 130; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(10);                       // waits 15ms for the servo to reach the position
  }
    for (pos = 180; pos >= 130; pos -= 1) { // goes from 180 degrees to 0 degrees
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(10);                       // waits 15ms for the servo to reach the position
  }
  
}
