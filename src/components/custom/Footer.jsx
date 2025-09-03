import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {
  const w_url = `https://wa.me/7050138984`
  return (
    <div className="my-7 text-center">
      {/* Light separator line */}
      <hr className="border-gray-300 w-full mb-4" />

      {/* Creator Name */}
      <h2 className="text-gray-400">Created By US - AI Travel Planner</h2>

      {/* Contact Section (Centered) */}
      <div className="flex justify-center items-center gap-2 mt-2">
        <h2 className="text-gray-400">Contact me:</h2>
        <a
          href={w_url} // Replace with actual WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 text-2xl hover:text-green-600"
        >
          <FaWhatsapp />
        </a>
      </div>
    </div>
  );
}

export default Footer;
