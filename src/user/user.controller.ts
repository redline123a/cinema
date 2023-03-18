import { Body, Param,Query, Delete, Controller, HttpCode, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly UserService:UserService) {}

    @Get('profile')
    @Auth()
    async getProfile(@User('_id') _id: string){
        return this.UserService.byId(_id)
    }

    @Get('count')
    @Auth('admin')
    async getCountUsers(){
        return this.UserService.getCount()
    }

    @Get()
    @Auth('admin')
    async getUsers(@Query('searchTerm') searchTerm?: string){
        return this.UserService.getAll(searchTerm)
    }

    @Get(':id')
    @Auth('admin')
    async getUser(@Param('id', IdValidationPipe) id: string){
        return this.UserService.byId(id)
    }

    @UsePipes(new ValidationPipe())
    @Put('profile')
    @HttpCode(200)
    @Auth()
    async updateProfile(@User('_id') _id: string, @Body() dto: UpdateUserDto){
        return this.UserService.updateProfile(_id, dto)
    }

    @UsePipes(new ValidationPipe())
    @Put(':id')
    @HttpCode(200)
    @Auth('admin')
    async updateUser(@Param('id', IdValidationPipe) id: string, @Body() dto: UpdateUserDto){
        return this.UserService.updateProfile(id, dto)
    }

    @Delete(':id')
    @HttpCode(200)
    @Auth('admin')
    async deleteUser(@Param('id', IdValidationPipe) id: string){
        return this.UserService.delete(id)
    }
}
