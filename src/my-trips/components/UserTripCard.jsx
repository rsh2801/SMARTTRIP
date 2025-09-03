import GlobalApi from '@/service/GlobalApi';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCard({trip}) {
    const [photoUrl, setPhotoUrl] = useState("/download.jpg");
  return (
    <Link to={'/view-trip/'+trip?.id}
    target='_blank'
    className="text-black hover:text-blue"
    >
    <div className='hover:scale-105 transition-all'>
        <img src={photoUrl } className='object-cover rounded-xl h-[220px]' />
        <div>
        <GlobalApi name={trip?.tripData?.destination + ', best tourist spots hd photos'} address={trip?.tripData?.destination} onPhotoFetched={setPhotoUrl} />
            <h2 className='font-bold text-lg'>
                {trip?.userSelection?.Location}
            </h2>
            <h2 className='text-sm text-gray-500'>
              
                {trip?.userSelection?.noofdays} Days trip with {trip?.userSelection?.budget} budget
            </h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCard