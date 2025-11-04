import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '../auth';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/coachxdb'),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule.forRoot({auth})
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
