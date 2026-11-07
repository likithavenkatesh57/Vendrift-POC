// The word "stripe" never appears at the actual call site below — confirmed
// mechanically safe (charges.create works fine destructured, no 'this'
// binding issue). Tests whether detection relies on literal text matching
// something it can't see here.
const { charges } = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

async function chargeViaDestructure(amountCents, token) {
  return charges.create({
    amount: amountCents,
    currency: 'usd',
    source: token,
    description: 'Destructured charge',
  });
}

module.exports = { chargeViaDestructure };
