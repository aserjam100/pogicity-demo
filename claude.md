# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Notifications

Play a system ping sound (`afplay /System/Library/Sounds/Ping.aiff`) when:
- Finishing a long-running task
- Needing user input or asking a question
- Encountering an error that blocks progress

## Tech Stack

- **Framework:** Next.js 16 with React 19, TypeScript 5, App Router
- **Game Engine:** Phaser 3.90 (loaded dynamically, no SSR)
- **Styling:** Tailwind CSS 4 + custom RCT1-themed CSS
- **GIF Support:** gifuct-js for character animations

## Commands

```bash
npm run dev     # Development server (localhost:3000)
npm run build   # Production build
npm run start   # Production server
npm run lint    # ESLint
```

## Project Structure

```
/app
  /components
    /game
      /phaser        # Phaser game engine code
        MainScene.ts   # Core game logic, rendering, entities
        PhaserGame.tsx # React wrapper with imperative handle
        GifLoader.ts   # GIF animation loading
        gameConfig.ts  # Phaser configuration
      GameBoard.tsx    # Main React component, grid state
      types.ts         # Enums: TileType, ToolType, Direction
      roadUtils.ts     # Road connection logic
    /ui              # React UI components (ToolWindow, Modal, etc.)
  /data
    buildings.ts     # Building registry (single source of truth)
  /utils
    sounds.ts        # Audio effects
  layout.tsx         # Root layout
  page.tsx           # Main page
/public
  /Building          # Building sprites by category
  /Tiles             # Ground tiles (grass, road, asphalt, snow)
  /Characters        # Walking GIF animations (4 directions)
  /cars              # Vehicle sprites (4 directions)
```

## Architecture

### React-Phaser Communication

**Data Flow (One-Way):**
```
React (source of truth) ──────► Phaser (renders it)
                         NEVER ◄──────
```

- **React manages:** Grid state (48x48), UI, tool selection, game state
- **Phaser manages:** Rendering, characters, cars, animations, camera
- **React → Phaser:** Via ref methods (`updateGrid()`, `spawnCharacter()`, `shakeScreen()`)
- **Phaser → React:** Via callbacks (`onTileClick`, `onTilesDrag`)

**Key Principle:** Grid changes happen in React via `setGrid()`. Phaser NEVER modifies the grid, only reads it. User input in Phaser emits events back to React.

### Isometric System

- **Tile size:** 44x22 pixels (2:1 isometric projection)
- **Grid size:** 48x48 cells
- **Roads:** Snap to 4x4 grid segments
- **Depth sorting:** `depth = (x + y) * DEPTH_Y_MULT`
- **Coordinate conversion:** See `gridToIso()` and `isoToGrid()` in `types.ts`

### Depth Sorting Layers

```
Layer offsets (from MainScene.ts):
  0.00 - Ground tiles
  0.03 - Back fences
  0.04 - Lamp glow
  0.05 - Buildings
  0.06 - Props/trees
  0.07 - Front fences
  0.08-0.09 - Traffic light overhangs
  0.10 - Cars
  0.20 - Characters
```

## Key Files to Modify

| Task | File |
|------|------|
| Add new buildings | `app/data/buildings.ts` |
| Game logic/rendering | `app/components/game/phaser/MainScene.ts` |
| UI/grid state | `app/components/game/GameBoard.tsx` |
| Types/enums | `app/components/game/types.ts` |
| Road behavior | `app/components/game/roadUtils.ts` |
| Sound effects | `app/utils/sounds.ts` |

## Grid Cell Structure

```typescript
interface GridCell {
  type: TileType;
  x: number;
  y: number;
  isOrigin?: boolean;        // Top-left of multi-cell building
  originX?: number;
  originY?: number;
  buildingId?: string;
  buildingOrientation?: Direction;
  underlyingTileType?: TileType  // For props preserving ground
}
```

## Adding Buildings

Buildings are defined in `app/data/buildings.ts`. Structure:

```typescript
"building-id": {
  id: "building-id",
  name: "Display Name",
  category: "residential" | "commercial" | "civic" | "landmark" | "props" | "christmas",
  footprint: {
    south: [width, height],
    east: [width, height],
    north: [width, height],
    west: [width, height]
  },
  sprites: {
    south: "/Building/category/WxHname_south.png",
    east: "/Building/category/WxHname_east.png",
    north: "/Building/category/WxHname_north.png",
    west: "/Building/category/WxHname_west.png",
  },
  icon: "/Building/category/WxHname_south.png",
  canRotate: true | false
}
```

**Sprite naming convention:** `{width}x{height}{name}_{direction}.png`

**Sprite specifications:**
- Canvas size: 512x512 or larger for big buildings
- Anchor point: Front corner at bottom-center of canvas
- Format: PNG with transparency
- Directions: South (required), North/East/West (optional)

## NPCs and Cars (Agents)

NPCs and cars are **ephemeral cosmetic agents** managed entirely in Phaser:
- NOT part of game state
- Spawn on load based on grid (respawned, not saved)
- READ the grid to make decisions but don't modify it
- Provide visual life to the city

Current implementation: Random wandering
Future: Weighted destinations based on time of day and zone types (see ROADMAP.md)

## Save/Load System

Saves to localStorage as JSON with:
- Grid (tiles, buildings, zones)
- Character count
- Car count
- Zoom level
- Visual settings
- Timestamp

What is NOT saved (rebuilt on load):
- NPC positions
- Car positions
- Sprites/visuals
- Simulation data (land value, etc. - recomputed)

## Code Conventions

- Components: PascalCase
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Building IDs: kebab-case
- Enums: PascalCase values

## Phaser Resources

When troubleshooting Phaser issues, check these resources first:

- **Official Examples:** https://phaser.io/examples/v3.85.0 (searchable, covers most use cases)
- **API Docs:** https://newdocs.phaser.io/docs/3.90.0
- **Community Forum:** https://phaser.discourse.group

Common solutions exist for: camera zoom/pan, input handling, tilemaps, physics, animations.

## Future Development

This project is designed as an isometric city builder foundation. See ROADMAP.md for planned features:
- Zoning system (R/C/I zones like SimCity)
- City simulation (population, demand, budget)
- City services (police, fire, health, education)
- Transportation & traffic simulation
- Event system (petitions, disasters, opportunities)
- Data overlays (traffic, land value, crime, pollution)

The architecture is designed with a 3-layer system:
1. **Simulation (React)** - Source of truth for game state
2. **Rendering (Phaser)** - Pure visualization of Layer 1
3. **Cosmetic Agents (Phaser)** - Eye candy that reacts to the world

## Asset Usage Notes

- **Code:** MIT licensed
- **Art assets (buildings, props, tiles):** For learning, demos, and prototyping only
- **Character sprites:** Proprietary, NOT for commercial release
- For released games, create or commission your own assets

See README.md for full asset usage details.
