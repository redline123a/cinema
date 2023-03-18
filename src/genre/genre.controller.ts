import { Body, Param,Query, Delete, Post, Controller, HttpCode, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { CreateGenreDto } from './dto/createGenre.dto';
import { GenreService } from './genre.service';


@Controller('genres')
export class GenreController {
    constructor(private readonly GenreService: GenreService) {}

    @Get('by-slug/:slug')
    async bySlug(@Param('slug') slug: string){
        return this.GenreService.bySlug(slug)
    }

    @Get('/collections')
    @Auth('admin')
    async getCollections(){
        return this.GenreService.getCollections()
    }

    @Get()
    async getAll(@Query('searchTerm') searchTerm?: string){
        return this.GenreService.getAll(searchTerm)
    }

    @Get(':id')
    @Auth('admin')
    async get(@Param('id', IdValidationPipe) id: string){
        return this.GenreService.byId(id)
    }

    @UsePipes(new ValidationPipe())
    @Post()
    @HttpCode(200)
    @Auth('admin')
    async create(){
        return this.GenreService.create()
    }

    @UsePipes(new ValidationPipe())
    @Put(':id')
    @HttpCode(200)
    @Auth('admin')
    async update(
        @Param('id', IdValidationPipe) id: string,
        @Body() dto: CreateGenreDto
    ){
        return this.GenreService.update(id, dto)
    }

    @Delete(':id')
    @HttpCode(200)
    @Auth('admin')
    async deleteGenre(@Param('id', IdValidationPipe) id: string){
        return this.GenreService.delete(id)
    }
}
