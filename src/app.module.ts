import { Module } from '@nestjs/common';
import { LiffServerModule } from './liff-server/liff-server.module';

@Module({
  imports: [LiffServerModule],
})
export class AppModule {}
