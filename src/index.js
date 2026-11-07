const { CustomerService } = require('./services/customerService');

async function main() {
  const customerService = new CustomerService();
  console.log('App started. CustomerService ready.');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

module.exports = { main };
