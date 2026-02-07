import { Location, PlaceType, Challenge } from './types.ts';

// Map Layout:
// 3 Columns of blocks, 2 Rows of blocks.
// Streets:
// - Horizontal: Calle Mayor (Middle)
// - Vertical 1: Avda. Libertad (Left side)
// - Vertical 2: Avda. de la Paz (Right side)

export const MAP_LOCATIONS: Location[] = [
  // Top Row (North)
  // NW Block
  { id: 'hotel', name: 'El Hotel', type: PlaceType.HOTEL, gridArea: 'nw', icon: '🏨', color: 'bg-indigo-100 border-indigo-400' },
  { id: 'bank', name: 'Banco / Cajero', type: PlaceType.BANK, gridArea: 'nw-2', icon: '🏧', color: 'bg-gray-100 border-gray-400' },
  
  // N Middle Block
  { id: 'park', name: 'El Parque', type: PlaceType.PARK, gridArea: 'n-mid', icon: '🌳', color: 'bg-green-100 border-green-400' },
  
  // NE Block
  { id: 'metro', name: 'Estación de Metro', type: PlaceType.METRO, gridArea: 'ne', icon: '🚇', color: 'bg-red-50 border-red-400' },
  { id: 'museum', name: 'El Museo', type: PlaceType.MUSEUM, gridArea: 'ne-2', icon: '🏛️', color: 'bg-purple-100 border-purple-400' },

  // Bottom Row (South)
  // SW Block
  { id: 'pharmacy', name: 'La Farmacia', type: PlaceType.PHARMACY, gridArea: 'sw', icon: '💊', color: 'bg-teal-100 border-teal-400' },
  { id: 'supermarket', name: 'Supermercado', type: PlaceType.SUPERMARKET, gridArea: 'sw-2', icon: '🛒', color: 'bg-blue-100 border-blue-400' },
  
  // S Middle Block
  { id: 'plaza', name: 'La Plaza', type: PlaceType.SQUARE, gridArea: 's-mid', icon: '⛲', color: 'bg-yellow-50 border-yellow-300' },
  { id: 'bus', name: 'Parada Autobús', type: PlaceType.BUS_STOP, gridArea: 's-mid-2', icon: '🚏', color: 'bg-yellow-100 border-yellow-400' },

  // SE Block
  { id: 'cinema', name: 'El Cine', type: PlaceType.CINEMA, gridArea: 'se', icon: '🎬', color: 'bg-red-100 border-red-400' },
  { id: 'restaurant', name: 'El Restaurante', type: PlaceType.RESTAURANT, gridArea: 'se-2', icon: '🍝', color: 'bg-orange-100 border-orange-400' },
];

export const CHALLENGES: Challenge[] = [
  { 
    id: 1, 
    type: 'existence', 
    prompt: 'Ask if there is an ATM (cajero) nearby.', 
    targetId: 'bank' 
  },
  { 
    id: 2, 
    type: 'location', 
    prompt: 'Ask where the nearest Metro station is.', 
    targetId: 'metro' 
  },
  { 
    id: 3, 
    type: 'directions', 
    prompt: 'You are at the Hotel. Explain how to go to the Supermarket.',
    startId: 'hotel',
    endId: 'supermarket'
  },
  { 
    id: 4, 
    type: 'existence', 
    prompt: 'Ask if there is a Gym in this neighborhood.',
    targetId: 'gym' // Doesn't exist
  },
  {
    id: 5,
    type: 'directions',
    prompt: 'How do you get from the Bus Stop to the Museum?',
    startId: 'bus',
    endId: 'museum'
  },
  { 
    id: 6, 
    type: 'location', 
    prompt: 'Where is the Cinema? (Use: "en la esquina", "cerca de...")',
    targetId: 'cinema'
  }
];

// Text description for AI context
export const MAP_CONTEXT_DESCRIPTION = `
This is a large city map layout with 3 vertical zones and 2 horizontal zones.

STREETS:
- "Calle Mayor" runs horizontally across the middle, separating the North blocks from South blocks.
- "Avenida Libertad" runs vertically between the Left (West) blocks and the Middle blocks.
- "Avenida de la Paz" runs vertically between the Middle blocks and the Right (East) blocks.

PLACES:
- Top Left (North-West): Hotel (corner) and Bank/ATM (next to Hotel).
- Top Middle (North): A large Park.
- Top Right (North-East): Metro Station (corner) and Museum.
- Bottom Left (South-West): Pharmacy (corner) and Supermarket (South of Pharmacy).
- Bottom Middle (South): La Plaza (Square) and a Bus Stop (South of Plaza).
- Bottom Right (South-East): Cinema (corner) and Restaurant.

SPATIAL RELATIONS:
- The Bank has an ATM (Cajero).
- The Metro Station is in the North-East corner.
- The Bus Stop is in the South-Central area, near the Plaza.
- To go from Hotel (NW) to Supermarket (SW): You cross Calle Mayor.
- To go from Bus Stop to Museum: You go North (cross Calle Mayor) and then Right (East).
`;
