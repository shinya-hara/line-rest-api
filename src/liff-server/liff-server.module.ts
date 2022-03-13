import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LiffServerController } from './liff-server.controller';
import { LiffServerService } from './liff-server.service';

@Module({
  imports: [HttpModule],
  controllers: [LiffServerController],
  providers: [LiffServerService],
})
export class LiffServerModule {}
