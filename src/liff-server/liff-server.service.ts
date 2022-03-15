import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import { AddLiffAppDto } from './dto/add-liff-app.dto';
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

  /**
   * すべてのLIFFアプリを取得する
   * @see https://developers.line.biz/ja/reference/liff-server/#get-all-liff-apps
   */
  getLiffAllApps(authorization: string) {
    return this.httpService
      .get('https://api.line.me/liff/v1/apps', {
        headers: {
          Authorization: authorization,
        },
      })
      .pipe(map((response) => response.data));
  }

  /**
   * LIFFアプリをチャネルに追加する
   * @see https://developers.line.biz/ja/reference/liff-server/#add-liff-app
   */
  addLiffApp(authorization: string, addLiffAppDto: AddLiffAppDto) {
    return this.httpService
      .post('https://api.line.me/liff/v1/apps', addLiffAppDto, {
        headers: {
          Authorization: authorization,
        },
      })
      .pipe(map((response) => response.data));
  }
}
