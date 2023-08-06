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
|   |   ├── core/
|   |   |   ├── models/
|   |   |   |   ├── beacon.model.ts
|   |   |   |   └── tx-parameters.model.ts
|   |   |   ├── services/
|   |   |   |   ├── i-beacon.service.ts
|   |   |   |   └── storage.service.ts
|   |   ├── pages/
|   |   |   ├── advertising/
|   |   |   |   ├── advertising.page.html
|   |   |   |   ├── advertising.page.scss
|   |   |   |   ├── advertising.page.spec.ts
|   |   |   |   └── advertising.page.ts
|   |   |   ├── scanning/
|   |   |   |   ├── scanning.page.html
|   |   |   |   ├── scanning.page.scss
|   |   |   |   ├── scanning.page.spec.ts
|   |   |   |   └── scanning.page.ts
|   ├── shared/
|   |   ├── defaults/
|   |   |   ├── default-rssi-filter.service.ts
|   |   |   └── default-tx-parameters.service.ts
|   |   ├── types/
|   |   |   ├── rssi-filter.model.ts
|   |   |   └── tx-parameters.model.ts
|   ├── app-routing.module.ts
|   ├── app.component.html
|   ├── app.component.scss
|   ├── app.component.spec.ts
|   ├── app.component.ts
|   ├── app.module.ts
|   └── main.ts
├── android/
├── ios/
├── www/
├── resources/
├── package.json
├── tsconfig.json
└── ...
```


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

## Resources