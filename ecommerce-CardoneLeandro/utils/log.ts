import { appendFileSync } from 'fs';
import { join } from 'path';

const logFilePath = join(__dirname, '../log.txt');

export function writeLog(message: string) {
  const formattedMessage = `${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })} - ${message}\n`;
  appendFileSync(logFilePath, formattedMessage, 'utf8');
}