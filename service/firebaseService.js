
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
     * @param {String} _path
     * @param {any} _blob
     * @returns
     */
    doFirebaseUploadStuff(_path, _blob) {

        return new Promise((resolve, reject) => {
            var uploadTask = firebase.storage().ref(_path)
                .put(_blob, { contentType: 'image/jpeg' })

            uploadTask.on('state_changed', (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, (error) => {
                // Handle unsuccessful uploads
                reject(error)
            }, () => {
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
    }
}

export default new FirebaseService()