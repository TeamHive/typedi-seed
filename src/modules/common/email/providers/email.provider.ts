import * as config from 'config';
import * as Email from 'email-templates';
import * as nodemailerSendgrid from 'nodemailer-sendgrid';
import * as path from 'path';
import { Container } from 'typedi';

export function EmailProvider() {
    return (object: any, propertyName: string, index?: number) => {

        const email = new Email({
            message: {
                from: config.get<string>('email.noReplyEmailAddress')
            },
            send: config.get('email.send') as boolean,
            transport: nodemailerSendgrid({
                apiKey: config.get<string>('email.sendgrid.apiKey')
            }),
            preview: false,
            juice: true,
            juiceResources: {
                preserveImportant: true,
                webResources: {
                    relativeTo: path.resolve('emails/shared')
                }
            }
        });

        Container.registerHandler({ object, propertyName, index, value: _containerInstance => email });
    };
}
