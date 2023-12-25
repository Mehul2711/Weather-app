"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=dubai&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

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

  return (
    <div>
      <title>Weather-App</title>
      <main>
        <div></div>
        <button onClick={fetchWeather}>Fetch Data</button>
      </main>
    </div>
  );
}
