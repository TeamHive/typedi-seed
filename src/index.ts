import 'reflect-metadata';
import { Container } from 'typedi/Container';
import { AppService } from './modules/app.service';

Container.get(AppService).run();
