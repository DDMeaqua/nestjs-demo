import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [UserModule, ListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
