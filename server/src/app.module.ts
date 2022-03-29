import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import {MongooseModule} from '@nestjs/mongoose'
import { FileModule } from './file/file.module';
import {ServeStaticModule} from '@nestjs/serve-static'
import * as path from 'path'

@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        MongooseModule.forRoot('mongodb+srv://music:music@cluster0.0pgtv.mongodb.net/spotify_clone?retryWrites=true&w=majority'),
        TrackModule,
        FileModule
    ]
})

export class AppModule {}