import { APIGatewayProxyEvent, Callback, Context, Handler } from 'aws-lambda';
import { bootstrap } from '../serverless';
let server: Handler;

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
