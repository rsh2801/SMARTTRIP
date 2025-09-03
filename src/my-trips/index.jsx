import { db } from '@/service/firbaseconfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCard from './components/UserTripCard';

function MyTrips() {
    const [userTrip , setUserTrip]= useState([]);
useEffect(()=>{
    GetUserTrips()
},[])
const navigation= useNavigate();
    const GetUserTrips=async()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        
        if(!user){
            navigation('/');
            return;
        }

        setUserTrip([]);

        const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));

        const querySnapshot = await getDocs(q);
        setUserTrip([]);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUserTrip(prevVal=>[...prevVal , doc.data()])
        });
    }
  return (
    <div className=' sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>My Trips</h2>

        <div className='my-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {userTrip?.length>0 ? userTrip.map((trip,index)=>(
                <UserTripCard trip={trip} />
            )):
            [1,2,3,4,5,6].map((item , index)=>(
                <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'>
                    
                </div>
            ))
            }
        </div>
    </div>
  )
}

export default MyTrips