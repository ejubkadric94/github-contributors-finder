import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('contributors')
export class ContributorsController {
    constructor(private readonly appService: AppService) {}

    @Get()
    async findContributorsOfGithubRepo(@Query() query: { repositoryId: string, githubUser: string }): Promise<string[]> {
        const { repositoryId, githubUser } = query;
        if (!repositoryId || !githubUser) {
            throw new HttpException('Github user or repository not specified', HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.appService.getContributorsFromGithub(githubUser, repositoryId);
        } catch (error) {
            throw new HttpException(error.response.data.message, HttpStatus.BAD_REQUEST)
        }
    }
}
