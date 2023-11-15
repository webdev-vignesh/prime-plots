import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {

    const [owner, setOwner] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setOwner(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOwner();
    }, []);

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

  return (
    <div className="flex flex-col gap-2 mt-4">
        <p>
            Contact 
            <span className="font-semibold"> {owner?.username} </span>
             for 
            <span className="font-semibold"> {listing.title.toLowerCase()}</span>
        </p>
        <textarea name="message" id="message" rows={2} value={message} 
            onChange={handleChange} 
            placeholder="Enter your message..."
            className="w-full border p-3 rounded-lg"
        >
        </textarea>
        <Link 
            className="bg-slate-700 text-white text-center p-3 rounded-lg hover:opacity-95"
            to={`mailto:${owner?.email}?subject=Regarding ${listing?.title}&body=${message}`}
        > 
            Send Message
        </Link>
    </div>
  )
}

export default Contact