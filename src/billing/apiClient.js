// The only file in this project that actually calls Stripe. Everything else
// that needs to charge a customer goes through this instead.

const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

class ApiClient {
  async chargeCustomer(amountCents, token) {
    return stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'usd',
      payment_method_data: /** @type {any} */ ({
        type: 'card',
        card: { token },
      }),
      confirm: true,
      description: 'Charge via shared ApiClient wrapper',
    });
  }
}

module.exports = { ApiClient };
