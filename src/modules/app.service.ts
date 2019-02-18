import { ErrorHandler } from '@teamhive/typedi-common';
import { Service } from 'typedi';
import { EmailService } from './common/email/services/email/email.service';

@Service()
export class AppService {
    constructor(
        private readonly emailService: EmailService,
        private readonly errorHandler: ErrorHandler
    ) {}

    async run(): Promise<void> {
        try {
            const startTime = Date.now();
            this.errorHandler.captureBreadcrumb({ message: 'Running TypeDi Seed...' });

            // do things in services...

            // send report
            const emailSent = await this.emailService.sendExampleEmail();

            // soft delete all of those alerts if sent successfully
            if (emailSent) {
                this.errorHandler.captureBreadcrumb({ message: 'Successfully sent example email.' });
            }
            else {
                this.errorHandler.captureBreadcrumb({ message: 'Example email not sent.' });
            }

            this.errorHandler.captureBreadcrumb({ message: `Finished TypeDi seeds in ${Date.now() - startTime} ms` });
            this.exit();
        }
        catch (error) {
            this.errorHandler.captureException(error);
            this.exit();
        }
    }

    private exit(): void {
        // any preexit tasks

        process.exit();
    }
}
