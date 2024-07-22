import colors from 'colors/safe';

const themes = {
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
} as const;

colors.setTheme(themes);

const log = (message: string, theme: keyof typeof themes = 'warn'): void => {
  console.log(colors[themes[theme]](`${message}\n`));
};

export const logError = (message: string) => log(message, 'error');
export const logInfo = (message: string) => log(message, 'info');
export const logHelp = (message: string) => log(message, 'help');
export const logSilly = (message: string) => log(message, 'silly');
export const logDebug = (message: string) => log(message, 'debug');
