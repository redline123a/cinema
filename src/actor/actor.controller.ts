import { Controller, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { Delete, Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body, Param, Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { Auth } from 'src/auth/decorators/Auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { ActorDto } from './actor.dto';
import { ActorService } from './actor.service';

@Controller('actors')
export class ActorController {
    constructor(private readonly ActorService: ActorService) {}

    @Get('by-slug/:slug')
    async bySlug(@Param('slug') slug: string){
        return this.ActorService.bySlug(slug)
    }

    @Get()
    async getAll(@Query('searchTerm') searchTerm?: string){
        return this.ActorService.getAll(searchTerm)
    }

    @Get(':id')
    @Auth('admin')
    async get(@Param('id', IdValidationPipe) id: string){
        return this.ActorService.byId(id)
    }

    @UsePipes(new ValidationPipe())
    @Post()
    @HttpCode(200)
    @Auth('admin')
    async create(){
        return this.ActorService.create()
    }

    @UsePipes(new ValidationPipe())
    @Put(':id')
    @HttpCode(200)
    @Auth('admin')
    async update(
        @Param('id', IdValidationPipe) id: string,
        @Body() dto: ActorDto
    ){
        return this.ActorService.update(id, dto)
    }

    @Delete(':id')
    @HttpCode(200)
    @Auth('admin')
    async deleteActor(@Param('id', IdValidationPipe) id: string){
        return this.ActorService.delete(id)
    }
}
