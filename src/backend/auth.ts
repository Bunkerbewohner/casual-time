import * as firebase from "firebase"
import * as firebaseui from "firebaseui"

// FirebaseUI config.
const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '/tos'
};

export function startAuth(cssSelector="#firebaseui-auth-container") {
    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    // The start method will wait until the DOM is loaded.
    ui.start(cssSelector, uiConfig)
}