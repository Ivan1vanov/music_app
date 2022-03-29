import { Module } from "@nestjs/common";
import { TrackControler } from './track.controler';
import { TrackService } from './track.service';
import {MongooseModule} from '@nestjs/mongoose'
import { Track, TrackSchema } from './schemas/track.schems';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { FileService } from "src/file/file.service";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])
    ],
    controllers: [TrackControler],
    providers: [TrackService, FileService]
})
export class TrackModule {}