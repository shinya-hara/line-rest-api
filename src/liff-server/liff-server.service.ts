import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { CredentialDto } from './dto/credential-dto';

@Injectable()
export class LiffServerService {
  constructor(private httpService: HttpService) {}

  healthCheck() {
    return 'OK';
  }

  apps(credentialDto: CredentialDto) {
    return this.httpService
      .get('https://api.line.me/liff/v1/apps', {
        headers: {
          Authorization: 'Bearer ' + credentialDto.channelAccessToken,
        },
      })
      .pipe(map((response) => response.data));
  }
}
