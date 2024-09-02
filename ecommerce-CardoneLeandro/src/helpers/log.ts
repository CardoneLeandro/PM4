import { appendFileSync } from 'fs';
import { join } from 'path';

const logFilePath = join(
  'C:/Users/Leandro/Desktop/PM4/ecommerce-CardoneLeandro/log.txt',
);

export function writeLog(message: string) {
  const formattedMessage = `${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })} - ${message}\n`;
  appendFileSync(logFilePath, formattedMessage, 'utf8');
  console.log(
    '==================  =================',
    `${logFilePath}, ${formattedMessage}`,
  );
}
