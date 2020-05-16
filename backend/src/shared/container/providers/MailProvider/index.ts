import { container } from 'tsyringe';

import EtherealMailProvider from './implementaions/EtherealMailProvider';
import SESMailProvider from './implementaions/SESMailProvider';
import IMailProvider from './models/IMailProvider';

import MailConfig from '@config/mail';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[MailConfig.driver],
);
