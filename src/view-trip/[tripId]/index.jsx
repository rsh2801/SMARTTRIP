import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { db } from "../../service/firbaseconfig";
import InfoSection from "../component/InformationSection";
import Hotels from "../component/Hotels";
import PlacesToVisit from "../component/PlacestoVisits.jsx";
import Footer from "../../components/custom/Footer";

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  const getTripData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document");
        toast.error("No trip found");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast.error("Failed to load trip");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading Trip...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Info Section */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels */}
      <Hotels trip={trip} />

      {/* Daily Plan */}
      <PlacesToVisit   trip={trip}/>

    
    </div>
  );
}

export default Viewtrip;
