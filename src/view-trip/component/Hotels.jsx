import React from 'react'
import { Link } from 'react-router-dom'
import GlobalApi from '@/service/GlobalApi'
import HotelCardItem from "./HotelCardItem";




const Hotels= function ({trip}) {
  return (
    <div>
      
      <h2 className="font-bold text-xl mt-5 mb-5">Hotel Recommendations</h2>
        
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel}/>
        ))}
      </div>
    </div>
  )
}
export default Hotels