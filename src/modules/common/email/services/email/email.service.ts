import * as config from 'config';
import * as Email from 'email-templates';
import { Service } from 'typedi';
import { ErrorHandler } from '../../../error/services/error-handler/error-handler.service';
import { EmailProvider } from '../../providers/email.provider';

@Service()
export class EmailService {
    sendTo: string[];

    constructor(
        @EmailProvider() private readonly email: Email,

        private readonly errorHandler: ErrorHandler
    ) {
        this.sendTo = config.get('email.sendTo');
    }

    async sendExampleEmail(): Promise<boolean> {
        return await this.send({
            message: {
                to: this.sendTo
            },
            template: 'sample-template',
            locals: {
                // variables to pass into email
            }
        });
    }

    async send(mailData: any): Promise<boolean> {
        try {
            const response = await this.email.send(mailData);

            if (response[0] && response[0].statusCode && response[0].statusCode === 202) {
                return true;
            }
            return false;
        }
        catch (error) {
            this.errorHandler.captureException(error);
            return false;
        }
    }
}
