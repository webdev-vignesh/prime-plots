import {FaSearch} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {

    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("searchTerm", searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`); 
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search])

  return (
    <header className="bg-teal-400 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
            <Link to="/">
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-slate-800">Prime</span>
                    <span className="text-teal-800">Plots</span>
                </h1>
            </Link>
            <form onSubmit={handleSubmit} className="bg-slate-100 p-2 rounded-lg flex items-center">
                <input 
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent focus:outline-none w-24 sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSubmit}>
                    <FaSearch className="text-teal-800" />
                </button>
            </form>
            <ul className="flex items-center gap-4">
                <Link to="/">
                    <li className="hidden sm:inline text-teal-800 font-semibold hover:underline hover:cursor-pointer">Home</li>
                </Link>
                <Link to="/about">
                    <li className="hidden sm:inline text-teal-800 font-semibold hover:underline hover:cursor-pointer">About</li>
                </Link>
                <Link to="/profile">
                {
                    currentUser 
                    ?  (
                        <img 
                            className="rounded-full h-7 w-7 object-cover" 
                            src={currentUser.avatar} 
                            alt="profile" 
                        />
                    )
                    :  <li className="text-white hover:cursor-pointer hover:bg-teal-700 bg-teal-800 px-2 py-1 rounded-md">
                            Sign In
                        </li>
                }
                </Link>

            </ul>
        </div>
    </header>
  )
}

export default Header