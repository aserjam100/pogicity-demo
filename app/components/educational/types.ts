import { GridCell } from '../game/types';

export interface EducationalState {
  mode: 'educational' | 'sandbox';
  currentQuestion: Question | null;
  sectionsRevealed: Set<string>; // "x,y" keys for section origins
  buildingInventory: BuildingInventoryItem[];
  questionsCompleted: number;
  currentCityId: string;
  startingSectionX: number;
  startingSectionY: number;
}

export interface Question {
  type: 'place_buildings';
  buildingId: string;
  buildingName: string;
  buildingIcon: string;
  count: number; // Current placed
  targetCount: number; // Goal (1-5)
}

export interface BuildingInventoryItem {
  buildingId: string;
  available: number;
}

export interface PrePopulatedCity {
  id: string;
  name: string;
  grid: GridCell[][];
  startSection: { x: number; y: number };
  description: string;
}

export const SECTION_SIZE = 8;
export const SECTIONS_WIDE = 6; // 48 / 8
export const SECTIONS_TALL = 6;
