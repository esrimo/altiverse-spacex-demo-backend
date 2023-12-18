if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as core from 'express-serve-static-core';
import { CreateRoutes } from './controllers/CreateRoutes';
import { sync } from './models';
import { resolvers, typeDefs } from './routes/graphql';
import { jwtController } from './controllers';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serverlessExpress = require('@vendia/serverless-express');

const getIpAddress = (request: express.Request): string | undefined => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return request.clientIp || undefined;
};

const getDeviceUniqueIdentifier = (request: express.Request): string | undefined => {
  if (request?.headers?.deviceUniqueIdentifier) {
    return request.headers.deviceUniqueIdentifier.toString();
  }
  return;
};

export const createApp = async (): Promise<core.Express> => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
    includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production',
  });

  server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

  const app = express();
  await sync();

  CreateRoutes(app);

  app.use(
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const { event, context } = serverlessExpress.getCurrentInvoke();
        return {
          expressRequest: req,
          expressResponse: res,
          lambdaEvent: event,
          lambdaContext: context,
          ...(await jwtController.createAuthScope(req.headers.authorization)),
          ip: getIpAddress(req),
          deviceUniqueIdentifier: getDeviceUniqueIdentifier(req),
          userAgent: req.headers['user-agent'],
        };
      },
    }),
  );


  return app;

  // return new Promise((resolve, reject) => {
  //   const ready = err => {
  //     if (err) {
  //       reject(err);
  //     }
  //     CreateRoutes(app);

  //     app.use(
  //       cors(),
  //       json(),
  //       // helmet(),
  //       // expressMiddleware(server, {
  //       //   context: async ({ req, res }) => {
  //       //     console.log(req, res);
  //       //     const { event, context } = serverlessExpress.getCurrentInvoke();

  //       //     return {
  //       //       expressRequest: req,
  //       //       expressResponse: res,
  //       //       lambdaEvent: event,
  //       //       lambdaContext: context,
  //       //       // ...(await jwtController.createAuthScope(req.headers.authorization)),
  //       //       ip: getIpAddress(req),
  //       //       deviceUniqueIdentifier: getDeviceUniqueIdentifier(req),
  //       //       userAgent: req.headers['user-agent'],
  //       //       // callbackWaitsForEmptyEventLoop: false,
  //       //     };
  //       //   },
  //       // }),
  //     );
  //     resolve(app);
  //   };

  //   app.use(new RateLimiterMiddleware(ready).middleware);
  // });
};

async function setup(event, context) {
  const app = await createApp();
  return serverlessExpress({ app })(event, context);
}

exports.handler = setup;
// exports.handler = Sentry.AWSLambda.wrapHandler(setup).handler;
