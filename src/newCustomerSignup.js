const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Deliberately uses the old card "source" parameter
async function signUpCustomer(email, cardToken) {
  return stripe.customers.create({ email, source: cardToken });
}

module.exports = { signUpCustomer };
