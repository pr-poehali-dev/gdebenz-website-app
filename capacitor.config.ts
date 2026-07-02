import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ru.analytica.app',
  appName: 'Analytica',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
