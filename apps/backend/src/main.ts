import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionsFilter } from './filter/any-exception.filter';
import { ValidationPipe } from './pipe/validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
// console.log('====',process.env['NODE_TLS_REJECT_UNAUTHORIZED'] )
async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('./secrets/portal.baoli.com.key'),
  //   cert: fs.readFileSync('./secrets/portal.baoli.com_ssl.crt'),
  // };
  // const app = await NestFactory.create(AppModule, {
  //   httpsOptions,
  // });
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('首页Nodejs Api')
    .setDescription('The portal API description')
    .setVersion('1.0')
    // .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('apidoc', app, document);

  // 监听所有的请求路由，并打印日志
  app.use(logger);

  // 这样每个通过class-validator装饰过的类属性都会得到校验。 @IsString() @IsInt()等
  app.useGlobalPipes(new ValidationPipe());

  // 使用拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());

  //捕获所有异常，http异常必须放到下面
  app.useGlobalFilters(new AllExceptionsFilter());

  // 过滤处理 HTTP 异常
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port);
}
bootstrap();
