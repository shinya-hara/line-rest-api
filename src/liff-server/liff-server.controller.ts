import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddLiffAppDto } from './dto/add-liff-app.dto';
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
  getLiffAllApps(@Body() credentialDto: CredentialDto) {
    return this.liffServerService.getLiffAllApps(credentialDto);
  }

  @Post('/add-apps')
  addLiffApp(
    @Body() credentialDto: CredentialDto,
    @Body() addLiffAppDto: AddLiffAppDto,
  ) {
    return this.liffServerService.addLiffApp(credentialDto, addLiffAppDto);
  }
}
