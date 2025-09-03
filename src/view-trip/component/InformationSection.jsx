import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { IoIosSend } from "react-icons/io";
import GlobalApi from "@/service/GlobalApi";

 const InfoSection = ({trip}) => {
           const [photoUrl, setPhotoUrl] = useState("/download.jpg");
  return (
    <div>
      <GlobalApi name={trip?.tripData?.destination + ', best tourist spots hd photos'} address={trip?.tripData?.destination} onPhotoFetched={setPhotoUrl} />
       <img src={photoUrl} className='h-[300px] w-full object-cover rounded-xl'/>
       <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl '>
           {trip?.userSelection?.Location}
        </h2>


       <div className='flex justify-between items-center'>
          <div className='flex justify-start gap-2'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray text-sm'>📅{trip?.userSelection?.noofdays} Day </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray text-sm'> 💰{trip?.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray text-sm'>👪Number of Travellers : {trip?.userSelection?.traveller} People </h2>
           </div>
            <Button><IoIosSend /></Button>
        </div>
        
        </div>
      
    </div>
  )
}
export default  InfoSection;