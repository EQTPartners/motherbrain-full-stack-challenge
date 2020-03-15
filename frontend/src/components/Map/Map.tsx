import React, { useState } from 'react';
// @ts-ignore
import { GreatCircleLayer, ScatterplotLayer } from 'deck.gl';
// @ts-ignore
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';

import { DEFAULT_GREAT_CIRCLE_LAYER_OPTIONS } from './DEFAULT_GREAT_CIRCLE_LAYER_OPTIONS';
import { DEFAULT_SCATTERPLOT_LAYER_OPTIONS } from './DEFAULT_SCATTERPLOT_LAYER_OPTIONS';
import { INITIAL_VIEW_STATE } from './INITIAL_VIEW_STATE';
import { getConfig } from '../../conifg';
import { InvestmentsResponse, InvestorsResponse, Line, MapTypes, Point } from '../../types';
import { MapDataFormatter } from '../../utils';

interface MapProps {
  data: InvestorsResponse | InvestmentsResponse | null;
  handleInvestorClick: (name: string) => void;
  type: MapTypes;
}

const isLine = (object: any): object is Line => object.to != null;

export const Map = (props: MapProps) => {
  const { data, handleInvestorClick, type } = props;
  const {
    mapbox: { apiToken },
  } = getConfig();
  const [tooltipProperties, setTooltipProperties] = useState<{
    object: Point | Line | null;
    x: number;
    y: number;
  }>({ object: null, x: 0, y: 0 });

  const getLayer = () => {
    if (data == null) {
      return;
    }

    if (type === MapTypes.Investors) {
      return getInvestorsLayer();
    }

    return getInvestmentsLayer();
  };

  const getInvestorsLayer = () => {
    const formattedData = MapDataFormatter.convertInvestorsResponseToPointData(
      data as InvestorsResponse,
    );

    return new ScatterplotLayer({
      ...DEFAULT_SCATTERPLOT_LAYER_OPTIONS,
      data: formattedData,
      onHover: ({ object, x, y }: { object: Point; x: number; y: number }) => {
        setTooltipProperties({ object, x, y });
      },
      onClick: ({ object }: { object: Point }) => handleInvestorClick(object.name),
    });
  };

  const getInvestmentsLayer = () => {
    const formattedData = MapDataFormatter.convertInvestmentsResponseToLineData(
      data as InvestmentsResponse,
    );

    return new GreatCircleLayer({
      ...DEFAULT_GREAT_CIRCLE_LAYER_OPTIONS,
      data: formattedData,
      onHover: ({ object, x, y }: { object: Line; x: number; y: number }) => {
        setTooltipProperties({ object, x, y });
      },
    });
  };

  const renderTooltip = () => {
    const { object, x, y } = tooltipProperties;

    if (object == null) {
      return null;
    }

    const message = isLine(object) ? object.to.name : object.name;

    return (
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          pointerEvents: 'none',
          left: x + 10,
          top: y + 10,
        }}
      >
        {message}
      </div>
    );
  };

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={[getLayer()]}
      width={'100%'}
      height={'100%'}
    >
      <StaticMap mapboxApiAccessToken={apiToken} width={'100%'} height={'100%'} />
      {renderTooltip()}
    </DeckGL>
  );
};
