import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import { CredentialDto } from './dto/credential.dto';
import { LiffServerService } from './liff-server.service';

@Controller('liff/server')
export class LiffServerController {
  constructor(private readonly liffServerService: LiffServerService) {}

  @Get()
  healthCheck(): string {
    return this.liffServerService.healthCheck();
  }

  @Post('/token')
  createAccessToken(@Body() createAccessToken: CreateAccessTokenDto) {
    return this.liffServerService.createAccessToken(createAccessToken);
  }

  @Post('/apps')
  apps(@Body() credentialDto: CredentialDto) {
    return this.liffServerService.apps(credentialDto);
  }
}
