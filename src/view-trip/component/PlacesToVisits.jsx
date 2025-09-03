import React from "react";
import PlaceCardItem from "./PlaceCardItem";
import { LuAlarmClockCheck } from "react-icons/lu";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places To Visit</h2>

      <div>
        {trip?.tripData?.itinerary.map((item, index) => (
          <div>
            <h2 className="font-medium text-lg">Day {item?.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item?.places.map((place, index) => (
                <div className="my-3">
                  {/* <h2>{place.name}</h2> */}
                  <div className="flex items-center mt-2">
                    <LuAlarmClockCheck className="mx-2 font-medium text-sm text-orange-700" />
                    <span className="text-medium text-orange-700">{place.bestTimeToVisit}</span>
                  </div>
                  <PlaceCardItem place={place}></PlaceCardItem>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
