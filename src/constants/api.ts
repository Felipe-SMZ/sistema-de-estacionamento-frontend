import { Platform } from 'react-native';

export const apiBaseUrl =
    Platform.OS === 'web'
        ? 'http://localhost:8081'
        : 'http://10.0.2.2:8081';