import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const PriceChart = ({ hotels }) => {
  const data = {
    // labels: hotels.map((hotel) => hotel.name),
    labels: hotels.map((hotel) =>
  hotel.name.length > 15
    ? hotel.name.slice(0, 15) + "..."
    : hotel.name
),

    datasets: [
      {
        label: "Hotel Prices ($)",
        data: hotels.map((hotel) => Number(hotel.price)),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Price Comparison
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PriceChart;
