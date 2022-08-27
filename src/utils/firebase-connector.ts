import admin from 'firebase-admin';
import serviceAccount from "../../keys/ajuknievich-dd4c3-firebase-key.json";

admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'pbp-alpha'
})

export default admin;
