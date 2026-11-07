
// Deliberately mixes the deprecated and current pattern in the same function.
// A correct fix touches only the legacy branch, leaves the already-correct
// branch alone, and doesn't flag or rewrite the whole function wholesale.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

async function processPayment(amountCents, token, useLegacyFlow) {
  if (useLegacyFlow) {
    return stripe.charges.create({
      amount: amountCents,
      currency: 'usd',
      source: token,
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
