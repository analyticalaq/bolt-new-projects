import React, { useState } from 'react';
import { Loader2, Copy, Save, Share2, FileText, Plus } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function AIIntegration() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [tone, setTone] = useState('neutral');
  const [emotion, setEmotion] = useState('none');
  const [error, setError] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [engagementScore, setEngagementScore] = useState<number | null>(null);
  const [viralScore, setViralScore] = useState<number | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [contentHistory, setContentHistory] = useState<string[]>([]);

  const generateContent = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setResult('');
    setHashtags([]);
    setEngagementScore(null);
    setViralScore(null);

    const toneInstructions = tone !== 'neutral' ? ` Use a ${tone} tone.` : '';
    const emotionInstructions = emotion !== 'none' ? ` Add an emotion of ${emotion}.` : '';

    const contentPrompts = {
      blog: `Write a detailed and lengthy blog post about: ${prompt}. Include an introduction, well-structured main points, and a conclusion.${toneInstructions}${emotionInstructions}`,
      'social-media-post': `Create an engaging social media post about: ${prompt}. Make it concise and attention-grabbing.${toneInstructions}${emotionInstructions}`,
      'marketing-email': `Write a compelling marketing email about: ${prompt}. Include a strong subject line and call-to-action.${toneInstructions}${emotionInstructions}`,
      'product-description': `Write a persuasive product description for: ${prompt}. Highlight key features and benefits.${toneInstructions}${emotionInstructions}`,
      'ad-copy': `Create compelling ad copy for: ${prompt}. Make it persuasive and action-oriented.${toneInstructions}${emotionInstructions}`,
      'youtube-script': `Write a YouTube video script about: ${prompt}. Make it engaging and attention-grabbing.${toneInstructions}${emotionInstructions}`,
      'facebook-post': `Write a Facebook post about: ${prompt}. Keep it conversational and engaging.${toneInstructions}${emotionInstructions}`,
      'twitter-post': `Write a tweet about: ${prompt}. Make it concise and tweet-worthy.${toneInstructions}${emotionInstructions}`,
      'linkedin-post': `Write a LinkedIn post about: ${prompt}. Make it professional and insightful.${toneInstructions}${emotionInstructions}`
    };

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_HUGGING_FACE_TOKEN}`
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.2-1B-Instruct",
          messages: [{ role: "user", content: contentPrompts[contentType] }],
          max_tokens: 500,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.choices && data.choices[0] && data.choices[0].message.content) {
        setResult(data.choices[0].message.content.trim());
        generateHashtags(data.choices[0].message.content.trim());
        setEngagementScore(Math.random() * 100);
        setViralScore(Math.random() * 100);
        setContentHistory(prev => [data.choices[0].message.content.trim(), ...prev]);
      } else {
        throw new Error('Unable to parse the generated content. Please try again.');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateHashtags = (content: string) => {
    const words = content.split(' ').filter(word => word.length > 3);
    setHashtags(words.slice(0, 5).map(word => `#${word}`));
  };

  const saveAsPDF = () => {
    const doc = new jsPDF();
    doc.text(result, 10, 10);
    doc.save('generated_content.pdf');
  };

  const saveContent = () => {
    const element = document.createElement('a');
    const file = new Blob([result], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'generated_content.txt';
    document.body.appendChild(element);
    element.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result).then(() => {
      alert('Content copied to clipboard!');
    });
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`p-6 ${theme === 'light' ? 'bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-300' : 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600'} rounded-lg shadow-xl max-w-4xl mx-auto`}>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-center text-white">AI Content Generator</h1>
        <button className="text-white p-2" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '🌞 Light Mode'}
        </button>
      </div>

      <textarea
        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 mb-4"
        rows="6"
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <select
            className="w-40 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="blog">Blog</option>
            <option value="social-media-post">Social Media Post</option>
            <option value="marketing-email">Marketing Email</option>
            <option value="product-description">Product Description</option>
            <option value="ad-copy">Ad Copy</option>
            <option value="youtube-script">YouTube Script</option>
            <option value="facebook-post">Facebook Post</option>
            <option value="twitter-post">Twitter Post</option>
            <option value="linkedin-post">LinkedIn Post</option>
          </select>
          <select
            className="w-40 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="neutral">Neutral</option>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="persuasive">Persuasive</option>
          </select>
          <select
            className="w-40 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
          >
            <option value="none">None</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="excited">Excited</option>
          </select>
        </div>

        <button
          className="bg-indigo-600 text-white p-3 rounded-lg flex items-center space-x-2 shadow-lg"
          onClick={generateContent}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Generate Content'}
        </button>
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {result && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md border-2 border-gray-300">
          <h2 className="text-xl font-bold text-indigo-600">Generated Content</h2>
          <pre className="whitespace-pre-wrap break-words">{result}</pre>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {hashtags.length > 0 && (
          <div className="p-4 bg-white rounded-lg shadow-md border-2 border-gray-300">
            <h2 className="text-xl font-bold text-indigo-600">Suggested Hashtags</h2>
            <div className="mt-2 flex flex-wrap">
              {hashtags.map((hashtag, index) => (
                <span key={index} className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {hashtag}
                </span>
              ))}
            </div>
          </div>
        )}

        {engagementScore !== null && (
          <div className="p-4 bg-white rounded-lg shadow-md border-2 border-gray-300">
            <h2 className="text-xl font-bold text-indigo-600">Engagement Score</h2>
            <p className="mt-2 text-lg">Estimated Engagement: {engagementScore.toFixed(2)}/100</p>
          </div>
        )}

        {viralScore !== null && (
          <div className="p-4 bg-white rounded-lg shadow-md border-2 border-gray-300">
            <h2 className="text-xl font-bold text-indigo-600">Viral Potential</h2>
            <p className="mt-2 text-lg">Estimated Viral Potential: {viralScore.toFixed(2)}/100</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button className="bg-green-600 text-white p-2 rounded-lg flex items-center space-x-2 shadow-lg" onClick={saveContent}>
          <Save className="w-4 h-4" /> <span>Save</span>
        </button>
        <button className="bg-blue-600 text-white p-2 rounded-lg flex items-center space-x-2 shadow-lg" onClick={copyToClipboard}>
          <Copy className="w-4 h-4" /> <span>Copy</span>
        </button>
        <button className="bg-yellow-600 text-white p-2 rounded-lg flex items-center space-x-2 shadow-lg" onClick={saveAsPDF}>
          <FileText className="w-4 h-4" /> <span>Save as PDF</span>
        </button>
      </div>

      {contentHistory.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md border-2 border-gray-300">
          <h2 className="text-xl font-bold text-indigo-600">Content History</h2>
          <ul className="mt-2">
            {contentHistory.slice(0, 5).map((content, index) => (
              <li key={index} className="border-b py-2">{content}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
