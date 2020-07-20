import { Module, HttpModule } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
