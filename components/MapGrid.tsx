import React from 'react';
import { MAP_LOCATIONS } from '../constants';

export const MapGrid: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto aspect-[4/3] bg-[#e8e8e8] p-4 rounded-xl shadow-lg border-4 border-gray-400 relative overflow-hidden">
      
      {/* 
        Grid Layout: 3 Blocks wide, 2 Blocks tall.
        Cols: Block(2fr) Street(1fr) Block(2fr) Street(1fr) Block(2fr) -> 8 units roughly
        Rows: Block(2fr) Street(1fr) Block(2fr) -> 5 units roughly
      */}
      <div className="grid grid-cols-8 grid-rows-5 h-full w-full gap-0 bg-gray-300">
        
        {/* --- ROW 1: North Blocks (Rows 1-2) --- */}

        {/* NW Block */}
        <div className="col-span-2 row-span-2 bg-white m-1 rounded-lg border-b-4 border-gray-200 p-1 flex flex-col gap-1 relative">
            <div className="absolute top-0 left-1 text-[8px] text-gray-400 font-bold">Barrio Norte</div>
            {renderLocation('hotel')}
            {renderLocation('bank')}
        </div>

        {/* Street Vertical 1 (Avda Libertad) */}
        <div className="col-span-1 row-span-2 flex justify-center items-center relative">
           <div className="h-full w-0 border-l-2 border-dashed border-white opacity-50"></div>
           <span className="absolute text-[8px] font-bold text-gray-500 -rotate-90 whitespace-nowrap">Avda. Libertad</span>
        </div>

        {/* N Mid Block (Park) */}
        <div className="col-span-2 row-span-2 bg-green-50 m-1 rounded-lg border-b-4 border-green-200 p-1 relative">
            {renderLocation('park')}
        </div>

        {/* Street Vertical 2 (Avda Paz) */}
        <div className="col-span-1 row-span-2 flex justify-center items-center relative">
           <div className="h-full w-0 border-l-2 border-dashed border-white opacity-50"></div>
           <span className="absolute text-[8px] font-bold text-gray-500 -rotate-90 whitespace-nowrap">Avda. de la Paz</span>
        </div>

        {/* NE Block */}
        <div className="col-span-2 row-span-2 bg-white m-1 rounded-lg border-b-4 border-gray-200 p-1 flex flex-col gap-1">
            {renderLocation('metro')}
            {renderLocation('museum')}
        </div>


        {/* --- ROW 2: Horizontal Street (Calle Mayor) (Row 3) --- */}
        <div className="col-span-8 row-span-1 flex items-center justify-center relative bg-[#dcdcdc]">
            <div className="w-full h-0 border-t-2 border-dashed border-white opacity-50 absolute"></div>
            <span className="absolute left-4 text-[10px] font-bold text-gray-500 bg-[#dcdcdc] px-1">Calle Mayor</span>
        </div>


        {/* --- ROW 3: South Blocks (Rows 4-5) --- */}

        {/* SW Block */}
        <div className="col-span-2 row-span-2 bg-white m-1 rounded-lg border-b-4 border-gray-200 p-1 flex flex-col gap-1">
             {renderLocation('pharmacy')}
             {renderLocation('supermarket')}
        </div>

        {/* Street Vertical 1 Bottom */}
        <div className="col-span-1 row-span-2 flex justify-center items-center relative">
           <div className="h-full w-0 border-l-2 border-dashed border-white opacity-50"></div>
        </div>

        {/* S Mid Block */}
        <div className="col-span-2 row-span-2 bg-white m-1 rounded-lg border-b-4 border-gray-200 p-1 flex flex-col gap-1">
             {renderLocation('plaza')}
             {renderLocation('bus')}
        </div>

        {/* Street Vertical 2 Bottom */}
        <div className="col-span-1 row-span-2 flex justify-center items-center relative">
           <div className="h-full w-0 border-l-2 border-dashed border-white opacity-50"></div>
        </div>

        {/* SE Block */}
        <div className="col-span-2 row-span-2 bg-white m-1 rounded-lg border-b-4 border-gray-200 p-1 flex flex-col gap-1">
             {renderLocation('cinema')}
             {renderLocation('restaurant')}
        </div>

      </div>
    </div>
  );
};

// Helper to find and render a location block
const renderLocation = (id: string) => {
  const loc = MAP_LOCATIONS.find(l => l.id === id);
  if (!loc) return null;

  const isPark = id === 'park';
  
  let className = `${loc.color} rounded flex flex-col items-center justify-center text-center shadow-sm transition-transform hover:scale-105 z-10 cursor-pointer `;
  
  if (isPark) className += "w-full h-full";
  else className += "flex-1 w-full"; // Distribute evenly in flex container

  return (
    <div 
      key={loc.id}
      className={className}
      title={loc.name}
    >
      <span className="text-xl sm:text-2xl">{loc.icon}</span>
      <span className="text-[9px] font-bold leading-tight text-gray-700 bg-white/70 px-1 rounded mt-0.5">
        {loc.name}
      </span>
    </div>
  );
};