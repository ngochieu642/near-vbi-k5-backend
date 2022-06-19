export class LoginResponseDto {
  constructor(public accessToken: string, public userId: number, public username: string) {}
}
