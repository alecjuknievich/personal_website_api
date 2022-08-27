import {Router} from 'express';

import Webhooks from "../../../controllers/webhooks";
import {validateContactSubmission} from "./validation";

export default () => {

    // @ts-ignore
    const routes = new Router({});
    const webhooks = new Webhooks();

    routes.get('/health-check', async (req, res) => {
        const response = {
            healthy: true
        };

        res.json(response);
    });


    routes.post('/contact-submission', async (req, res) => {
        try {
            const result = validateContactSubmission.validate(req.body);
            const { value, error } = result;
            const valid = error == null;
            if (valid) {
                console.log(value)
                await webhooks.contactSubmission(value);
                res.json({success: true});
            } else {
                res.status(424)
                res.json({
                    success: false,
                    reason: 'invalid payload'
                })
            }

        } catch (e) {
            console.log(e)
            res.status(424)
            res.json({success: false});
        }
    });

    return routes;
}
