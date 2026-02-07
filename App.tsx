import React, { useState } from 'react';
import { MapGrid } from './components/MapGrid.tsx';
import { Assistant } from './components/Assistant.tsx';
import { CHALLENGES } from './constants.ts';

const App: React.FC = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  const handleNext = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      alert("Congratulations! You have completed all exercises.");
      setCurrentChallengeIndex(0); // Loop back
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-gray-800 pb-10">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🏘️</span>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Mi Barrio</h1>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Learn Spanish</p>
            </div>
          </div>
          
          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold">
            Level: A1/A2
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Intro Text */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Explore the City</h2>
          <p className="text-gray-600">
            Look at the map and answer the virtual teacher's questions. 
            <br/>
            <span className="font-bold text-orange-600">Tip:</span> Use present tense ("cruzas") or "tienes que" + infinitive. Do not use commands!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Map (Takes more space now) */}
          <div className="order-2 lg:order-1 lg:col-span-7 sticky top-24">
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 mb-4">
              <div className="bg-gray-50 py-2 px-4 rounded-t-xl border-b border-gray-100 mb-2 flex justify-between items-center">
                 <span className="text-xs font-bold text-gray-400 uppercase">City Map</span>
                 <span className="text-xs text-gray-400">North ↑</span>
              </div>
              <MapGrid />
              <div className="mt-4 px-4 pb-2">
                <h3 className="text-sm font-bold text-gray-700 mb-2">Useful Vocabulary:</h3>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">Giras a la derecha 👉</span>
                  <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">Sigues todo recto ⬆️</span>
                  <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">Cruzas la calle 🦓</span>
                  <span className="bg-orange-50 px-2 py-1 rounded border border-orange-200 font-medium">Tienes que girar...</span>
                  <span className="bg-orange-50 px-2 py-1 rounded border border-orange-200 font-medium">Tienes que ir...</span>
                  <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">Está cerca / lejos 📍</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction */}
          <div className="order-1 lg:order-2 lg:col-span-5 h-full">
            <Assistant 
              challenge={currentChallenge} 
              onNext={handleNext}
            />
            
            {/* Progress Indicators */}
            <div className="mt-6 flex justify-center gap-2">
              {CHALLENGES.map((c, idx) => (
                <div 
                  key={c.id}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentChallengeIndex ? 'w-8 bg-orange-500' : 
                    idx < currentChallengeIndex ? 'w-2 bg-green-500' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
