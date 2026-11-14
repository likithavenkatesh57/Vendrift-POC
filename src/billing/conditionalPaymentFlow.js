
// Deliberately mixes the deprecated and current pattern in the same function.
// A correct fix touches only the legacy branch, leaves the already-correct
// branch alone, and doesn't flag or rewrite the whole function wholesale.
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

async function processPayment(amountCents, token, useLegacyFlow) {
  if (useLegacyFlow) {
    return stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'usd',
      payment_method: token,
      confirm: true,
      automatic_payment_methods: { enabled: true },
    });
  }

  return stripe.paymentIntents.create({
    amount: amountCents,
    currency: 'usd',
    payment_method: token,
    confirm: true,
    automatic_payment_methods: { enabled: true },
  });
}

module.exports = { processPayment };
