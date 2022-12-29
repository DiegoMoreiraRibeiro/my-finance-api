import { Module } from '@nestjs/common';
import { UsersService } from '../../domain/service/users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
