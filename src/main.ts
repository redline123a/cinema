import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const PORT = process.env.PORT || 4200
	app.setGlobalPrefix('api')
	app.enableCors()
	await app.listen(PORT)
}
bootstrap()
