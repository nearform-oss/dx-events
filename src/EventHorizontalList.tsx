import {
  eventNameIndex,
  type DxEvent,
  eventPersonIndex,
  eventTitleIndex,
} from './dx-event';

export default function EventHorizontalList({
  countryName,
  dxEvents,
}: {
  readonly countryName: string | undefined;
  readonly dxEvents: DxEvent[];
}) {
  if (dxEvents.length === 0) {
    return (
      <>
        <div className="flex-grow-0 flex-shrink-0 text-lg">&nbsp;</div>
        <div className="flex-grow-0 flex-shrink-0 w-full">
          <div className="flex-row text-sm flex-nowrap overflow-x-scroll">
            <div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const groupedEvents = new Map<string, DxEvent[]>();
  for (const dxEvent of dxEvents) {
    groupedEvents.set(dxEvent[eventNameIndex], [
      ...(groupedEvents.get(dxEvent[eventNameIndex]) ?? []),
      dxEvent,
    ]);
  }

  console.log(groupedEvents);

  return (
    <>
      <div className="flex-grow-0 flex-shrink-0 text-lg">{countryName}</div>
      <div className="flex-grow-0 flex-shrink-0 w-full">
        <div className="flex-row text-sm flex-nowrap overflow-x-scroll gap-2">
          {Array.from(groupedEvents.entries()).map(([eventName, dxEvents]) => (
            <div
              // Key={`${dxEvent[eventNameIndex]}${dxEvent[eventPersonIndex]}${dxEvent[eventTitleIndex]}`}
              key={eventName}
            >
              <div className="text-nowrap flex-grow">{eventName}</div>
              <div className="flex-row">
                {dxEvents.map((dxEvent) => (
                  <div
                    key={`${eventName}${dxEvent[eventPersonIndex]}${dxEvent[eventTitleIndex]}`}
                    className="text-nowrap flex-grow text-nfGreen-600"
                  >
                    {dxEvent[eventPersonIndex]}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
