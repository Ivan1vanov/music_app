import { Injectable } from "@nestjs/common";
import {InjectModel} from '@nestjs/mongoose'
import { Mode } from "fs";
import {Model, ObjectId} from 'mongoose'
import { Track, TrackDocument } from './schemas/track.schems';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { TrackDto } from './dto/track.dto';
import { CommentDto } from './dto/comment.dto';
import { FileService } from '../file/file.service';
import { TypeFile } from "src/file/file.service";


@Injectable()
export class TrackService {

    constructor (
    @InjectModel(Track.name) private tarckModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService
    ) {}

    async getAll(count = 10, offset = 0): Promise<Track[]> {
        const tracks = await this.tarckModel.find().skip(Number(offset)).limit(Number(count))
        return tracks
    }

    async search(query: string): Promise<Track[]> {
        const tracks = await this.tarckModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })
        return tracks
    }

    async create(dto: TrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(TypeFile.AUDIO, audio)
        const imagePath = this.fileService.createFile(TypeFile.IMAGE, picture)
        const track = await this.tarckModel.create({...dto, listens: 1, audio: audioPath, picture: imagePath})
        return track
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await (await this.tarckModel.findById(id)).populate('comments')
        return track
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const track = await this.tarckModel.findByIdAndDelete(id)
        return track._id
    }

    async addComment(dto: CommentDto): Promise<Comment> {
        const track = await this.tarckModel.findById(dto.trackId)
        const comment = await this.commentModel.create({...dto})
        track.comments.push(comment._id)
        await track.save()
        return comment
    }

    async listen(id: ObjectId) {
        const track = await this.tarckModel.findById(id)
        track.listens += 1
        track.save()
    }
}