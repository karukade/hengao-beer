# 変顔ビールお酌マシーン

顔認識を利用して変顔を判定。制限時間内に5秒間変顔を維持するとビールをそそいでくれるwebアプリ。
2019年の養老乃瀧ハッカソンで作成したものを学習目的でtypescript+Reactで実装しなおした。<br>

[デモサイト](http://hengao-beer.web.app/)<br>
(PCのChromeのみ対応。顔認識をブラウザ上で行っているのでスマホだとおそらく処理能力の問題でうまくうごきませんでした。。)<br>
ビールお酌なし(デバイスなし)で変顔判定のみ試すことができます。<br>
もし[beer.ino](https://github.com/karukade/hengao-beer/blob/dev/beer.ino)のようなかたちで実装したデバイスがあれば、サイトでService UUID、Characteristic UUID、デバイスの表示名を入力できるようにしているのでデバイスの動作こみで試すこともできます。<br>
たまに、デバイス使用時にchromeでpermission deniedというエラーがでますが、何度か試すと動くようになります。。こちらは解消できてません。。

## デモ

[デモサイト](http://hengao-beer.web.app/)<br>
(Chromeのみ対応。かつPC推奨。顔認識をブラウザ上で行っているのでスマホだと処理能力の問題でうまくうごきません。。)

## 機能
1. 変顔判定<br>
[face-api.js](https://github.com/justadudewhohacks/face-api.js/)の顔認識を利用。<br>基準となる通常の顔を登録してMatcherを作成。そのMatcherに変顔をなげたときにかえってくる類似度が低いほど変顔と判定。

2. ビールお酌マシーン<br>
M5Stackとサーボモーターを利用。<br>
ブラウザとBLEで連携。ブラウザ上で変顔と判定されると缶ビールをセットしたサーボを傾けてビールをそそぐ。

## 使用技術
- react
- face-api.js
- web bluetooth api
- M5stack

