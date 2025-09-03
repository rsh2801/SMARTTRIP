import { Button } from '@/components/ui/button'
import GlobalApi from '@/service/GlobalApi';
import React, { useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({place}) {
              const [photoUrl, setPhotoUrl] = useState("/download.jpg");
  return (
    <Link
    to={
        "https://www.google.com/maps/search/?api=1&query=" +
        place?.name +',' + place?.address
    }
    target='_blank'
    className="text-black hover:text-black"
    >
    <div className='border rounded-xl p-3 mt-3 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
    <GlobalApi name={place?.name} address={place?.details} onPhotoFetched={setPhotoUrl} />
       <img src={photoUrl || "/download.jpg"} className='w-[130px] h-[130px] rounded-xl' />
        <div>
            <h2 className='font-bold text-lg'>{place.name}</h2>
            <p className='text-sm text-gray-400'>{place.details}</p>
            <h2 className='mt-2'>🕙 {place.timeToTravelFromPreviousLocation}</h2>
            <Button  size="sm"> <FaMapLocationDot /> </Button>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem;