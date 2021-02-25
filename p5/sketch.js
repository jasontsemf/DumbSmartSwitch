const serviceUuid = "19b10000-e8f2-537e-4f6c-d104768a1214";
const characteristicsUUID = {
  switch: "19b10001-e8f2-537e-4f6c-d104768a1214",
  hour: "19b10001-e8f2-537e-4f6c-d104768a1214",
  minute: "19b10001-e8f2-537e-4f6c-d104768a1214",
  repeat: "19b10001-e8f2-537e-4f6c-d104768a1214"
};
var switchCharacteristic;
var hourCharacteristic;
var minuteCharacteristic;
var repeatCharacteristic;

let myBLE;

var switchValue;
var hourValue;
var minuteValue;
var repeatValue;

var timeString;

var timeInput, updateButton, toggle, servoButton;

var connected = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  myBLE = new p5ble();

  connectButton = new Clickable()
  // connectButton.textScaled = true;
  connectButton.stroke = "#c9c9c9";
  connectButton.locate(windowWidth / 8 / 2, windowHeight / 8 / 2);
  connectButton.resize(windowWidth - windowWidth / 8, 100);
  connectButton.onOutside = function() {
    if (connected) {
      this.color = "#52ff63";
      this.text = "Connected";
    } else {
      this.color = "#FFFFFF";
      this.text = "Connect to DumbSmartSwitch";
    }
  }
  connectButton.onHover = function() {
    // this.color = "#b5b5b5";
    if (connected) {
      this.color = "#ff3636";
      this.text = "Disconnect";
    } else {
      this.color = "#b5b5b5";
      this.text = "Connect to DumbSmartSwitch";
    }
  }
  connectButton.onPress = function() {
    // this.color = "#808080";
    // connectToBle();
    if (connected) {
      this.color = "#c40000";
      this.text = "Disconnect";
      disconnectFromBle();
    } else {
      // this.color = "#b5b5b5";
      // this.text = "Connect to DumbSmartSwitch";
      connectToBle();
    }
  };

  timeInput = createInput();
  timeInput.attribute('type', 'time');
  timeInput.size(windowWidth - (windowWidth / 2));
  timeInput.position(windowWidth / 8 / 2, windowHeight / 8 / 2 + connectButton.height + 25);
  // timeInput.position( windowWidth / 8- timeInput.width / 2, 100 + 50);
  // timeInput.value("12:12");

  updateButton = createButton('update schedule');
  updateButton.position(timeInput.x + timeInput.width, windowHeight / 8 / 2 + connectButton.height + 25);
  updateButton.size(windowWidth - timeInput.width - windowWidth / 8, timeInput.height * 2);
  updateButton.mousePressed(updateSchedule);

  toggle = createCheckbox('Repeat Daily', false);
  // toggle.checked(true);
  toggle.changed(updateRepeat);
  toggle.position(timeInput.x, timeInput.y + timeInput.height + 5);
  // toggle.size(this.width, timeInput.height);
  // console.log(updateTimeString(12,3));

  servoButton = new Clickable()
  servoButton.stroke = "#c9c9c9";
  servoButton.textScaled = true;
  servoButton.locate(windowWidth / 8 / 2, updateButton.y + updateButton.height + 25);
  servoButton.resize(windowWidth - windowWidth / 8, windowHeight - servoButton.y - windowHeight / 8 / 2);
  servoButton.onOutside = function() {
    this.color = "#FFFFFF";
    this.text = "Clicky";
  }
  servoButton.onHover = function() {
    this.color = "#b5b5b5";
  }
  servoButton.onPress = function() {
    this.color = "#808080";
    moveServo();
  };
}

function draw() {
  background(255);
  connectButton.draw();
  servoButton.draw();
}

function connectToBle() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

function gotCharacteristics(error, characteristics) {
  if (error) console.log('error: ', error);
  console.log('characteristics: ', characteristics);

  connected = myBLE.isConnected();

  switchCharacteristic = characteristics[0];
  myBLE.read(switchCharacteristic, handleSwitch);
  hourCharacteristic = characteristics[1];
  myBLE.read(hourCharacteristic, handleHour);
  minuteCharacteristic = characteristics[2];
  myBLE.read(minuteCharacteristic, handleMinute);
  repeatCharacteristic = characteristics[3];
  myBLE.read(repeatCharacteristic, handleRepeat);
}


// characteristics handling
function handleSwitch(error, value) {
  if (error) console.log('error: ', error);
  console.log('switch: ', value);
  switchValue = value;
}

function handleHour(error, value) {
  if (error) console.log('error: ', error);
  console.log('hour: ', value);
  hourValue = value;
  timeString = updateTimeString(hourValue, minuteValue);
  timeInput.value(timeString);
}

function handleMinute(error, value) {
  if (error) console.log('error: ', error);
  console.log('minute: ', value);
  minuteValue = value;
  timeString = updateTimeString(hourValue, minuteValue);
  timeInput.value(timeString);
}

function handleRepeat(error, value) {
  if (error) console.log('error: ', error);
  console.log('repeat: ', value);
  repeatValue = value;
  toggle.checked(repeatValue);
}

// writing to BLE
function updateSchedule() {
  timeString = timeInput.value();
  timeVal = parseTime(timeString);
  console.log(timeVal);
  myBLE.write(hourCharacteristic, parseInt(timeVal[0]));
  myBLE.write(minuteCharacteristic, parseInt(timeVal[1]));
}

function moveServo() {
  myBLE.write(switchCharacteristic, 1);
}

function updateRepeat() {
  if (this.checked()) {
    myBLE.write(repeatCharacteristic, 1);
  } else {
    myBLE.write(repeatCharacteristic, 0);
  }
}

// helper functions
function updateTimeString(hour, minute) {
  let hrString = "";
  let minString = "";
  let tempTimeString = "";
  if (hour) {
    hrString = (hour < 10) ? `0${hour}` : hour.toString();
  }
  if (minute) {
    minString = (minute < 10) ? `0${minute}` : minute.toString();
  }
  tempTimeString = `${hrString}:${minString}`;
  return tempTimeString;
}

function parseTime(t) {
  var T = t.split(':');
  // console.log(T);
  return T;
}

function disconnectFromBle() {
  // Disonnect to the device
  myBLE.disconnect();
  // Check if myBLE is connected
  connected = myBLE.isConnected();
}

// function gotValue(error, value) {
//   if (error) console.log('error: ', error);
//   console.log('value: ', value);
//   // myValue = value;
//   // After getting a value, call p5ble.read() again to get the value again
//   // myBLE.read(myCharacteristic, gotValue);
// }
// function writeToBle() {
//   const inputValue = input.value();
//   // Write the value of the input to the myCharacteristic
//   myBLE.write(switchCharacteristic, inputValue);
// }