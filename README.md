# iScanner

#### Video Demo: TBD
#### Description: A simple iBeacon scanner and advertisement app.

<p float="left">
<img src="./screenshots/receive.PNG" width="200">
<img src="./screenshots/transmit.jpeg" width="200">
<img src="./screenshots/settings.jpeg" width="200">
</p>

## Overview

iScanner is an IOS app that can be used to scan for and advertise as an iBeacon device. iBeacon is a technology developed by Apple that allows mobile devices to detect and interact with beacons placed in the physical environment. The App is split into three tabs:

- **Receive:** Scan for nearby iBeacons.
- **Transmit:** Advertise as an iBeacon.
- **Settings**: Configure scan and advertisement parameters.

## 🪄 Features

- Scanning iBeacon(s): Scan for nearby iBeacons by supplying one or several UUIDs. The information of all nearby iBeacons are displayed in a list, including UUID, major, minor, proximity and RSSI (Received Signal Strength Indicator).
- Advertising iBeacon: Turn your smartphone into an iBeacon. This allows other devices to scan and detect your phone as an iBeacon. You can configure your iBeacon advertisiment parameters in the Settings tab.


## 🔧 Architecture

The application is built using the Ionic/Angular framework.

- Ionic:
    - Ionic CLI                     : 7.1.1
    - Ionic Framework               : @ionic/angular 7.2.2
    - @angular-devkit/build-angular : 16.1.8
    - @angular-devkit/schematics    : 16.1.8
    - @angular/cli                  : 16.1.8
    - @ionic/angular-toolkit        : 9.0.0
- Capacitor:
    - Capacitor CLI      : 5.2.2
    - @capacitor/android : not installed
    - @capacitor/core    : 5.2.2
    - @capacitor/ios     : 5.2.2
- System:
    - NodeJS : v18.17.0
    - npm    : 9.6.7
    - OS     : macOS



```plaintext
├── src/
|   ├── app/
|   |   ├── services/
|   |   |   ├── iBeacon/
|   |   |   |   ├── receive/
|   |   |   |   |   ├── receive-beacon.service.ts
|   |   |   |   |   └── receive-beacon.service.spec.ts
|   |   |   |   ├── transmit/
|   |   |   |   |   ├── transmit-beacon.service.ts
|   |   |   |   |   └── transmit-beacon.service.spec.ts
|   |   |   ├── shared/
|   |   |   |   ├── defaults/
|   |   |   |   |   ├── defaultRssiFilter.ts
|   |   |   |   |   └── defaultTxParameters.ts
|   |   |   |   ├── storage/
|   |   |   |   |   ├── storage.service.ts
|   |   |   |   |   └── storage.service.spec.ts
|   |   |   |   ├── types/
|   |   |   |   |   ├── rssiFilter.ts
|   |   |   |   |   ├── uuid.ts
|   |   |   |   |   └── txParameters.ts
|   |   ├── pages/
|   |   |   ├── tab1-scan/
|   |   |   |   ├── tab1.page.html
|   |   |   |   ├── tab1.page.scss
|   |   |   |   ├── tab1.page.spec.ts
|   |   |   |   ├── tab1.module.ts
|   |   |   |   ├── tab1-routing.module.ts
|   |   |   |   └── tab1.page.ts
|   |   |   ├── tab2-transmit/
|   |   |   |   ├── tab2.page.html
|   |   |   |   ├── tab2.page.scss
|   |   |   |   ├── tab2.page.spec.ts
|   |   |   |   ├── tab2.module.ts
|   |   |   |   ├── tab2-routing.module.ts
|   |   |   |   └── tab2.page.ts
|   |   |   ├── tab3-config/
|   |   |   |   ├── tab3.page.html
|   |   |   |   ├── tab3.page.scss
|   |   |   |   ├── tab3.page.spec.ts
|   |   |   |   ├── tab3.module.ts
|   |   |   |   ├── tab3-routing.module.ts
|   |   |   |   └── tab3.page.ts
|   |   |   ├── subsites/
|   |   |   |   ├── beacon-detail/
|   |   |   |   |   ├── beacon-detail.page.html
|   |   |   |   |   ├── beacon-detail.page.scss
|   |   |   |   |   ├── beacon-detail.page.spec.ts
|   |   |   |   |   ├── beacon-detail.module.ts
|   |   |   |   |   ├── beacon-detail-routing.module.ts
|   |   |   |   |   └── beacon-detail.page.ts
|   |   |   |   ├── configure/
|   |   |   |   |   ├── missing-config/
|   |   |   |   |   |   ├── explore-container.page.html
|   |   |   |   |   |   ├── explore-container.page.scss
|   |   |   |   |   |   ├── explore-container.page.spec.ts
|   |   |   |   |   |   ├── explore-container.module.ts
|   |   |   |   |   |   ├── explore-container-routing.module.ts
|   |   |   |   |   |   └── explore-container.page.ts
|   |   |   |   |   ├── uuids/
|   |   |   |   |   |   ├── uuids.page.html
|   |   |   |   |   |   ├── uuids.page.scss
|   |   |   |   |   |   ├── uuids.page.spec.ts
|   |   |   |   |   |   ├── uuids.module.ts
|   |   |   |   |   |   ├── uuids-routing.module.ts
|   |   |   |   |   |   └── uuids.page.ts
|   |   ├── app-routing.module.ts
|   |   ├── app.component.html
|   |   ├── app.component.scss
|   |   ├── app.component.spec.ts
|   |   ├── app.component.ts
|   |   └── app.module.ts
|   └── main.ts
├── ios/
├── www/
├── resources/
├── package.json
├── tsconfig.json
└── ...
```
The most important files and folders are the following:
- services/
    - iBeacon/
        - receive/
            -receive-beacon.service.ts: Responsible for ranging Beacons
        - transmit/
            -receive-beacon.service.ts: Responsible for advertising phone as Beacon
    - shared/
        - storage/: Responsible for storing advertisingParameters and UUIDs to be scanned.
- pages/
    - tab1-scan/: HTML, CSS and TS for the first Tab, Receiving.
    - tab2-transmit/: HTML, CSS and TS for the second Tab, Transmitting.
    - tab3-config/: HTML, CSS and TS for the last Tab, Configuration.
    - subsites/
        - beacon-detail/: HTML, CSS and TS for a beacon-detail pane.
        - configure/
            - uuids/: HTML, CSS and TS for adding and deleting UUIDs from the Storage.

## 💻 Local Installation

Follow these steps to set up and run the application:

1. Install Node.js and npm if you haven't already. I recommend using [nvm](https://github.com/nvm-sh/nvm) for Node.js installation.

2. Install Ionic CLI globally:
```bash
npm install -g @ionic/cli
```

3. Clone the repository and navigate to the project folder:

```bash
git clone <repository-url>
cd project-folder
```

4. Install the project dependencies:

```bash
npm install
```
5. To run the app in the browser for development:
```bash
ionic serve
```
Please note that Bluetooth services are not available in a browser but only on a native ios device.

6. To run the app on a physical device or simulator:

For iOS:

```bash
ionic cap run ios
```

## Compatibility

- Tested on an iPhone 12 using IOS 16

## Resources

- Ionic Documentation: https://ionicframework.com/docs
- Cordova iBeacon Plugin: https://github.com/petermetz/cordova-plugin-ibeacon
- Apple iBeacon Guidelines: https://developer.apple.com/ibeacon/