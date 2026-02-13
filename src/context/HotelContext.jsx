import { createContext, useContext, useState } from "react";
import axios from "axios";

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const fetchHotels = async (filters, pageNumber = 1) => {
    try {
      setLoading(true);
      setError(null);
      setHotels([]);

    const queryParams = new URLSearchParams({
      ...filters,
      page: pageNumber,
    }).toString();

      const response = await axios.get(`/api/hotels?${queryParams}`);

      setHotels(response.data.results);
      setPage(pageNumber)

    } catch (err) {
      setError("Failed to fetch hotels");
    //   console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HotelContext.Provider
      value={{ hotels, loading, error, fetchHotels }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotels = () => useContext(HotelContext);
