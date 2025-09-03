import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "sonner";

export default function Header() {
     const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
     const [openDialog, setopenDialog] = useState(false);
     const [loading, setLoading] = useState(false);
     
     useEffect(() => {
      console.log("User data:", user);
      console.log("User picture:", user?.picture);
     }, [user])

          const login = useGoogleLogin({
        onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
        onError: (error) => {
            console.log(error);
            toast.error("Login failed");
        },
           });
          const getUserProfile = (tokenInfo) => {
        axios
            .get(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenInfo.access_token}`,
                        Accept: "Application/json",
                    },
                }
            )
            .then((resp) => {
                console.log(resp);
                localStorage.setItem("user", JSON.stringify(resp.data));
                setopenDialog(false);
                toast.success("Signed in successfully!");
                // After login, automatically try to generate trip
                window.location.reload();
                
             
            })
            .catch((err) => {
                console.log(err);
                toast.error("Login failed");
            });
    };
  return (
    <header className='p-3 shadow-sm flex justify-between items-center px-5 '>
     
        <img src='/logo.svg' alt="Logo" className="h-8 w-auto block"/>
    
      <div>
      {user?
      <div className='flex items-center gap-3'>
        <a href='/my-trips'>
        <Button variant="outline" className='rounded-full'>My Trips</Button>
        </a>
         <a href='/create-trip'>
        <Button variant="outline" className='rounded-full'>Create Trips</Button>
        </a>
       
        <Popover>
          <PopoverTrigger asChild>
            <button className='h-[35px] w-[35px] rounded-full border-2 border-gray-200 hover:border-blue-400 transition-colors duration-200 flex items-center justify-center bg-gray-100'>
              {user?.picture ? (
                <img 
                  src={user.picture} 
                  className='h-full w-full rounded-full object-cover'
                  alt="Profile"
                  onError={(e) => {
                    console.log("Image failed to load:", user.picture);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className='h-full w-full rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm' style={{display: user?.picture ? 'none' : 'flex'}}>
                {user?.name?.charAt(0) || 'U'}
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0 bg-white border border-gray-200 shadow-lg rounded-lg" align="end">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <img src={user?.picture} className='h-10 w-10 rounded-full object-cover border-2 border-gray-200'/>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{user?.name}</p>
                  <p className="text-gray-500 text-xs">{user?.email}</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <button 
                className='w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 group'
                onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                <svg className="w-4 h-4 mr-3 group-hover:transform group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </PopoverContent>  
        </Popover>
      </div>:
      <Button onClick={() => setopenDialog(true)}>Sign In</Button>} 
       
      </div>
        <Dialog open={openDialog} onOpenChange={setopenDialog}>
              <DialogContent className="bg-white border border-gray-200 shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">Sign In Required</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Please sign in to continue and generate your trip plan.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <img className="mx-auto" src="/logo.svg" />
                  <div className="text-center">
                    <h3 className="font-bold text-lg text-gray-900"></h3>
                    <p className="text-gray-600 mt-2">Click here to Sign in  with Google</p>
                  </div>
                  <Button
                    className="w-full mt-5 flex gap-4 items-center bg-blue-600 hover:bg-blue-700"
                    onClick={login}
                  >
                    <FcGoogle className="h-7 w-7" /> Sign In With Google
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
    </header>
  )
}
