import { Controller, Get } from '@nestjs/common';
import { LiffServerService } from '../services/liff-server.service';

@Controller('liff/server')
export class LiffServerController {
  constructor(private readonly liffServerService: LiffServerService) {}

  @Get()
  healthCheck(): string {
    return this.liffServerService.healthCheck();
  }

  @Get('/apps')
  apps() {
    return this.liffServerService.apps();
  }
}
