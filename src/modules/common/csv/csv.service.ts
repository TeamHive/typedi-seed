import * as fs from 'fs';
import * as config from 'config';
import * as log from 'log4js';
import * as json2csv from 'json2csv';
import { Service } from 'typedi';
import { Logger } from '../logger/logger.provider';

@Service()
export class CsvService {
    constructor(
        @Logger() private readonly logger: log.Logger
     ) { }

    async export(options: {
        fields: string[];
        data: any[];
        fileOutput?: string;
    }) {
        return new Promise(resolve => {
            options.fileOutput = options.fileOutput || config.get('csv.fileOutput');

            this.logger.info('users', options.data);
            const csv = json2csv({
                data: options.data,
                fields: options.fields
            });

            fs.writeFile(options.fileOutput, csv, err => {
                if (err) {
                    throw err;
                }
                this.logger.info('Saved the file: ', options.fileOutput);
                resolve();
            });
        });
    }
}
