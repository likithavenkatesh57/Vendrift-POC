const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function signUpCustomer(email, cardToken) {
  return stripe.customers.create({ email, payment_method: cardToken });
}

module.exports = { signUpCustomer };
