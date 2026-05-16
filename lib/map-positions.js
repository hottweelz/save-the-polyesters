// Per-region marker positions on /public/media/world_map.svg.
// Values are PERCENTAGES of the rendered image box (0 = left/top, 100 = right/bottom).
//
// Seeded from equirectangular (Plate Carrée) projection. If the source map
// uses a different projection (Robinson, Equal Earth, Mercator, etc.) the
// markers will be visually off — nudge the values below by eye until each
// dot sits on its city / region. Hot-reload makes this fast.
//
// Tip: open the site, hover the dot you want to move, edit its xPct/yPct
// here, save, see it move.

export const MAP_POSITIONS = {
  pnw:  { xPct: 16.1, yPct: 23.9 }, // Cascadia, Pacific Northwest
  sw:   { xPct: 19.4, yPct: 31.7 }, // Sonoran
  gulf: { xPct: 25.0, yPct: 33.3 }, // Gulf Coast
  app:  { xPct: 27.2, yPct: 30.0 }, // Appalachian
  gl:   { xPct: 26.4, yPct: 25.0 }, // Great Lakes
  ne:   { xPct: 30.3, yPct: 26.1 }, // New England
  eu:   { xPct: 51.7, yPct: 22.2 }, // Western Europe
  bg:   { xPct: 75.0, yPct: 36.7 }, // Bengal
  jp:   { xPct: 88.3, yPct: 30.0 }, // Honshū
  au:   { xPct: 90.3, yPct: 68.9 }, // Murray-Darling
};

// Aspect ratio of /public/media/world_map.svg — used to reserve layout space
// before the SVG paints. Update if you swap the map graphic.
export const MAP_ASPECT = { width: 2500, height: 1633.5 };

export const MAP_SRC = '/media/world_map.svg';
