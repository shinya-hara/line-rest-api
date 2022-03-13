import { Body, Controller, Get, Post } from '@nestjs/common';
import { CredentialDto } from './dto/credential-dto';
import { LiffServerService } from './liff-server.service';

@Controller('liff/server')
export class LiffServerController {
  constructor(private readonly liffServerService: LiffServerService) {}

  @Get()
  healthCheck(): string {
    return this.liffServerService.healthCheck();
  }

  @Post('/apps')
  apps(@Body() credentialDto: CredentialDto) {
    return this.liffServerService.apps(credentialDto);
  }
}
