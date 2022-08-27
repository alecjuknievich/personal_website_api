import {v4} from "uuid";

import {ContactSubmission} from "../interfaces/webhooks";
import admin from "../utils/firebase-connector";

import webhookConfig from "../../keys/webhooks.json";
import axios from "axios";

class Webhooks {
    async contactSubmission(submission: ContactSubmission) {
        return new Promise<boolean>(async (resolve, reject) => {
            try{
                const docId = v4();
                await this.dbRef('testSubmission').doc(docId).set(submission);
                const body  = {
                    embeds: [{
                        color: 3313216,
                        timestamp: new Date(),
                        fields: [
                            {
                                name: `${submission.subject}`,
                                value: `${submission.message} \n \n Phone: ${submission.phone} \n Email: ${submission.email}`
                            }
                        ]
                    }]
                };
                await this.discordWebhook(webhookConfig.discordLog, body);
                resolve(true);
            } catch (e) {
                // console.log(e);
                reject(e);
            }
        })
    }

    async discordWebhook(url, body) {
        return new Promise<any>(async (resolve, reject) => {
            axios({
                method: "POST",
                url: url,
                data: body
            }).then((res) => {
                resolve(res);
            }).catch((e) => {
                reject(e);
            })
        })
    }

    dbRef(collection: string){
        return admin.firestore().collection(collection);
    }

}

export default Webhooks;