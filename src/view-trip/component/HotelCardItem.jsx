import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import GlobalApi from '@/service/GlobalApi'

export default function HotelCardItem({hotel}) {
  const [photoUrl, setPhotoUrl] = useState("/download.jpg");
  return (
          
   <Link
            
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              hotel?.name + ',' + hotel?.address
            }
            //new tab
            target='_blank'
            className="text-black hover:text-black"
          >
            <div className='hover:scale-110 transition-all cursor-pointer'>
             <GlobalApi name={hotel?.name} address={hotel?.address} onPhotoFetched={setPhotoUrl} />
            
              <img src={photoUrl} className="rounded-xl h-[180px] w-full object-cover" />
              <div className='my-2 flex flex-col gap-2'>
                <h2 className='font-medium'>{hotel.name}</h2>
                <h2 className='text-xs text-gray-500'>{hotel?.address} 📍</h2>
                <h2 className='text-sm'>{hotel?.price}</h2>
                <h2 className='text-sm'>⭐{hotel?.rating}</h2>
              </div>
            </div>
          </Link>
  )
}
