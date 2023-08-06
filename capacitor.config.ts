import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.hemkendreis.app',
  appName: 'iScanner',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
