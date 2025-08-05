import { createLogger, format, transports } from 'winston';
import config from '../config/config.js';

const logger = createLogger({
  level: config.logLevel,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/warn.log', level: 'warn' }),
    new transports.File({ filename: 'logs/debug.log', level: 'debug' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
