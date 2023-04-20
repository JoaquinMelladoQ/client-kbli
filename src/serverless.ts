import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
//import * as cookieParser from 'cookie-perser';
import { AppModule } from "./app.module";
import serverlessExpress from '@vendia/serverless-express';
import {Callback, Context, Handler} from "aws-lambda";

let server:Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors:true });
  app.useGlobalPipes(new ValidationPipe);
  //app.use(cookiePerser());
  await app.init()

  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });

}

export const handler:Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
}
