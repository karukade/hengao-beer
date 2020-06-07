# 変顔Beer

## ながれ
 - widgetsのロード
 ```js
 return Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(this.MODEL_URI),
        faceapi.nets.faceLandmark68Net.loadFromUri(this.MODEL_URI),
        faceapi.nets.faceRecognitionNet.loadFromUri(this.MODEL_URI),
        faceapi.nets.ssdMobilenetv1.loadFromUri(this.MODEL_URI)
      ]);
 ```

- デバイスにBLE接続
```js
try {
        const device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: false,
          filters: [{ namePrefix: 'LINE Things Trial M5Stack' }],
          optionalServices: [this.SERVICE_UUID]
        });
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService(this.SERVICE_UUID); //サービスに接続
        this.characteristic = await service.getCharacteristic(
          this.CHARACTERISTIC_UUID
        );
        this.deviceConnected = true;
        this.toggleDeviceState(false);
      } catch (error) {
        this.deviceConnected = false;
        console.log('エラー', error);
      }
```

- videoの用意 srcObjを取得
```js
const srcObj = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true
    })
```

- videoのsrcObjにセットして再生
```js
const video = this.$refs.video
      video.muted = true
      video.srcObject = this.stream
      video.playsInline = true
      await video.play()
```

- matcherの作成

## 変顔判定スタート
- 制限時間カウンタースタート
- hengaoのfacedescriptorを生成
- matcherに渡してdistanceをとる

- distanceが閾値以上であればカウントスタート

- distance閾値以上であればカウントダウンを継続、閾値以下はカウントダウンを止める

```js
{
  faceApi: {
    preparing: boolean
    error: boolean
  }
  video: {
    videoPreparing: boolean
    video: HTMLVideoElement
  }
  appReady: boolean
}

// INITAPP(VIDEO)@AppContainer
```

```js
app: {
  status: "WAIT_START"
  video: {
    element: HTMLVideoElement
  }
}
```

