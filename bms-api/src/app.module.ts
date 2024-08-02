import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseService } from './firebase/firebase.service';
import { FileUploadService } from './fileupload/fileupload.service';
import { FileUploadResolver } from './fileupload/fileupload.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/bmsdb'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    UserModule,
    BookModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    FirebaseService,
    FileUploadService,
    FileUploadResolver,
  ],
})
export class AppModule {}
