
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

class SubscriptionService {
  constructor(stripeClient = stripe) {
    this.stripe = stripeClient;
  }

  // Deprecated: a one-time setup fee charged the old way, through this.stripe,
  // not a bare module-level call like our earlier tests.
  async chargeSetupFee(customerToken, amountCents) {
    return this.stripe.charges.create({
      amount: amountCents,
      currency: 'usd',
      source: customerToken,
      description: 'Subscription setup fee',
    });
  }

  async createSubscription(customerId, priceId) {
    return this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
    });
  }

  // Pure logic, no vendor call at all — this is what the real test checks.
  calculateProratedAmount(monthlyPriceCents, daysRemainingInMonth, daysInMonth) {
    if (daysInMonth <= 0) throw new Error('daysInMonth must be positive');
    return Math.round((monthlyPriceCents / daysInMonth) * daysRemainingInMonth);
  }
}

module.exports = { SubscriptionService };
