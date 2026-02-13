import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useHotels } from "../context/HotelContext";
import PriceChart from "../components/PriceChart";

const Dashboard = () => {
  const { signOut } = useAuth();
  const { hotels, loading, error, fetchHotels, page } = useHotels();
  const [sortOrder, setSortOrder] = useState("");

  const sortedHotels = [...hotels].sort((a, b) => {
    if (sortOrder === "low") return a.price - b.price;
    if (sortOrder === "high") return b.price - a.price;
    return 0;
  });

  const [filters, setFilters] = useState({
    cityCode: "",
    checkInDate: "",
    checkOutDate: "",
    adults: 1,
  });


  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const debouncedFetch = useCallback(
    debounce((filters) => {
      fetchHotels(filters);
    }, 200),
    [],
  );

  const handleSearch = (e) => {
    e.preventDefault();
    debouncedFetch(filters);
  };

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || [],
  );

  const toggleFavorite = (hotel) => {
    let updated;
    if (favorites.find((fav) => fav.id === hotel.id)) {
      updated = favorites.filter((fav) => fav.id !== hotel.id);
    } else {
      updated = [...favorites, hotel];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hotel Search</h1>
        <button
          onClick={signOut}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <input
          type="text"
          name="cityCode"
          placeholder="City Code (NYC)"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="checkInDate"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="checkOutDate"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="adults"
          min="1"
          className="border p-2 rounded"
          onChange={handleChange}
          defaultValue={1}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded col-span-1 md:col-span-4"
        >
          Search Hotels
        </button>
      </form>

      {/* Loading */}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 border rounded shadow animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-3"></div>
              <div className="h-3 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded"></div>
              
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Results */}
      {sortedHotels.length > 0 &&
      <div className="mb-4 mt-4">
        <select
          className="border p-2 rounded"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>
      }
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {sortedHotels.length > 0 && <PriceChart hotels={sortedHotels} />}
        {!loading && sortedHotels.length === 0 && (
          <p className="col-span-full text-center text-gray-500 mt-10 py-8">
            No hotels found. Try searching with different filters.
          </p>
        )}

        {sortedHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg">{hotel.name}</h2>
            <p>City: {hotel.city}</p>
            <p>Rating: {hotel.rating}</p>
            <p className="font-bold text-blue-600">${hotel.price}</p>

            <button
              onClick={() => toggleFavorite(hotel)}
              // className="mt-2 text-sm text-blue-600"
              className="mt-2 transition-all duration-300 transform hover:scale-110 focus:outline-none"
              aria-label={
                favorites.find((fav) => fav.id === hotel.id)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              {favorites.find((fav) => fav.id === hotel.id) ? (
                <Heart className="w-6 h-6 text-red-500 fill-current" />
              ) : (
                <Heart className="w-6 h-6 text-gray-400 hover:text-red-400" />
              )}
            </button>
          </div>

          
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {[1, 2, 3].map((p) => (
          <button
            key={p}
            onClick={() => fetchHotels(filters, p)}
            className={`px-4 py-2 rounded ${
              page === p ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
