import {
  eventNameIndex,
  type DxEvent,
  eventPersonIndex,
  eventTitleIndex,
  eventDateIndex,
} from './dx-event';

function EventCard({dxEvent}: {readonly dxEvent: DxEvent}) {
  return (
    <div className="gap-1 p2 bg-nfPurple-100 text-white animate-fade-in">
      <div className="text-sm font-mono">{dxEvent[eventDateIndex]}</div>
      <div className="text-lg font-bold">{dxEvent[eventNameIndex]}</div>
      <div className="font-italic text-base">{dxEvent[eventTitleIndex]}</div>
      <div className="text-sm font-bold">{dxEvent[eventPersonIndex]}</div>
    </div>
  );
}

export default function EventList({
  countryName,
  dxEvents,
}: {
  readonly countryName: string | undefined;
  readonly dxEvents: DxEvent[];
}) {
  const sortedEvents = dxEvents.toSorted((a, b) =>
    a[eventDateIndex].localeCompare(b[eventDateIndex]),
  );

  return (
    <div className="w-25% items-center overflow-y-auto p2 max-h-full">
      <div className="w-full items-center gap-2">
        <div className="text-2xl font-bold">{countryName ?? <>&nbsp;</>}</div>
        <div className="w-full gap-3">
          {sortedEvents.map((dxEvent) => (
            <EventCard
              key={`${dxEvent[eventNameIndex]}${dxEvent[eventPersonIndex]}${dxEvent[eventTitleIndex]}`}
              dxEvent={dxEvent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
