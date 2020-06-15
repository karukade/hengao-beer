import { DeviceInfo } from "../reducers/app";

// const SERVICE_UUID = "12a467c8-e5e2-4cdb-90fd-c7a3cd76938a";
// const CHARACTERISTIC_UUID = "72557c04-0177-4e98-a5d8-8eb0f9551b95";
// const NAME = "LINE Things Trial M5Stack";

let characteristic!: BluetoothRemoteGATTCharacteristic;

export const initBLEDevice = async (deviceInfo: DeviceInfo) => {
  if (!deviceInfo) return;
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: false,
    filters: [{ namePrefix: deviceInfo.name }],
    optionalServices: [deviceInfo.serviceUUID],
  });
  const server = await device?.gatt?.connect();
  if (!server) throw new Error();
  const service = await server.getPrimaryService(deviceInfo.serviceUUID);
  characteristic = await service.getCharacteristic(
    deviceInfo.characteristicUUID
  );
  return toggleDeviceState(false);
};
export const toggleDeviceState = (state: boolean) => {
  if (!characteristic) return;
  return characteristic.writeValue(
    state ? new Uint8Array([0x01]) : new Uint8Array([0x00])
  );
};

export const sendServoSignal = () => {
  if (!characteristic) return;
  return characteristic.writeValue(new Uint8Array([0x02]));
};
