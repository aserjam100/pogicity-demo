import { PrePopulatedCity } from './types';
import { GridCell, TileType, GRID_WIDTH, GRID_HEIGHT } from '../game/types';
import { ROAD_SEGMENT_SIZE } from '../game/roadUtils';

// Helper: Create a grid filled with grass
function createEmptyGrid(): GridCell[][] {
  return Array.from({ length: GRID_HEIGHT }, (_, y) =>
    Array.from({ length: GRID_WIDTH }, (_, x) => ({
      type: TileType.Grass,
      x,
      y,
    }))
  );
}

// Helper: Place a road segment (4x4 block) at origin
function placeRoadSegment(grid: GridCell[][], segX: number, segY: number): void {
  for (let dy = 0; dy < ROAD_SEGMENT_SIZE; dy++) {
    for (let dx = 0; dx < ROAD_SEGMENT_SIZE; dx++) {
      const px = segX + dx;
      const py = segY + dy;
      if (px < GRID_WIDTH && py < GRID_HEIGHT) {
        grid[py][px].type = TileType.Road;
        grid[py][px].isOrigin = dx === 0 && dy === 0;
        if (dx !== 0 || dy !== 0) {
          grid[py][px].originX = segX;
          grid[py][px].originY = segY;
        }
      }
    }
  }
}

// Helper: Place an asphalt tile (1x1)
function placeAsphalt(grid: GridCell[][], x: number, y: number): void {
  if (x < GRID_WIDTH && y < GRID_HEIGHT) {
    grid[y][x].type = TileType.Asphalt;
    grid[y][x].isOrigin = true;
    grid[y][x].originX = x;
    grid[y][x].originY = y;
  }
}

// Create Starter Town: Simple grid pattern with vertical and horizontal roads
function createStarterTown(): PrePopulatedCity {
  const grid = createEmptyGrid();

  // Place vertical roads (going North-South)
  const verticalRoads = [12, 20, 28, 36];
  for (let y = 8; y <= 36; y += 4) {
    for (const x of verticalRoads) {
      placeRoadSegment(grid, x, y);
    }
  }

  // Place horizontal roads (going East-West)
  const horizontalRoads = [12, 20, 28];
  for (const y of horizontalRoads) {
    for (let x = 12; x <= 36; x += 4) {
      placeRoadSegment(grid, x, y);
    }
  }

  // Add asphalt roads for cars (diagonal and connecting paths)
  // Vertical asphalt paths alongside tile roads
  for (let y = 8; y <= 38; y++) {
    placeAsphalt(grid, 10, y); // Left of first vertical road
    placeAsphalt(grid, 11, y);
    placeAsphalt(grid, 18, y); // Between 1st and 2nd
    placeAsphalt(grid, 19, y);
    placeAsphalt(grid, 26, y); // Between 2nd and 3rd
    placeAsphalt(grid, 27, y);
    placeAsphalt(grid, 34, y); // Between 3rd and 4th
    placeAsphalt(grid, 35, y);
  }

  // Horizontal asphalt paths
  for (let x = 8; x <= 38; x++) {
    placeAsphalt(grid, x, 10); // Above first horizontal road
    placeAsphalt(grid, x, 11);
    placeAsphalt(grid, x, 18); // Between 1st and 2nd
    placeAsphalt(grid, x, 19);
    placeAsphalt(grid, x, 26); // Between 2nd and 3rd
    placeAsphalt(grid, x, 27);
  }

  return {
    id: 'starter-town',
    name: 'Starter Town',
    grid,
    startSection: { x: 1, y: 1 }, // Section 1,1 = grid cells 8-15 (includes roads at 12)
    description: 'A simple town with a grid of roads',
  };
}

export const EDUCATIONAL_CITIES: PrePopulatedCity[] = [
  createStarterTown(),
];
