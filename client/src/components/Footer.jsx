import { FaXTwitter } from "react-icons/fa6";
import { BsFacebook, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="relative w-full mt-24 bottom-0 px-16 pt-6 flex flex-col bg-teal-700 text-white">
      <div className="flex flex-col sm:flex-row gap-4 justify-evenly">
        <div className="space-y-4">
          <h1 className="font-semibold underline">About Us</h1>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-800">Prime</span>
            <span className="text-teal-400">Plots</span>
          </h1>
          <div>
            <p className="break-words max-w-md">Prime Plots is a premium Plots or Villa provider,
            the largest platform for buyers and sellers
            of property to connect in a transparent manner.</p>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="font-semibold underline">Contact Us</h1>
          <div className="">
            <p>No. 4, Richard Street,</p>
            <p>12th Lane, Grin Plateau,</p>
            <p>Bristol, UK</p>
          </div>
          <div className="flex items-center gap-4">
            <FaXTwitter />
            <BsFacebook />
            <BsYoutube />
          </div>
        </div>
        <div>
          <h1 className="underline">Subscribe to our newsletter</h1>
          <div className="flex flex-wrap gap-4 mt-4">
            <input type="email" placeholder="Email" className="p-1 focus:outline-none rounded-lg" />
            <button type="submit" className="p-1 bg-white text-black rounded-lg">Submit</button>
          </div>
          <p className="mt-2">Receive weekly real-estate insights!</p>
        </div>
      </div>
      <div className="text-center mt-4 mb-2">
        <p>&#169; PrimePlots - All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer