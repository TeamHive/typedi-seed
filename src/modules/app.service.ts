import NodeEventHandler from '@teamhive/node-event-handler';
import { ErrorHandler } from '@teamhive/typedi-common';
import { Service } from 'typedi';

@Service()
export class AppService {
    constructor(
        private readonly errorHandler: ErrorHandler
    ) { }

    async run() {
        try {
            // handle uncaught exceptions
            NodeEventHandler.handleUnhandledRejection(this.errorHandler);
            NodeEventHandler.handleUncaughtException(this.errorHandler);

            const startTime = Date.now();
            this.errorHandler.captureBreadcrumb({ message: 'Running TypeDi Seed...' });

            // do things in services...

            this.errorHandler.captureBreadcrumb({ message: `Finished TypeDi seeds in ${Date.now() - startTime} ms` });
            this.exit();
        }
        catch (error) {
            // await to guarantee the error gets captured before the process exits
            await this.errorHandler.captureException(error);
            this.exit();
        }
    }

    private exit(): void {
        // any preexit tasks

        process.exit();
    }
}
