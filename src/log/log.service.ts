import { Inject, Injectable, Optional, Scope } from '@nestjs/common';

@Injectable()
export class LogService {
  public log(name: string, msg: string) {
    const pid = process.pid;
    const { date, time } = this.getDateFormated();

    console.log(
      `[Application] ${pid}  - ${date}, ${time}\t LOG [${name}] ${msg}`,
    );
  }

  public error(msg: string) {
    const pid = process.pid;
    const { date, time } = this.getDateFormated();

    console.error(`ERROR ${date} ${time} [${pid}] - ${msg}`);
  }

  public warning(msg: string) {
    const pid = process.pid;
    const { date, time } = this.getDateFormated();

    console.error(`WARN ${date} ${time} [${pid}] - ${msg}`);
  }

  public debug(msg: string) {
    const pid = process.pid;
    const { date, time } = this.getDateFormated();

    console.error(`DEBUG ${date} ${time} [${pid}] - ${msg}`);
  }

  private getDateFormated(): {
    date: string;
    time: string;
  } {
    const currentDate = new Date();
    const currentTime = new Date().toISOString();

    function pad(num: number): string {
      return num.toString().padStart(2, '0');
    }

    return {
      date: [
        pad(currentDate.getDate()),
        pad(currentDate.getMonth() + 1),
        currentDate.getFullYear(),
      ].join('/'),
      time: currentTime.slice(11, 19),
    };
  }
}
