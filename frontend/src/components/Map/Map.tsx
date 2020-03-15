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
import { InvestmentsResponse, InvestorsResponse, Line, LayerTypes, Point } from '../../types';
import { MapDataFormatter } from '../../utils';

interface MapProps {
  investmentsData: InvestmentsResponse | null;
  investorsData: InvestorsResponse | null;
  handleInvestorClick: (name: string) => void;
  layerType: LayerTypes;
}

const isLine = (object: any): object is Line => object.to != null;

export const Map = (props: MapProps) => {
  const { investmentsData, investorsData, handleInvestorClick, layerType } = props;
  const {
    mapbox: { apiToken },
  } = getConfig();
  const [tooltipProperties, setTooltipProperties] = useState<{
    object: Point | Line | null;
    x: number;
    y: number;
  }>({ object: null, x: 0, y: 0 });

  const getLayer = () => {
    switch (layerType) {
      case LayerTypes.Investments:
        return getInvestmentsLayer();
      case LayerTypes.Investors:
        return getInvestorsLayer();
      default:
        return;
    }
  };

  const getInvestorsLayer = () => {
    if (investorsData == null) {
      return;
    }

    const formattedData = MapDataFormatter.convertInvestorsResponseToPointData(investorsData);

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
    if (investmentsData == null) {
      return null;
    }

    const formattedData = MapDataFormatter.convertInvestmentsResponseToLineData(investmentsData);

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
