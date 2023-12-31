import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { app } from "../firebase";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUSerStart, updateUserFailure, updateUserSuccess } from "../redux/user/userSlice";
import { Link } from "react-router-dom";

const Profile = () => {

  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [listingLoad, setListingLoad] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [deleteListingError, setDeleteListingError] = useState(false);

  const dispatch = useDispatch();

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    console.log(formData)

    // image upload to firebase 
    uploadTask.on(
      "state_changed", 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      // incase of any error in file upload
      (error) => {
        setFileUploadError(true);
      },
      // callback func to get the image URL 
      // and add it to form data
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then(
          (downloadURL) => setFormData({...formData, avatar: downloadURL})
        )
      }
    )
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUSerStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE", 
      })
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      setListingLoad(true);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setListingLoad(false);
        setShowListingsError(true);
        return;
      }

      setListingLoad(false);
      setUserListings(data);
    } catch (error) {
      setListingLoad(false);
      setShowListingsError(error);
    }
  }

  const handleDeleteListing = async (_id) => {
    try {
      const res = await fetch(`/api/listing/delete/${_id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== _id))

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
      console.log(formData)
    }
  }, [file])

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input 
          hidden 
          type="file" 
          ref={fileRef} 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img 
          onClick={() => { fileRef?.current?.click() }} 
          src={formData?.avatar || currentUser?.avatar} 
          alt={'profile-image'} 
          className="rounded-full h-24 w-24 object-cover hover:cursor-pointer self-center mt-2" 
        />
        <p className="text-center text-sm">
          {
            fileUploadError 
            ? (<span className="text-red-700">Error Image upload (image must be less than 2 mb)</span>)
            : (filePerc > 0 && filePerc < 100 
              ? (
                <span className="text-slate-700">
                  {`Uploading ${filePerc}% `}
                </span>
              )
              : (filePerc === 100 
                ? (
                  <span className="text-green-700">
                    Image Successfully uploaded!
                  </span>
                  )
                : ""
              )
            )
          }
        </p>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="text"
          id="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80">
          {loading ? "Loading..." : "Update"}
        </button>
        <Link to={"/create-listing"} className="bg-slate-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95">
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer hover:underline">Delete Account</span>
        <span onClick={handleSignOut} className="text-white cursor-pointer hover:opacity-75 border border-red-500 p-1 rounded-lg bg-red-500">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? "User is updated successfully!" : ""}</p>
      <button className="text-green-700 w-full hover:text-white hover:bg-green-700 p-2 rounded-lg mt-5" onClick={handleShowListings}>
        { listingLoad ? "Loading..." : "Show Listings"}
      </button>
      <p className="text-red-700 mt-5">{showListingsError ? "Error showing listings" : ""}</p>

      {
        userListings && userListings.length > 0 && 
        <div className="">
          <h1 className="text-center my-7 text-2xl font-semibold underline">Your Listings</h1>
          <p className="text-red-500 space-x-4">{deleteListingError ? deleteListingError : ""}</p>
        {userListings.map((listing) => (
          <div key={listing._id}  className="flex items-center justify-between border rounded-lg p-3 gap-4 my-6">
            <Link to={`/listing/${listing._id}`}>
              <img 
                src={listing.imageUrls[0]} 
                alt="listing-image" 
                className="h-16 w-16 object-contain rounded-lg" />
            </Link>
            <Link to={`/listing/${listing._id}`} className="hover:underline text-slate-700 font-semibold flex-1 truncate">
              <p >{listing.title}</p>
            </Link>
            <div className="flex flex-col items-center">
              <button className="text-red-700 uppercase" onClick={() => handleDeleteListing(listing._id)}>Delete</button>
              <Link to={`/update-listing/${listing._id}`}>
                <button className="text-green-700 uppercase">Edit</button>
              </Link>
            </div>
          </div>
        ))}
        </div>
      }
    </div>
  )
}

export default Profile