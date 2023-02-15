import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { GithubApi } from '../thirdPartyApi/api';

@Injectable()
export class ContributorsService {
  constructor(private readonly httpService: HttpService) {}

  async getContributorsFromGithub(githubUser: string, repositoryId: string): Promise<string[]> {
    const contributorsConfig = GithubApi.getContributorsConfig(githubUser, repositoryId);
    const { data } = await lastValueFrom(
        this.httpService.get(contributorsConfig.url, { ...contributorsConfig })
    );

    return data.map(el => el.html_url);
  }
}
