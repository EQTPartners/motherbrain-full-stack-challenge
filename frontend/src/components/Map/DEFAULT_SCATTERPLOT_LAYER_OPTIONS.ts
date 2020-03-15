import { Point } from '../../types';

export const DEFAULT_SCATTERPLOT_LAYER_OPTIONS = {
  id: 'scatterplot-layer',
  pickable: true,
  opacity: 0.8,
  stroked: true,
  filled: true,
  radiusScale: 7,
  radiusMinPixels: 1,
  radiusMaxPixels: 200,
  lineWidthMinPixels: 1,
  getPosition: (d: Point) => d.coordinates,
  getRadius: (d: Point) => 150,
  getFillColor: (d: Point) => [255, 140, 0],
  getLineColor: (d: Point) => [0, 0, 0, 0],
};
