import {Router} from 'express';

import webhooks from "./v1.0/webhooks";

export default (app) => {

    // @ts-ignore
    const routes = new Router({})

    routes.use('/webhooks', webhooks());
    app.use('/v1.0/', routes);
}
