const test = require('node:test');
const assert = require('node:assert');
const { SubscriptionService } = require('../src/billing/subscriptionService');

test('calculateProratedAmount splits the monthly price correctly', () => {
  const service = new SubscriptionService({});
  const result = service.calculateProratedAmount(3000, 15, 30);
  assert.strictEqual(result, 1500);
});

test('calculateProratedAmount throws for an invalid month length', () => {
  const service = new SubscriptionService({});
  assert.throws(() => service.calculateProratedAmount(3000, 15, 0));
});

test('calculateProratedAmount handles a full month with no proration', () => {
  const service = new SubscriptionService({});
  const result = service.calculateProratedAmount(2900, 31, 31);
  assert.strictEqual(result, 2900);
});

