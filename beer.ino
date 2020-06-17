#include <BLEServer.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <ESP32Servo.h>
#include <M5Stack.h>

// Device Name: Maximum 30 bytes
#define DEVICE_NAME "LINE Things Trial M5Stack"

#define SERVICE_UUID        "12a467c8-e5e2-4cdb-90fd-c7a3cd76938a"
#define CHARACTERISTIC_UUID "72557c04-0177-4e98-a5d8-8eb0f9551b95"

BLECharacteristic *pCharacteristic;
BLECharacteristic* writeCharacteristic;
BLEServer* pServer;

//サーボ
Servo servo;

int Servo_Sig = 18;

bool deviceConnected = false;
bool oldDeviceConnected = false;
bool hengaoStart = false;
bool sholdServoMove = false;
bool isServoMoving = false;

int minUs = 500;
int maxUs = 2400;

class serverCallbacks: public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
   deviceConnected = true;
   M5.Lcd.clear(BLACK);
  };

  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
    hengaoStart = false;
    M5.Lcd.clear(BLACK);
  }
};

class writeCallback: public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *bleWriteCharacteristic) {
    std::string value = bleWriteCharacteristic->getValue();
    if ((char)value[0] <= 1) {
      if ((char)value[0] == 1) {
        M5.Lcd.clear(WHITE);
        M5.Lcd.setTextColor(BLACK);
        M5.Lcd.setTextSize(4);
        M5.Lcd.setCursor(135, 100);
        M5.Lcd.println("ON");
        hengaoStart = true;
      }
      else {
        M5.Lcd.clear(BLACK);
        M5.Lcd.setTextColor(WHITE);
        M5.Lcd.setTextSize(4);
        M5.Lcd.setCursor(130, 100);
        M5.Lcd.println("OFF");
        hengaoStart = false;
      }
    }
    if ((char)value[0] == 2) {
      M5.Lcd.clear(BLACK);
      M5.Lcd.setTextColor(WHITE);
      M5.Lcd.setTextSize(4);
      M5.Lcd.setCursor(130, 100);
      M5.Lcd.println("OFF");
      sholdServoMove = true;
    }
  }
};

void setup() {
  Serial.begin(115200);
  M5.begin(true, false, false);
  BLEDevice::init("LINE Things Trial M5Stack");

  // Create the BLE Server
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new serverCallbacks());

  // Create the BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create a BLE Characteristic
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_NOTIFY |
                      BLECharacteristic::PROPERTY_INDICATE
                    );
  writeCharacteristic = pService->createCharacteristic(CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_WRITE);
  writeCharacteristic->setCallbacks(new writeCallback());

  // https://www.bluetooth.com/specifications/gatt/viewer?attributeXmlFile=org.bluetooth.descriptor.gatt.client_characteristic_configuration.xml
  // Create a BLE Descriptor
  pCharacteristic->addDescriptor(new BLE2902());

  // Start the service
  pService->start();

  // Start advertising
  pServer->getAdvertising()->start();
  Serial.println("Waiting a client connection to notify...");
  Serial.println("Ready to Connect");
}

void loop() {
  
  M5.update();
  
  // Disconnection
  if (!deviceConnected && oldDeviceConnected) {
    delay(500); // Wait for BLE Stack to be ready
    pServer->getAdvertising()->start();
    oldDeviceConnected = deviceConnected;
    Serial.println("Ready to Connect");
  }
  // Connection
  if (deviceConnected && !oldDeviceConnected) {
    oldDeviceConnected = deviceConnected;
    Serial.println("Connected");
  }

  if (sholdServoMove && hengaoStart) {
    moveServo();
  }
}

//サーボ関数
void moveServo() {
  int maxDeg = 140;
  int minDeg = 10;
  int val;
  
  isServoMoving = true;
  servo.attach(Servo_Sig, minUs, maxUs);

  //傾ける
  for (val = 0; val <= maxDeg; val += 1) {
    servo.write(val);
    delay(20);
  }

  //一定時間注ぐ
  delay(600);

  //起こす
  for (val = maxDeg; val >= minDeg; val -= 1) {
    servo.write(val);
    delay(20);
  }
  
  servo.detach();
  isServoMoving = false;
  sholdServoMove = false;
  hengaoStart = false;
}