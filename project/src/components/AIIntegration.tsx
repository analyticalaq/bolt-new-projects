import React, { useState } from 'react';
import { Bot, Loader2 } from 'lucide-react';

export default function AIIntegration() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [tone, setTone] = useState('neutral');
  const [error, setError] = useState('');

  const generateContent = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setResult('');

    const toneInstructions = tone !== 'neutral' ?  Use a ${tone} tone. : '';
    const contentPrompts = {
      blog: Write a detailed and lengthy blog post about: ${prompt}. Include an introduction, well-structured main points, and a conclusion.${toneInstructions},
      'social-media-post': Create an engaging social media post about: ${prompt}. Make it concise and attention-grabbing.${toneInstructions},
      'marketing-email': Write a compelling marketing email about: ${prompt}. Include a strong subject line and call-to-action.${toneInstructions},
      'product-description': Write a persuasive product description for: ${prompt}. Highlight key features and benefits.${toneInstructions},
      'ad-copy': Create compelling ad copy for: ${prompt}. Make it persuasive and action-oriented.${toneInstructions}
    };

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Bearer ${import.meta.env.VITE_HUGGING_FACE_TOKEN}
        },
        body: JSON.stringify({
          inputs: contentPrompts[contentType],
          parameters: {
            max_length: 1024,  // Increased for longer responses
            temperature: 0.7,
            top_p: 0.9,
            do_sample: true,
            return_full_text: false
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || API Error: ${response.status});
      }

      const data = await response.json();

      if (Array.isArray(data) && data[0] && typeof data[0].generated_text === 'string') {
        setResult(data[0].generated_text.trim());
      } else if (typeof data.generated_text === 'string') {
        setResult(data.generated_text.trim());
      } else if (typeof data[0] === 'string') {
        setResult(data[0].trim());
      } else {
        throw new Error('Unable to parse the generated content. Please try again.');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to generate content. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">AI Content Generator</h1>
      <textarea
        className="w-full p-2 border rounded mt-2"
        rows="4"
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <div className="flex items-center mt-2">
        <select
          className="border rounded p-2 mr-2"
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
        >
          <option value="blog">Blog</option>
          <option value="social-media-post">Social Media Post</option>
          <option value="marketing-email">Marketing Email</option>
          <option value="product-description">Product Description</option>
          <option value="ad-copy">Ad Copy</option>
        </select>
        <select
          className="border rounded p-2"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="neutral">Neutral</option>
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
          <option value="persuasive">Persuasive</option>
        </select>
      </div>
      <button
        className="bg-blue-500 text-white rounded p-2 mt-2"
        onClick={generateContent}
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin" /> : 'Generate Content'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {result && <pre className="mt-4 p-2 bg-gray-100 rounded">{result}</pre>}
    </div>
  );
}