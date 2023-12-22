import { Injectable, LogLevel } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LogService {
  public log(name: string, request: Request, msg: string) {
    const logMsg = this.constructLogMsg(name, request, msg, 'log');

    console.log(logMsg);
  }

  public error(name: string, request: Request, msg: string) {
    const logMsg = this.constructLogMsg(name, request, msg, 'error');

    console.log(logMsg);
  }

  public warning(name: string, request: Request, msg: string) {
    const logMsg = this.constructLogMsg(name, request, msg, 'warn');

    console.log(logMsg);
  }

  public debug(name: string, request: Request, msg: string) {
    const logMsg = this.constructLogMsg(name, request, msg, 'debug');

    console.log(logMsg);
  }

  private constructLogMsg(
    name: string,
    request: Request,
    msg: string,
    logLevel: LogLevel,
  ): string {
    let logMsg = '[Application]';
    const { date, time } = this.getDateFormated();

    if (request) {
      const methodRequest = request.method;
      logMsg += ` [ ${methodRequest} ]`;
    }
    logMsg += ` - ${date}, ${time}\t ${logLevel.toUpperCase()} [${name}] ${msg}`;

    return logMsg;
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
