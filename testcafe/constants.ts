import { config } from 'dotenv';

config();

const { TEST_LOCAL, UIKIT_SNACK_URL } = process.env;

export const UIKIT_URL = TEST_LOCAL === 'true' ? 'http://localhost:6006/' : UIKIT_SNACK_URL || '';

export const DEPLOY_NAMESPACE = 'ui-uikit-snack';
