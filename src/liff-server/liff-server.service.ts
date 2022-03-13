import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import { CredentialDto } from './dto/credential.dto';
import { ICreateAccessTokenResponse } from './interface/api/create-access-token.interface';

@Injectable()
export class LiffServerService {
  constructor(private httpService: HttpService) {}

  healthCheck() {
    return 'OK';
  }

  /**
   * 短期のチャネルアクセストークンを発行する
   * @see https://developers.line.biz/ja/reference/messaging-api/#issue-shortlived-channel-access-token
   */
  createAccessToken(createAccessTokenDto: CreateAccessTokenDto) {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', createAccessTokenDto.clientId);
    params.append('client_secret', createAccessTokenDto.clientSecret);

    return this.httpService
      .post<ICreateAccessTokenResponse>(
        'https://api.line.me/v2/oauth/accessToken',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .pipe(
        map((response) => {
          const data = response.data;
          return {
            accessToken: data.access_token,
          };
        }),
      );
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
