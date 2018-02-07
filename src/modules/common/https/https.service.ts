import * as https from 'https';
import { Service } from 'typedi';

@Service()
export class HttpService {
    constructor() {}

    fetch<T>(url: string): Promise<T[]> {
        return new Promise(resolve => {
            https.get(url, res => {
                let body = '';

                res.on('data', chunk => {
                    body += chunk;
                });

                res.on('end', () => {
                    resolve(JSON.parse(body));
                });
            }).on('error', e => {
                throw e;
            });
        });
    }
}
