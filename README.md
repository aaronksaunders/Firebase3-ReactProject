# React Native Firebase File Upload

## IOS ONLY NOW... STILL WORKING ON ANDROID

### Still investigating
On IOS when using the `NFetchBlob.wrap(PATH_TO_THE_FILE)` call, is was prepending `RNFetchBlob-file://` to the file path I get from IOS and that path already starts with `file://` This requrires me to account for it before calling wrap

```javascript
  uploadFile({ uri, fileName }) {

        var forCleanUp = null

        return new Promise((resolve, reject) => {

            // create the blob for firebase
            let path = uri.replace('file://', '');

            // we are wrapping the path so that RNFetchBlob know where to find
            // the data, see RNFetchBlob documentation for more information
            Blob.build(RNFetchBlob.wrap(path), { type: 'image/jpeg' })
                .then((blob) => {
                    forCleanUp = blob;
                    console.log("got blob...")

                    // now that we have a blob, upload it to firebase
                    return this.doFirebaseUploadStuff('images/' + fileName, blob)
                }).then((snap) => {
                    forCleanUp.close()
                    console.log("file uploaded...")
                    resolve(snap)
                }, (err) => {
                    console.log('err', err)
                    forCleanUp && forCleanUp.close()
                    reject(err)
                }).catch((err) => {
                    console.log('catch', err)
                    forCleanUp && forCleanUp.close()
                    reject(err)
                })
        })
```
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