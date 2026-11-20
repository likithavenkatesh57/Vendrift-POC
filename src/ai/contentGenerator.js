const OpenAI = require('openai').default;

class ContentGenerator {
  constructor(apiKey = process.env.OPENAI_API_KEY) {
    this.openai = new OpenAI({ apiKey });
  }

  // Deprecated: the old v3 completions call, reached through this.openai,
  // inside a class constructor this time, not a flat top-level instantiation.
  async generateBlogPost(topic) {
    const response = await this.openai.completions.create({
      model: 'text-davinci-003',
      prompt: `Write a short blog post about ${topic}`,
      max_tokens: 300,
    });
    return response.choices[0].text;
  }

  // Pure logic, no vendor call at all.
  buildPrompt(topic, tone) {
    return `Write a ${tone} blog post about ${topic}.`;
  }
}

module.exports = { ContentGenerator };
