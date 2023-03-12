import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { Configuration } from '../config/config.keys';



@Module({
  imports: [
    MailerModule.forRootAsync({
    imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
         //transport: config.get(Configuration.MAIL_TRANSPORT),
        // or
        transport: {
          host: `${config.get(Configuration.MAIL_HOST)}`,
          secure: false,
          auth: {
            user: `${config.get(Configuration.MAIL_USER)}`,
            pass: config.get(Configuration.MAIL_PASSWORD),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get(Configuration.MAIL_FROM)}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService, ConfigService],
  exports: [MailService],
})
export class MailModule {}


