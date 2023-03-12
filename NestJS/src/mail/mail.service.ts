import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../module/users/user.interface';
import { Configuration } from '../config/config.keys';
import { ConfigService } from '../config/config.service';

@Injectable()
export class MailService {
    constructor(
      private mailerService: MailerService,
      private readonly _configService: ConfigService,
      ) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `${this._configService.get(Configuration.URL_CONFIRMATION)}/api/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: '../confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }
}
