import React, { useState, useEffect } from 'react';
import { Challenge, AIResponse } from '../types.ts';
import { checkStudentResponse } from '../services/geminiService.ts';

interface AssistantProps {
  challenge: Challenge;
  onNext: () => void;
}

export const Assistant: React.FC<AssistantProps> = ({ challenge, onNext }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);

  // Reset state when challenge changes
  useEffect(() => {
    setInput('');
    setResponse(null);
  }, [challenge]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const result = await checkStudentResponse(input, challenge.prompt, challenge.type);
    setResponse(result);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header / Prompt Area */}
      <div className="bg-orange-50 p-6 border-b border-orange-100">
        <h2 className="text-sm font-bold text-orange-600 uppercase tracking-wider mb-2">
          Challenge {challenge.id}
        </h2>
        <p className="text-xl text-gray-800 font-medium">
          {challenge.prompt}
        </p>
      </div>

      {/* Result Area */}
      <div className="flex-1 p-6 overflow-y-auto min-h-[160px]">
        {!response && !isLoading && (
          <div className="text-gray-400 italic text-center mt-8">
            Write your answer in Spanish below.
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center h-full space-x-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )}

        {response && (
          <div className={`rounded-lg p-4 ${response.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-start mb-2">
              <span className={`text-2xl mr-3 ${response.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                {response.isCorrect ? '¡Muy bien! 🎉' : 'Almost... 🤔'}
              </span>
            </div>
            <p className="text-gray-700 mb-3">{response.feedback}</p>
            
            {response.correction && (
              <div className="bg-white/50 p-3 rounded text-sm text-gray-600">
                <span className="font-bold">Suggestion:</span> {response.correction}
              </div>
            )}
            
            {response.isCorrect && (
               <button 
               onClick={onNext}
               className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-sm flex items-center justify-center"
             >
               Next Challenge →
             </button>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type here..."
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all shadow-sm"
            disabled={isLoading || (response?.isCorrect === true)}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || (response?.isCorrect === true)}
            className="absolute right-2 top-2 bottom-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors aspect-square flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
