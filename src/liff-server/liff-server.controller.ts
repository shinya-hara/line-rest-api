import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
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
  createAccessToken(@Body() createAccessTokenDto: CreateAccessTokenDto) {
    return this.liffServerService.createAccessToken(createAccessTokenDto);
  }

  @Get('/apps')
  getLiffAllApps(@Headers('Authorization') authorization: string) {
    return this.liffServerService.getLiffAllApps(authorization);
  }

  @Post('/apps')
  addLiffApp(
    @Headers('Authorization') authorization: string,
    @Body() addLiffAppDto: AddLiffAppDto,
  ) {
    return this.liffServerService.addLiffApp(authorization, addLiffAppDto);
  }
}
