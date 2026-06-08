import { config } from 'dotenv';

config();

const { TEST_LOCAL, UIKIT_SNACK_URL, BRANCH_NAME, TEST_ON_BRANCH, PW_CI_WORKERS, CI } = process.env;

export const IS_CI = Boolean(CI);

export const IS_LOCAL = TEST_LOCAL === 'true' || !IS_CI;

export const UIKIT_URL = TEST_LOCAL === 'true' || !UIKIT_SNACK_URL ? 'https://localhost:6006/' : UIKIT_SNACK_URL;

export const PLAYWRIGHT_ROOT_DIR = `${process.cwd()}/playwright`;

export const CURRENT_BRANCH_NAME = BRANCH_NAME;

export const IS_TESTED_ON_BRANCH = TEST_ON_BRANCH;

export const CI_WORKERS = PW_CI_WORKERS;

export const TEST_ID_ATTRIBUTE = 'data-test-id';

export const DEPLOY_NAMESPACE = 'ui-uikit-snack';

/** Browser timezone for Playwright projects and date/time e2e tests. */
export const TEST_TIMEZONE = 'Europe/Moscow';

/** getTimezoneOffset()-compatible offset for {@link TEST_TIMEZONE} (UTC+3, no DST). */
export const TEST_TIMEZONE_OFFSET_MS = -180 * 60 * 1000;

/** Formats a date the same way as Playwright browser tests ({@link TEST_TIMEZONE}). */
export function formatDateInTestTimezone(date: Date, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('ru-RU', { ...options, timeZone: TEST_TIMEZONE }).format(date);
}
