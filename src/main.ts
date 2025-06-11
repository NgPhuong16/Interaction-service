import { createAppInstance } from './app';

async function bootstrap() {
  const app = await createAppInstance();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
