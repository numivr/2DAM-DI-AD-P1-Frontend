export class RegistroDTO {
  usuario: string;
  password: string;
  email: string;

  constructor(usuario: string, password: string, email: string) {
    this.usuario = usuario;
    this.password = password;
    this.email = email;
  }
}
