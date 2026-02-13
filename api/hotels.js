import axios from "axios";

export default async function handler(req, res) {
  try {
    const { cityCode, checkInDate, checkOutDate, adults, page = 1 } = req.query;

    // Step 1: Get OAuth Token
    const tokenResponse = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_CLIENT_ID,
        client_secret: process.env.AMADEUS_CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const accessToken = tokenResponse.data.access_token;

    // Step 2: Fetch Hotels

    // Get Hotels List
    const hotelListResponse = await axios.get(
      "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { cityCode: "PAR" }, // IATA city code
      },
    );

    // Hotel IDs extract karein (v3 API max 20 IDs accept karta hai)
    const hotelIds = hotelListResponse.data.data
      .map((hotel) => hotel.hotelId)
      .slice(0, 20)
      .join(",");

    const hotelResponse = await axios.get(
      "https://test.api.amadeus.com/v3/shopping/hotel-offers",
      // "https://test.api.amadeus.com//v1/reference-data/locations/hotels/by-city",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          hotelIds,
          cityCode,
          checkInDate,
          checkOutDate,
          adults,
          page,
        },
      },
    );

    const hotels = hotelResponse.data.data || [];


    // Normalize data
    const normalizedHotels = hotels.map((item) => ({
      id: item.hotel.hotelId,
      name: item.hotel.name,
      rating: item.hotel.rating || "N/A",
      city: item.hotel.address?.cityName || cityCode,
      price: item.offers?.[0]?.price?.total || "0",
    }));

    res.status(200).json({
      page,
      results: normalizedHotels,
    });
  } catch (error) {
    // console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
}
