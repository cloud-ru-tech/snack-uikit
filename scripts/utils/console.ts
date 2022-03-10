import colors from 'colors/safe';

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
});

const log = (message: string, theme = 'yellow'): void => {
  console.log(colors[theme](`${message}\n`));
};

export const logError = (message: string) => log(message, 'error');
export const logInfo = (message: string) => log(message, 'info');
export const logHelp = (message: string) => log(message, 'help');
export const logSilly = (message: string) => log(message, 'silly');
export const logDebug = (message: string) => log(message, 'debug');
