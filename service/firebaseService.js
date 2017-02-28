
//
// FOR THE BLOB
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
//
//

const firebase = require("firebase");

// Initialize Firebase
const firebaseConfig = {
    // YOUR VALUES HERE
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class FirebaseService {
    /**
     * 
     * 
     * @param {any} _path
     * @param {any} _file
     * @returns
     */
    doFirebaseUploadStuff(_path, _file) {

        return new Promise((resolve, reject) => {
            var uploadTask = firebase.storage().ref(_path)
                .put(_file, { contentType: 'image/jpeg' })

            uploadTask.on('state_changed', function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, function (error) {
                // Handle unsuccessful uploads
                reject(error)
            }, function () {
                // Handle successful uploads on complete
                resolve(uploadTask.snapshot)
            });
        });
    }

    /**
     * 
     * 
     * @param {any} {uri, fileName}
     * @returns
     */
    uploadFile({ uri, fileName }) {

        var forCleanUp = null

        return new Promise((resolve, reject) => {
            Blob.build('RNFetchBlob-' + uri, { type: 'image/jpeg' })
                .then((blob) => {
                    forCleanUp = blob;

                    console.log("got blob...")
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
    }
}

export default new FirebaseService()