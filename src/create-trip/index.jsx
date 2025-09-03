import React, { useEffect, useState } from "react";
import { Input } from '../components/ui/input';
import { SelectBudgetOptions, SelectTravelList, systemprompt } from "@/constants/options";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { chatSession } from "@/service/AIModel";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import AutoComplete from "./AutoComplete";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firbaseconfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [openDialog, setopenDialog] = useState(false);
  const [FormData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUserProfile = (tokenInfo) => {
    axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
      { headers: { Authorization: `Bearer ${tokenInfo.access_token}`, Accept: "Application/json" } }
    )
    .then((resp) => {
      localStorage.setItem("user", JSON.stringify(resp.data));
      setopenDialog(false);
      toast.success("Signed in successfully!");
      onGenerateTrip();
    })
    .catch(() => toast.error("Login failed"));
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: () => toast.error("Login failed"),
  });

  const handleinputchange = (name, value) => setFormData({ ...FormData, [name]: value });

  useEffect(() => console.log(FormData), [FormData]);

  const onGenerateTrip = async () => {
    const toastId = toast.loading("Generating your trip..."); // Loading toast

    const userString = localStorage.getItem('user');
    if (!userString) {
      toast.dismiss(toastId);
      setopenDialog(true);
      return;
    }

    let user;
    try { user = JSON.parse(userString); } catch { localStorage.removeItem('user'); toast.dismiss(toastId); return setopenDialog(true); }

    if(FormData?.noofdays > 5 || !FormData?.noofdays || !FormData?.Location || !FormData?.budget || !FormData?.traveller) {
      toast.dismiss(toastId);
      toast("Please Fill All Details!");
      return;
    }

    setLoading(true);
    try {
      const FINAL_PROMPT = systemprompt
        .replace("{startingPoint}", "Ranchi")
        .replace("{destination}", FormData?.Location?.description || FormData?.Location)
        .replace("{days}", FormData?.noofdays)
        .replace("{budget}", FormData?.budget)
        .replace("{companions}", FormData?.traveller);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      await SaveAiTrip(result.response.text());
      toast.success("Trip generated successfully!", { id: toastId });
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again.", { id: toastId });
    } finally { setLoading(false); }
  };

  const SaveAiTrip = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: FormData,
        tripData: JSON.parse(TripData),
        userEmail: user.email,
        id: docId,
      });
      navigate('/view-trip/' + docId);
    } catch (e) {
      console.error("Database error:", e);
      toast.error("NOT able to connect to database try after some time");
      throw e;
    }
  };

  const handlePlace = (selectedPlace) => {
    setPlace(selectedPlace);
    handleinputchange("Location", selectedPlace.description);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* Destination */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <div className={`p-2 border rounded-lg transition-all duration-300 ${FormData.Location ? "bg-gray-200 border-black shadow-md" : "border-gray-300 hover:border-gray-400"}`}>
            <AutoComplete handlePlace={handlePlace} />
          </div>
        </div>

        {/* Number of Days */}
        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <Input
            placeholder="Ex-3"
            type="number"
            value={FormData.noofdays || ""}
            onChange={(e) => handleinputchange("noofdays", e.target.value)}
            className={`rounded-lg p-2 border w-full transition-all duration-300 ${FormData.noofdays ? "bg-gray-200 border-black shadow-md" : "border-gray-300 hover:border-gray-400"}`}
          />
        </div>

        {/* Budget */}
        <div>
          <h2 className="text-xl my-10 font-medium">What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item,index) => (
              <div
                key={index}
                onClick={() => handleinputchange("budget", item.title)}
                className={`p-4 cursor-pointer border rounded-lg transition-all duration-300 ${FormData.budget === item.title ? "bg-gray-200 shadow-lg border-black border-2" : "hover:border-gray-400 hover:bg-gray-100"}`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Traveller */}
        <div>
          <h2 className="text-xl my-10 font-medium">Who do you plan travelling with?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelList.map((item,index) => (
              <div
                key={index}
                onClick={() => handleinputchange("traveller", item.people)}
                className={`p-4 cursor-pointer border rounded-lg transition-all duration-300 ${FormData.traveller === item.people ? "bg-gray-200 shadow-lg border-black border-2" : "hover:border-gray-400 hover:bg-gray-100"}`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="my-10 justify-end flex">
          <Button
            disabled={loading}
            onClick={onGenerateTrip}
            className="px-10 py-4 text-lg" // Bigger button
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              'Generate Trip'
            )}
          </Button>
        </div>

        {/* Sign In Dialog */}
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
                <p className="text-gray-600 mt-2">Click here to Sign in with Google</p>
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
      </div>
    </div>
  )
}

export default CreateTrip;
