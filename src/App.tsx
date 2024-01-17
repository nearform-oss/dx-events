import {useState} from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import clsx from 'clsx';
import geo from './assets/ne_50m_admin_0_countries.json';
import events from './assets/events.csv?raw';
import {type DxEvent, eventCountryIndex} from './dx-event';
import EventList from './EventList';
import logo from './assets/NF_Logo_DeepNavy.svg';

const eventList = events
  .split('\n')
  .map((line) =>
    line
      // Commas followed by even number of quotes (including 0 quotes)
      // https://stackoverflow.com/a/48275050/880509
      .split(/,(?=(?:[^"]*"[^"]*")*(?![^"]*"))/)
      // Strip any remaining quotes
      .map((cell) => cell.replaceAll('"', '')),
  )
  .slice(1) as DxEvent[];

const defaultCountry: SelectedCountry = {
  geo: undefined,
  dxEvents: eventList,
};

function eventCountToColor(count: number) {
  if (count === 0) {
    return 'fill-white';
  }

  if (count <= 2) {
    return 'fill-nfBlue-30';
  }

  if (count <= 4) {
    return 'fill-nfBlue-50';
  }

  if (count <= 6) {
    return 'fill-nfBlue-80';
  }

  // If (count === 4) {
  //   return 'fill-nfBlue-80';
  // }

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
    <div className="w-100dvw h-100dvh max-w-100dvw max-h-100dvh overflow-hidden items-center">
      <div className="w-full p2">
        <div className="bg-nfGreen-100 items-center p3 text-nfMidnight-100 flex-row flex-wrap gap-2">
          <img src={logo} className="h-4rem" />
          <div className="text-3xl font-bold flex-grow-1 leading-none text-center">
            DX Events 2023 Hello
          </div>
        </div>
      </div>
      <div className="w-full flex-row items-stretch min-h-0 h-full">
        <div className="w-25% lt-sm:w-40% max-h-full overflow-hidden">
          <EventList
            dxEvents={country.dxEvents}
            countryName={country.geo?.properties?.NAME ?? 'All'}
          />
        </div>
        <div className="w-75% lt-sm:w-60% justify-center overflow-hidden">
          <div className="w-full h-full">
            <ComposableMap className="w-full h-full" width={1280} height={720}>
              <ZoomableGroup zoom={1.5}>
                <Geographies geography={geo}>
                  {({geographies}: {geographies: Geo[]}) =>
                    geographies.map((geo) => {
                      const dxEvents = eventList.filter(
                        (event) =>
                          event[eventCountryIndex] === geo.properties.NAME,
                      );

                      const isSelected =
                        selectedCountry && selectedCountry.geo === geo;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          className={clsx(
                            'hover:fill-nfGreen-80 pressed:red-8 stroke-nfGreen-100 focus:outline-none active:border-none stroke-[0.5px]',
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
                            setSelectedCountry((currentCountry) =>
                              currentCountry?.geo === geo
                                ? undefined
                                : {geo, dxEvents},
                            );
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
    </div>
  );
}

export default App;
