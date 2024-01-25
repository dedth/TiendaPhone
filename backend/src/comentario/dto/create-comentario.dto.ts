import { IsEmail, IsString } from "class-validator";

export class CreateComentarioDto {

    @IsString()
    nombre: string;

    @IsEmail()
    @IsString()
    email: string;
   
    @IsString()
    comentario: string;
}
