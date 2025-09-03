import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-indigo-100 to-pink-100 px-4 md:px-16 lg:px-56 py-16"
      style={{
        backgroundImage: "url('/back.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="flex flex-col items-center mx-56 gap-9" >
      <h1 className="font-extrabold mt-16 text-[50px] text-center">
        <span className="text-[#f56551] ">
          Discover Your Next Adventure with AI:
        </span>{" "}
        Personalized Iterinaries at Your Fingertips
      </h1>
      <p className="text-xl text-center">
        Your personal trip planner and travel curator, creating custom itenaries
        tailored to your own interest and budget
      </p>
      <Link to={"/create-trip"}>
        <Button>Get Started, It's Free</Button>
      </Link>
    </div>
    

      <img  src="/loading_new.png" alt=""  className="mt-6 max-w-[90%] md:max-w-full"/>
    </div>
  );
}

export default Hero;
