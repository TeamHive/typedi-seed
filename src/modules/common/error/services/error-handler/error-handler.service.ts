import * as config from 'config';
import * as log from 'log4js';
import * as Raven from 'raven';
import { Service } from 'typedi';
import { LoggerProvider } from '../../../logger/providers/logger.provider';
import { Breadcrum } from '../../interfaces/breadcrum.interface';

@Service()
export class ErrorHandler {
    config: Raven.ConstructorOptions;
    dsn: string;
    doLog: boolean;

    constructor(
        @LoggerProvider() private readonly logger: log.Logger
    ) {
        try {
            this.dsn = config.get<string>('raven.dsn') || null;

            this.config = {
                environment: process.env.NODE_ENV,
                release: process.env.npm_package_version,
                autoBreadcrumbs: true,
                captureUnhandledRejections: true
            };

            if (this.dsn) {
                Raven.config(this.dsn, this.config).install();
            }

            this.doLog = config.get<string>('logger.level') === 'debug';
        }
        catch (error) {
            this.logger.error(error);
        }
    }

    captureBreadcrumb(breadcrumb: Breadcrum): void {
        if (process.env.DEPLOYMENT) {
            Raven.captureBreadcrumb(breadcrumb);
        }

        if (this.doLog) {
            this.logger.info(breadcrumb.message);
        }
    }

    captureException(error: Error): void {
        if (process.env.DEPLOYMENT) {
            Raven.captureException(error);
        }

        if (this.doLog) {
            this.logger.error(error.stack);
        }
    }

    captureMessage(message: string): void {
        if (process.env.DEPLOYMENT) {
            Raven.captureMessage(message);
        }

        if (this.doLog) {
            this.logger.info(message);
        }
    }
}
