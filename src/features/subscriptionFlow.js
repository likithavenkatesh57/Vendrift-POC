// Same situation as checkoutFlow.js — a second, independent consumer of the
// shared wrapper, from a completely different feature area. If the fix lands
// here instead of apiClient.js, that's a real, meaningful mistake.
const { ApiClient } = require('../billing/apiClient');

class SubscriptionRenewal {
  constructor() {
    this.apiClient = new ApiClient();
  }

  async renew(amountCents, token) {
    return this.apiClient.chargeCustomer(amountCents, token);
  }
}

module.exports = { SubscriptionRenewal };
