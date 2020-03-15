import { Line } from '../../types';

export const DEFAULT_GREAT_CIRCLE_LAYER_OPTIONS = {
  id: 'great-circle-layer',
  pickable: true,
  getWidth: 12,
  getSourcePosition: (d: Line) => d.from.coordinates,
  getTargetPosition: (d: Line) => d.to.coordinates,
  getSourceColor: (d: Line) => [50, 140, 0, 10],
  getTargetColor: (d: Line) => [50, 140, 0],
  wrapLongitude: true,
};
