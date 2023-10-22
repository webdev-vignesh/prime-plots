import {FaSearch} from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-teal-400 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
            <Link to="/">
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-slate-800">Prime</span>
                    <span className="text-teal-800">Plots</span>
                </h1>
            </Link>
            <form className="bg-slate-100 p-2 rounded-lg flex items-center">
                <input 
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent focus:outline-none w-24 sm:w-64"
                />
                <FaSearch className="text-teal-800" />
            </form>
            <ul className="flex items-center gap-4">
                <Link to="/">
                    <li className="hidden sm:inline text-teal-800 font-semibold hover:underline hover:cursor-pointer">Home</li>
                </Link>
                <Link to="/about">
                    <li className="hidden sm:inline text-teal-800 font-semibold hover:underline hover:cursor-pointer">About</li>
                </Link>
                <Link to="/sign-in">
                    <li className="text-white hover:cursor-pointer hover:bg-teal-700 bg-teal-800 px-2 py-1 rounded-md">Sign In</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}

export default Header