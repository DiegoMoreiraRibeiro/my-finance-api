import { ApiProperty } from '@nestjs/swagger';

export class LoginView {
  @ApiProperty()
  email: string;

  @ApiProperty()
  senha: string;
}
