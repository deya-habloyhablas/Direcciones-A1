export enum PlaceType {
  PARK = 'parque',
  SCHOOL = 'escuela',
  CINEMA = 'cine',
  BANK = 'banco',
  RESTAURANT = 'restaurante',
  HOSPITAL = 'hospital',
  MUSEUM = 'museo',
  SUPERMARKET = 'supermercado',
  PHARMACY = 'farmacia',
  HOTEL = 'hotel',
  GYM = 'gimnasio',
  SQUARE = 'plaza',
  STREET = 'calle',
  INTERSECTION = 'cruce',
  METRO = 'metro',
  BUS_STOP = 'parada de autobús',
  ATM = 'cajero'
}

export interface Location {
  id: string;
  name: string;
  type: PlaceType;
  // We use grid areas now instead of just row/col integers for the new map layout
  gridArea: string; 
  icon: string;
  color: string;
}

export interface Challenge {
  id: number;
  type: 'existence' | 'location' | 'directions';
  prompt: string; // Instructions in English
  targetId?: string; 
  startId?: string; 
  endId?: string;   
}

export interface AIResponse {
  isCorrect: boolean;
  feedback: string;
  correction?: string;
}