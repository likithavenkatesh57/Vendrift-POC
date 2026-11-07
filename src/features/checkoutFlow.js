// Never touches Stripe directly — the deprecated call lives only in
// apiClient.js. A naive tool might get confused and try to "fix" this file
// too, since it does reference the thing that eventually calls Stripe.
const { ApiClient } = require('../billing/apiClient');

class CheckoutFlow {
  constructor() {
    this.apiClient = new ApiClient();
  }

  async completeCheckout(amountCents, token) {
    return this.apiClient.chargeCustomer(amountCents, token);
  }
}

module.exports = { CheckoutFlow };
