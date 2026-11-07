const { Configuration, OpenAIApi } = require('openai');

class ContentGenerator {
  constructor(apiKey = process.env.OPENAI_API_KEY) {
    const configuration = new Configuration({ apiKey });
    this.openai = new OpenAIApi(configuration);
  }

  // Deprecated: the old v3 completions call, reached through this.openai,
  // inside a class constructor this time, not a flat top-level instantiation.
  async generateBlogPost(topic) {
    const response = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Write a short blog post about ${topic}`,
      max_tokens: 300,
    });
    return response.data.choices[0].text;
  }

  // Pure logic, no vendor call at all.
  buildPrompt(topic, tone) {
    return `Write a ${tone} blog post about ${topic}.`;
  }
}

module.exports = { ContentGenerator };
