import React, { useState, useCallback } from "react";
import SearchProperties from "./SearchProperties";
import { useRouter } from "next/router";

const Banner = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dataa, setData] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [guest, setguest] = useState(1);
  const [state, setState] = useState("");

  const image = [
    {
      id: 1,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/bannerPage.png`,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      checkIn: value?.checkIn,
      checkOut: value?.checkOut,
    }));
  };

  const handleSubmit = useCallback(async () => {
    try {
        setLoading(true);
        const checkIn = dataa?.checkIn;
        const checkOut = dataa?.checkOut;
        const bookingData = { state, checkIn, checkOut, guest }; // Use the `guest` state directly
        localStorage.setItem("bookingdata", JSON.stringify(bookingData));

        // Push the route right after setting localStorage
        router.push("/search");

        console.log("Navigation to /search initiated");
      
    } catch (error) {
      console.log("error", error);
    }
  }, [state, dataa, guest, setState, router]);

  return (
    <section className="h-full w-full relative z-10">
      <div className="w-full sm:pt-12 pt-5 md:pb-14 pb-8">
        <div className="container relative">
          <h1 className="text-center lg:text-4xl md:text-3xl text-2xl font-extrabold mb-0">
            "Experience <span className="text-primary-blue">Hostels</span> Like
            Never Before"
          </h1>
        </div>
      </div>
      <SearchProperties
        setState={setState}
        dataa={dataa}
        guest={guest}
        loading={loading}
        setguest={setguest}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        size="large"
      />
    </section>
  );
};

export default Banner;
