import { IsEmail, IsString } from "class-validator";


export class CreateContactoDto {
    
    @IsString()
    nombre: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    asunto: string;    
  
    @IsString()
    mensage: string;
}
