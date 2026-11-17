const { ApiClient } = require('./src/billing/apiClient');
const { SubscriptionService } = require('./src/billing/subscriptionService');
const { processPayment } = require('./src/billing/conditionalPaymentFlow');
const { chargeViaDestructure } = require('./src/billing/destructuredPayments');
const { chargeThroughProvider } = require('./src/billing/renamedProvider');

async function run() {
  console.log('=== apiClient.js (ApiClient.chargeCustomer) ===');
  try {
    const r = await new ApiClient().chargeCustomer(2000, 'tok_visa');
    console.log('SUCCESS —', r.id, r.status);
  } catch (e) { console.log('FAILED —', e.message); }

  console.log('\n=== subscriptionService.js (chargeSetupFee) ===');
  try {
    const r = await new SubscriptionService().chargeSetupFee('pm_card_visa', 1500);
    console.log('SUCCESS —', r.id, r.status);
  } catch (e) { console.log('FAILED —', e.message); }

  console.log('\n=== conditionalPaymentFlow.js (legacy branch) ===');
  try {
    const r = await processPayment(2000, 'pm_card_visa', true);
    console.log('SUCCESS —', r.id, r.status);
  } catch (e) { console.log('FAILED —', e.message); }

  console.log('\n=== destructuredPayments.js (still unmigrated charges.create) ===');
  try {
    const r = await chargeViaDestructure(2000, 'tok_visa');
    console.log('SUCCESS —', r.id, r.status);
  } catch (e) { console.log('FAILED —', e.message); }

  console.log('\n=== renamedProvider.js (still unmigrated charges.create) ===');
  try {
    const r = await chargeThroughProvider(2000, 'tok_visa');
    console.log('SUCCESS —', r.id, r.status);
  } catch (e) { console.log('FAILED —', e.message); }
}

run();
