import * as log from 'log4js';
import * as config from 'config';
import { Container } from 'typedi';

export function Logger() {
    return (object: any, propertyName: string, index?: number) => {
        const logger = log.getLogger();
        logger.level = config.get('logger.level');
        Container.registerHandler({ object, propertyName, index, value: _containerInstance => logger });
    };
}
