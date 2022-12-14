import moment = require('moment');
import { createLogger, format, transports } from 'winston';

const plainLogFormat = format.printf((props) => {
  const time = moment().format('YYYY/MM/DD-hh:mm:ss').toString();
  return `${time} [${props.level}]: ${props.message}`;
});

export const logger = createLogger({
  format: format.combine(plainLogFormat),
  transports: [new transports.Console()],
});
