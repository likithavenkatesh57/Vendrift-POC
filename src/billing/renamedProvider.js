// Same deprecated call as everywhere else, but the variable is named for what
// it does, not what it is. Nothing at the call site itself says "stripe".
const Stripe = require('stripe');
const paymentProvider = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

async function chargeThroughProvider(amountCents, token) {
  return paymentProvider.charges.create({
    amount: amountCents,
    currency: 'usd',
    source: token,
    description: 'Charge via renamed provider variable',
  });
}

module.exports = { chargeThroughProvider };
