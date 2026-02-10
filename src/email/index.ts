// Email client
export { sendEmail, getUserEmailInfo } from '@/lib/email';

// Templates
export { Welcome } from './templates/Welcome';
export { UpgradeConfirmation } from './templates/UpgradeConfirmation';
export { PaymentFailed } from './templates/PaymentFailed';
export { TokenBalanceLow } from './templates/TokenBalanceLow';
export { CancellationConfirmation } from './templates/CancellationConfirmation';
export { AccountPaused } from './templates/AccountPaused';
export { ProAccessWarning } from './templates/ProAccessWarning';

// Layout (for custom templates)
export { EmailLayout } from './components/Layout';
