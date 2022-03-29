import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import {InjectModel} from '@nestjs/mongoose'
import { Track, TrackDocument } from './schemas/track.schems';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { TrackDto } from './dto/track.dto';
import { TrackService } from "./track.service";
import { CommentDto } from './dto/comment.dto';
import { FileFieldsInterceptor } from "@nestjs/platform-express";


@Controller('/tracks')
export class TrackControler {

    constructor(private trackService: TrackService) {}

    @Get()
    getAll(@Query('count') count: number,
        @Query('offset') offset: number
    ) {
        return this.trackService.getAll(count, offset)
    }

    @Get('/search')
    search(@Query('query') query: string) {
        return this.trackService.search(query)
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
        {name: 'audio', maxCount: 1}
    ]))
    create(@UploadedFiles() files, @Body() dto: TrackDto) {
        const {picture, audio} = files
        console.log(dto, picture, audio)
        return this.trackService.create(dto, picture[0], audio[0])
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.trackService.getOne(id)
    }

    @Delete(':id')
    delete(@Param() param) {
        return this.trackService.delete(param.id)
    }

    @Post('/comment')
    addComment(@Body() dto: CommentDto) {
        return this.trackService.addComment(dto)
    }

    @Post('/listen/:id')
    listen(@Param('id') id: ObjectId) {
        return this.trackService.listen(id)
    }
}