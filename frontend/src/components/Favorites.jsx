import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Favorites() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/favorites");
        if (response.data.status === 200) {
          setCities(response.data.favorites.map((fav) => fav.city));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    };

    fetchFavorites();
  }, []);

  // for remove th city form fav
  const removeFavorite = async (city) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/favorites/remove",
        { city }
      );
      console.log(response.data.favorite.city);
      if (response.data.status === 200) {
        console.log(cities);
        setCities(cities.filter((fav) => fav !== response.data.favorite.city));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-700">
      <ToastContainer />
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-4xl font-bold  text-white text-center mb-4">
          My Favorite Cities
        </h1>

        <div className="flex flex-wrap lg:w-3/4 w-full sm:mx-auto sm:mb-2 -mx-2 ">
          {cities.length === 0 ? (
            <p className="text-center w-full  text-white text-lg">
              No Favorite Cities Found...
            </p>
          ) : (
            cities.map((city, index) => (
              <div className="p-2 w-full lg:w-1/2 md:w-1/2" key={index}>
                <div className="bg-gray-800 rounded flex p-4 h-full items-center justify-start gap-5 shadow">
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-lg text-white">{city}</span>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                      onClick={() => removeFavorite(city)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Favorites;
