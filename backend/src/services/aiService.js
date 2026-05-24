const { OpenAI } = require('openai');

class AIService {
     

    /**
     * Generates a lesson using OpenAI API with a local mock fallback
     * @param {string} categoryName 
     * @param {string} subCategoryName 
     * @param {string} userPrompt 
     * @returns {Promise<string>} Generated lesson content
     */
    async generateLesson(categoryName, subCategoryName, userPrompt) {
        
         
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'mock_key') {
            try {
                 
                const openai = new OpenAI({
                    apiKey: process.env.OPENAI_API_KEY,
                });

                const systemInstructions = 
                    `You are an expert AI tutor inside an educational platform. ` +
                    `Generate a well-structured lesson based on the provided category and sub-category. ` +
                    `Format the output cleanly using Markdown.`;

                const userContent = 
                    `Category: ${categoryName}\n` +
                    `Sub-Category: ${subCategoryName}\n` +
                    `User Question/Prompt: "${userPrompt}"\n\n` +
                    `Please provide a detailed, easy-to-understand lesson responding to this prompt.`;

                const response = await openai.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: systemInstructions },
                        { role: 'user', content: userContent }
                    ],
                    max_tokens: 800,
                    temperature: 0.7
                });

                return response.choices[0].message.content.trim();

            } catch (apiError) {
                console.warn('OpenAI API failed, falling back to local Mock. Error:', apiError.message);
                 
            }
        }

         
        await new Promise(resolve => setTimeout(resolve, 1000));
        const lowerCategory = categoryName.toLowerCase();
        const lowerSub = subCategoryName.toLowerCase();

        if (lowerCategory === 'science' && lowerSub === 'space') {
            return `### Lesson: Welcome to Space Exploration! (Mock Fallback)\n\n` +
                   `You asked about: "${userPrompt}"\n\n` +
                   `1. **Core Concept**: Space phenomena operate under physics rules outside Earth's atmosphere.\n` +
                   `2. **Deep Dive**: Matter collapses under extreme gravity to form dense celestial structures like black holes.\n` +
                   `3. **Summary**: The cosmos expands constantly, containing trillions of mysteries.`;
        }

        return `### Comprehensive Lesson: Learning ${categoryName} -> ${subCategoryName} (Mock Fallback)\n\n` +
               `In response to your prompt: "${userPrompt}"\n\n` +
               `* **Introduction**: Understanding the fundamental building blocks of ${subCategoryName}.\n` +
               `* **Practical Example**: Applying ${categoryName} theories to solve real-world scenarios.`;
    }
}

module.exports = new AIService();