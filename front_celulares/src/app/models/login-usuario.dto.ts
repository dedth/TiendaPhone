export class LoginUsuarioDto {

    nombreUsuario: string;

    password: string;

    tipoUsuario: string;

    constructor(nombreUsuario: string, password: string , tipoUsuario: string) {
        this.nombreUsuario = nombreUsuario;
        this.password = password;
        this.tipoUsuario = tipoUsuario;
    }
}
