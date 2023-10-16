import { useEffect, useState } from "react";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInAnimation } from "@/lib/utils";
import TracksComp from "./TracksComponent";

const LastTracks = (props: any) => {
  const { lastTracks, getLastTracks } = props;

  const [currentLastTracks, setCurrentLastTracks] = useState<any[]>([]);
  const [limit, setLimit] = useState("5"); // Varsayılan limit değeri

  useEffect(() => {
    console.log("LASTCOMPONENT", lastTracks);
    setCurrentLastTracks(lastTracks);
  }, [lastTracks]);

  useEffect(() => {
    getLastTracks(limit);
  }, [limit]);

  const fetchLastTracksPeriodically = () => {
    getLastTracks(limit);
  };

  // Set up an interval to fetch last tracks every X milliseconds
  useEffect(() => {
    const intervalId = setInterval(fetchLastTracksPeriodically, 60000); // Fetch every 60 seconds (adjust the time as needed)

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [limit]);

  return (
    <section className="pt-24 w-full">
      <div className="flex justify-between items-center gap-6 ">
        <div className="flex flex-col">
          <h1 className={" font-bold text-3xl"}>LAST TRACKS</h1>
          <p className="opacity-50 text-sm sm:block hidden">
            {" "}
            Here are the last {limit} songs you listened to:
          </p>
        </div>
        <div className="  ">
          {" "}
          <Select onValueChange={(value) => setLimit(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">Get 5 Tracks</SelectItem>
              <SelectItem value="10">Get 10 Tracks</SelectItem>
              <SelectItem value="15">Get 15 Tracks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="lg:grid-cols-5 pt-8 gap-y-4 gap-x-8 sm:grid-cols-3 md:grid-cols-4  grid-cols-2 max-sm:gap-y-4  grid  ">
        {currentLastTracks &&
          currentLastTracks.map((t: any, index) => (
            <TracksComp track={""} index={index} track1={t} />
          ))}
      </div>
    </section>
  );
};

export default LastTracks;
