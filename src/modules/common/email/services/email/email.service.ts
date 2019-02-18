import { Email, EmailProvider } from '@teamhive/typedi-common';
import * as config from 'config';
import { Service } from 'typedi';

@Service()
export class EmailService {
    sendTo: string[];

    constructor(
        @EmailProvider() private readonly email: Email
    ) {
        this.sendTo = config.get('email.sendTo');
    }

    async sendExampleEmail() {
        return await this.email.send({
            message: {
                to: this.sendTo
            },
            template: 'sample-template',
            locals: {
                // variables to pass into email
            }
        });
    }
}
