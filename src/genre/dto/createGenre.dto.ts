import { prop } from "@typegoose/typegoose"
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"
import { IsString } from "class-validator"

export class CreateGenreDto{
    @IsString()
    name: string

    @IsString()
    slug: string

    @IsString()
    description: string
    
    @IsString()
    icon: string
}