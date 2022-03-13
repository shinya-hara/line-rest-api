import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LiffServerController } from './controllers/liff-server.controller';
import { LiffServerService } from './services/liff-server.service';

@Module({
  imports: [HttpModule],
  controllers: [LiffServerController],
  providers: [LiffServerService],
})
export class LiffServerModule {}
