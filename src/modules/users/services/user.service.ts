import * as config from 'config';
import * as log from 'log4js';
import { Service } from 'typedi';
import { HttpService } from '../../common/https/https.service';
import { Logger } from '../../common/logger/logger.provider';
import { User } from '../interfaces/user';

@Service()
export class UserService {

    constructor(
        private httpService: HttpService,
        @Logger() private readonly logger: log.Logger
    ) { }

    async fetchUsers() {
        this.logger.info('Fetching Users');
        return await this.httpService.fetch<User>(config.get('request.fetchUsers'));
    }

}
