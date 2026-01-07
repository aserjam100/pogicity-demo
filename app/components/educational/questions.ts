import { Question } from './types';

// Simple buildings for Pre-K (recognizable, small footprint)
export const EDUCATIONAL_BUILDINGS = [
  'tree-1',          // Tree (1x1) - very simple
  'brownstone',      // House (2x3)
  'fountain',        // Park fountain (2x2)
  'checkers',        // Store (2x2)
  'private-school',  // School (6x3)
];

// Building display names for questions
const BUILDING_DISPLAY_NAMES: Record<string, { name: string; icon: string }> = {
  'tree-1': { name: 'Tree', icon: '🌳' },
  'brownstone': { name: 'House', icon: '🏠' },
  'fountain': { name: 'Fountain', icon: '⛲' },
  'checkers': { name: 'Store', icon: '🏪' },
  'private-school': { name: 'School', icon: '🏫' },
};

// Generate realistic question sequence with variety
export function generateQuestionSequence(): Question[] {
  // Realistic city-building tasks for kids
  const tasks = [
    { buildingId: 'tree-1', count: 2 },         // Plant 2 trees
    { buildingId: 'brownstone', count: 3 },     // Build 3 houses
    { buildingId: 'fountain', count: 1 },       // Add 1 fountain (park)
    { buildingId: 'checkers', count: 2 },       // Build 2 stores
    { buildingId: 'private-school', count: 1 }, // Build 1 school
  ];

  return tasks.map(task => {
    const buildingInfo = BUILDING_DISPLAY_NAMES[task.buildingId] || {
      name: 'Building',
      icon: '🏢',
    };

    return {
      type: 'place_buildings',
      buildingId: task.buildingId,
      buildingName: buildingInfo.name,
      buildingIcon: buildingInfo.icon,
      count: 0,
      targetCount: task.count,
    };
  });
}

// Get next section to reveal (spiral outward from starting section)
export function getNextSectionToReveal(
  revealed: Set<string>,
  startX: number,
  startY: number
): { x: number; y: number } | null {
  // BFS spiral search from start
  const queue: Array<{ x: number; y: number; dist: number }> = [
    { x: startX, y: startY, dist: 0 }
  ];
  const visited = new Set<string>(revealed);

  while (queue.length > 0) {
    const current = queue.shift()!;
    const key = `${current.x},${current.y}`;

    // Found unrevealed section
    if (!revealed.has(key) &&
        current.x >= 0 && current.x < 6 &&
        current.y >= 0 && current.y < 6) {
      return { x: current.x, y: current.y };
    }

    visited.add(key);

    // Explore neighbors (spiral effect via BFS)
    const neighbors = [
      { x: current.x - 1, y: current.y },
      { x: current.x + 1, y: current.y },
      { x: current.x, y: current.y - 1 },
      { x: current.x, y: current.y + 1 },
    ];

    for (const n of neighbors) {
      const nKey = `${n.x},${n.y}`;
      if (!visited.has(nKey)) {
        queue.push({ ...n, dist: current.dist + 1 });
      }
    }
  }

  return null; // All revealed
}
