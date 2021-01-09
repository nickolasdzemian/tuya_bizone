# Tuya Panel BiZone thermostat panel

English | [简体中文](./README-zh_CN.md)

for docs, please visit [tuya docs](https://docs.tuya.com)

### This panel is based on Tyua SmartLock template
### This package is using prefix '5.1' at the beginning of it's name

## Datapoints!
* Mechanics didnt add into this UI
* Unternational definition must be threw get_dp_lang method, now it's only strings

## Dependencies for manual installation
react-native-vector-icons
@fortawesome/free-solid-svg-icons
@fortawesome/react-native-fontawesome

## Download manually

```bash
$ curl https://codeload.github.com/TuyaInc/tuya-panel-kit-template/tar.gz/develop | tar -xz --strip=2 tuya-panel-kit-template-develop/examples/smartLock
$ mv smartLock tuya-panel-smartLock-example
$ cd tuya-panel-smartLock-example
```

## Introduction

This template project is a WiFi door lock template, which can support the following functions:

1. Open door record check
2. Check the alarm message
3. Child lock, backlock and battery display
4. Days of protection

You can scan the following QR code through the Tuya app to preview.

![SmartLock](https://images.tuyacn.com/rms-static/a56b0770-bb89-11ea-96f0-cda03b175b6c-1593601044839.png?tyName=smartLock.png)

## Running

```bash
$ npm install && npm run start
# or
$ yarn && yarn start
```
## API

* [tuya.m.device.lock.active.period](https://docs.tuya.com/zh/iot/panel-development/panel-sdk-development/lock-sdk/lock-api/lock-api?id=K9ppulorxzebv)
* [tuya.m.device.lock.alarm.unread](https://docs.tuya.com/zh/iot/panel-development/panel-sdk-development/lock-sdk/lock-api/lock-api?id=K9ppulorxzebv)
* [tuya.m.scale.history.list](https://docs.tuya.com/zh/iot/panel-development/panel-sdk-development/lock-sdk/lock-api/lock-api?id=K9ppulorxzebv)
* [tuya.m.device.lock.alarm.list](https://docs.tuya.com/zh/iot/panel-development/panel-sdk-development/lock-sdk/lock-api/lock-api?id=K9ppulorxzebv)

## License

Copyright © 2020
