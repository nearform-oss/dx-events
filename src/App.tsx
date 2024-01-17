import {useState} from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import clsx from 'clsx';
import geo from './assets/ne_110m_admin_0_countries.json';
import events from './assets/events.csv?raw';
import {type DxEvent, eventCountryIndex} from './dx-event';
import EventHorizontalList from './EventHorizontalList';

const eventList = events
  .split('\n')
  .map((line) => line.split(','))
  .slice(1) as DxEvent[];

const defaultCountry: SelectedCountry = {
  geo: undefined,
  dxEvents: [],
};

function eventCountToColor(count: number) {
  if (count === 0) {
    return 'fill-white';
  }

  if (count === 1) {
    return 'fill-nfBlue-10';
  }

  if (count === 2) {
    return 'fill-nfBlue-30';
  }

  if (count === 3) {
    return 'fill-nfBlue-50';
  }

  if (count === 4) {
    return 'fill-nfBlue-80';
  }

  return 'fill-nfBlue-100';
}

type SelectedCountry = {
  geo: Geo | undefined;
  dxEvents: DxEvent[];
};

type Geo = {
  rsmKey: string;
  properties: {
    NAME: string;
  };
};

function App() {
  const [hoverCountry, setHoverCountry] = useState<SelectedCountry>();
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>();

  const country = hoverCountry ?? selectedCountry ?? defaultCountry;

  return (
    <div className="w-100dvw h-100dvh items-center max-w-100dvw max-h-100dvh overflow-hidden">
      <EventHorizontalList
        dxEvents={country.dxEvents}
        countryName={country.geo?.properties?.NAME}
      />
      <div className="flex-grow-1 flex-shrink-1 w-auto aspect-video">
        <div className="h-full aspect-video">
          <ComposableMap className="w-full h-full" width={1280} height={720}>
            <ZoomableGroup>
              <Geographies geography={geo}>
                {({geographies}: {geographies: Geo[]}) =>
                  geographies.map((geo) => {
                    const dxEvents = eventList.filter(
                      (event) =>
                        event[eventCountryIndex] === geo.properties.NAME,
                    );

                    if (geo.properties.NAME.toLowerCase() === 'italy') {
                      console.log(dxEvents);
                      console.log(geo);
                    }

                    const isSelected =
                      selectedCountry && selectedCountry.geo === geo;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className={clsx(
                          'hover:fill-nfGreen-80 pressed:red-8 stroke-nfGreen-100 focus:outline-none active:border-none',
                          isSelected
                            ? 'fill-nfGreen-80'
                            : eventCountToColor(dxEvents.length),
                        )}
                        onMouseEnter={() => {
                          setHoverCountry({geo, dxEvents});
                        }}
                        onMouseLeave={() => {
                          setHoverCountry(undefined);
                        }}
                        onClick={() => {
                          console.log('click');
                          setSelectedCountry({geo, dxEvents});
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
}

export default App;
