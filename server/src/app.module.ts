import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './shared/middleware/auth.middleware';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { QuestionsModule } from './questions/questions.module';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { config } from './config/default';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongo_uri),
    AuthModule,
    QuestionsModule,
    UserModule,
    TagModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'users/*', method: RequestMethod.ALL }
      );
  }
}
