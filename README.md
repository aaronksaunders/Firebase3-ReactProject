# React Native Firebase File Upload

## IOS ONLY NOW... STILL WORKING ON ANDROID

### Plugins Used

- [https://github.com/wkh237/react-native-fetch-blob](https://github.com/wkh237/react-native-fetch-blob)
- [https://github.com/marcshilling/react-native-image-picker](https://github.com/marcshilling/react-native-image-picker)

### Set Keys in `Info.plist`
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>For testing only</string>
<key>NSCameraUsageDescription</key>
<string>For testing only</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>For testing only</string>
```

### Set Firebase Configuration in  `service/FirebaseService.js`
```javascript
// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR-VALUES-HERE",
    authDomain: "YOUR-VALUES-HERE.firebaseapp.com",
    databaseURL: "https://YOUR-VALUES-HERE.firebaseio.com",
    storageBucket: "YOUR-VALUES-HERE.appspot.com",
    messagingSenderId: "YOUR-VALUES-HERE"
};
```