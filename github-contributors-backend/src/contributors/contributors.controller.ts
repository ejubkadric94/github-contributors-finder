import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { INVALID_QUERY_PARAMETERS } from '../utilities/texts';
import { ContributorsService } from './contributors.service';

@Controller('contributors')
export class ContributorsController {
    constructor(private readonly contributorsService: ContributorsService) {}

    @Get()
    async findContributorsOfGithubRepo(@Query() query: { repositoryId: string, githubUser: string }): Promise<string[]> {
        const { repositoryId, githubUser } = query;
        if (!repositoryId || !githubUser) {
            throw new HttpException(INVALID_QUERY_PARAMETERS, HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.contributorsService.getContributorsFromGithub(githubUser, repositoryId);
        } catch (error) {
            throw new HttpException(error.response.data.message, HttpStatus.BAD_REQUEST)
        }
    }
}
