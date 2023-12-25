"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Weather from "@/components/weather";
import Loader from "@/components/loader";
import Cloudy from "../public/cloudy.png";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
  console.log(city);

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
        setLoading(false);
        console.log("Weather data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });
    setCity("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  } else {
    return (
      <div>
        <title>Weather-App</title>
        <main>
          <div className="flex flex-col justify-center sm:absolute top-0 left-20">
            <div className="flex justify-center">
              {" "}
              <Image src={Cloudy} height={100} width={150} className="" />
            </div>

            <div className="flex justify-center text-2xl ">Weather App</div>
          </div>

          <div className="flex justify-center mt-20 ">
            <div className=" relative flex justify-center sm:justify-between items-center w-full z-10 max-w-[300px] p-2  border-2 border-gray-300 rounded-xl">
              <form
                className="flex justify-between items-center m-auto w-full"
                onSubmit={fetchWeather}
              >
                <input
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  className=" bg-transparent border-none outline-none text-xl w-full placeholder-gray-200 text-white"
                  placeholder="Search City"
                />

                <div>
                  {" "}
                  <button
                    onClick={fetchWeather}
                    className="text-xl flex items-center text-gray-200"
                  >
                    <FaSearch />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="">{weather.main && <Weather data={weather} />}</div>
        </main>
      </div>
    );
  }
}
