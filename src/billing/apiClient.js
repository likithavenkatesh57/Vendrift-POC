// The only file in this project that actually calls Stripe. Everything else
// that needs to charge a customer goes through this instead.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

class ApiClient {
  async chargeCustomer(amountCents, token) {
    return stripe.charges.create({
      amount: amountCents,
      currency: 'usd',
      source: token,
      description: 'Charge via shared ApiClient wrapper',
    });
  }
}

module.exports = { ApiClient };
