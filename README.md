# Tuya 'BiZone' thermostat panel（React Native 0.59）
#### by nickolashka

English | [简体中文](./README-zh_CN.md)

for docs, please visit [tuya docs](https://docs.tuya.com)
for more information visit CHANGELOG

![Screenshots](https://github.com/nickolasdzemian/res/blob/main/blobs/2sex_screen_cli.jpg)![Screenshots](https://github.com/nickolasdzemian/res/blob/main/blobs/2sex_screen_zone.jpg)![Screenshots](https://github.com/nickolasdzemian/res/blob/main/blobs/2sex_screen_chart.jpg)

## Connection
To connect device scan QR-code via Tuya app and see manual.

![QR-code](https://github.com/nickolasdzemian/res/blob/main/blobs/2sexQRconn.jpg)

## Download example manually

```bash
$ curl https://codeload.github.com/tuya/tuya-panel-demo/tar.gz/master | tar -xz --strip=2 tuya-panel-demo-master/examples/basic-ts-0.59
$ mv basic tuya-panel-basic-ts-0.59-example
$ cd tuya-panel-basic-ts-0.59-example
$ npm install react-native-vector-icons && @fortawesome/free-solid-svg-icons && @fortawesome/react-native-fontawesome
```

## Introduction

The template project is the basic typescript template of react native version 0.59, which can start all Tuya products and be used to debug the DP points of the current product, in addition, it supports the following functions:

1. Path Alias;
2. React、Redux Hooks;

You can scan the following QR code through the Tuya app to preview.

![Basic-0.59](https://images.tuyacn.com/rms-static/91fab3d0-392d-11eb-8584-77b31b3e78b8-1607415345037.png?tyName=basic-0.59.png)

## Running

```bash
$ npm install && npm run start
# or
$ yarn && yarn start
```

## License

Copyright © 2021
