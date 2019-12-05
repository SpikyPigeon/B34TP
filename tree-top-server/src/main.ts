import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();

	const options = new DocumentBuilder()
		.setTitle("B34TP Api")
		.setDescription("Api for TreeTopTown Client App")
		.addTag("simulation")
		.addTag("tree")
		.setVersion("0.1")
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup("swagger", app, document);

	await app.listen(1337);
}

bootstrap();
