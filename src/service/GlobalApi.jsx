


import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const GlobalApi = ({ name, address, onPhotoFetched }) => {
  const [photoUrl, setPhotoUrl] = useState("/download.jpg"); // Default image

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!name || !address) {
        onPhotoFetched("/download.jpg");
        return;
      }

      try {
        // Get Place ID
        const findPlaceUrl = `https://maps.gomaps.pro/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
          name
        )}&inputtype=textquery&locationbias=ipbias&language=en&key=${API_KEY}`;

        const findPlaceResponse = await fetch(findPlaceUrl);
        const findPlaceData = await findPlaceResponse.json();

        if (findPlaceData.status !== "OK" || !findPlaceData.candidates?.[0]?.place_id) {
          throw new Error("Place ID not found");
        }

        const placeId = findPlaceData.candidates[0].place_id;

        // Get Photo Reference
        const placeDetailsUrl = `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${placeId}&language=en&key=${API_KEY}`;
        const placeDetailsResponse = await fetch(placeDetailsUrl);
        const placeDetailsData = await placeDetailsResponse.json();

        if (placeDetailsData.status !== "OK" || !placeDetailsData.result?.photos?.[0]?.photo_reference) {
          throw new Error("Photo reference not found");
        }

        const photoReference = placeDetailsData.result.photos[0].photo_reference;

        // Generate Final Photo URL
        const newPhotoUrl = `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoReference}&maxHeight=3000&maxwidth=3000&key=${API_KEY}`;

        setPhotoUrl(newPhotoUrl);
        onPhotoFetched(newPhotoUrl); // Update the parent component
      } catch (error) {
        console.error("Error fetching place photo:", error);
        setPhotoUrl("/download.jpg");
        onPhotoFetched("/download.jpg");
      }
    };

    fetchPhoto();
  }, [name, address, onPhotoFetched]);

  return null; // This component only fetches the photo and updates the state
};

export default GlobalApi;
