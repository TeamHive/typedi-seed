import 'reflect-metadata';
import * as log from 'log4js';
import * as config from 'config';
import { Container } from 'typedi/Container';
import { UserService } from './modules/users/services/index';
import { CsvService } from './modules/common/csv/csv.service';

const logger = log.getLogger();
logger.level = config.get('logger.level');

const userService = Container.get(UserService);
const csvService = Container.get(CsvService);

async function init() {
    try {
        const users = await userService.fetchUsers();

        await csvService.export({
            fields: [
                'id',
                'username',
                'name',
                'phone'
            ],
            data: users
        });

        logger.info('Done!');

        process.exit();

    }
    catch (error) {
        logger.error(error);
    }
}

init();
