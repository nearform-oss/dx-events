import {
  eventNameIndex,
  type DxEvent,
  eventPersonIndex,
  eventTitleIndex,
  eventDateIndex,
  eventCountryIndex,
} from './dx-event';
import cody from './assets/cody.jpeg';
import paolo from './assets/paolo.webp';
import paula from './assets/paula.jpg';
import marco from './assets/marco.webp';
import rafael from './assets/rafael.jpg';

const peopleMap = {
  cody,
  paolo,
  paula,
  marco,
  rafael,
};

function EventCard({
  dxEvent,
  showCountry,
}: {
  readonly dxEvent: DxEvent;
  readonly showCountry: boolean;
}) {
  const person =
    peopleMap[
      dxEvent[eventPersonIndex].toLowerCase() as
        | 'cody'
        | 'paolo'
        | 'paula'
        | 'marco'
        | 'rafael'
    ];

  return (
    <div className="gap-1 p2 bg-nfPurple-100 text-white animate-fade-in">
      <div className="text-xs flex-row-reverse justify-between flex-wrap gap-2">
        <div className="font-mono">{dxEvent[eventDateIndex]}</div>
        {showCountry && (
          <div className="text-right">{dxEvent[eventCountryIndex]}</div>
        )}
      </div>
      <div className="text-lg font-bold">{dxEvent[eventNameIndex]}</div>
      <div className="flex-row lt-sm:flex-col items-center">
        <div className="rounded-full h-12 w-12 overflow-hidden flex-shrink-0 flex-grow-0">
          <img src={person} />
        </div>
        <div className="gap-1 flex-shrink-1 flex-grow-1">
          <div className="font-italic text-base pl-2">
            {dxEvent[eventTitleIndex]}
          </div>
          <div className="text-sm font-bold pl-2">
            {dxEvent[eventPersonIndex]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventList({
  countryName,
  dxEvents,
}: {
  readonly countryName: string;
  readonly dxEvents: DxEvent[];
}) {
  const sortedEvents = dxEvents.toSorted((a, b) =>
    a[eventDateIndex].localeCompare(b[eventDateIndex]),
  );

  return (
    <div className="w-full items-center overflow-y-auto overflow-x-hidden p2 break-words">
      <div className="w-full items-center gap-2">
        <div className="flex-row items-baseline gap-2 flex-wrap">
          <div className="text-2xl font-bold">{countryName}</div>
          <div className="">{dxEvents.length} events</div>
        </div>
        <div className="w-full gap-3">
          {sortedEvents.map((dxEvent) => (
            <EventCard
              key={`${dxEvent[eventNameIndex]}${dxEvent[eventPersonIndex]}${dxEvent[eventTitleIndex]}`}
              dxEvent={dxEvent}
              showCountry={countryName === 'All'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
