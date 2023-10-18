import { getTopTracks } from "@/lib/services";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import TracksComp from "./TracksComponent";
const TopTracks = () => {
  const [topTracks, setTopTracks] = useState<[]>([]);
  const [limit, setLimit] = useState("5"); // Varsayılan limit değeri

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topTrack = await getTopTracks(limit);
        console.log("TOPTRACK", topTrack.items);
        setTopTracks(topTrack.items);
      } catch (error) {
        console.error("Verileri alırken bir hata oluştu:", error);
      }
    };
    fetchData();
  }, [limit]);
  return (
    <section className="mt-16 w-full">
      <div className="flex justify-between items-center gap-8 ">
        <div className="flex flex-col ">
          <h1 className="font-bold text-3xl">TOP TRACKS</h1>
          <p className="opacity-50 text-sm  sm:block hidden">
            {" "}
            This is the your top {limit} tracks from the last 30 days
          </p>
        </div>
        <div className="">
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

      <div className="lg:grid-cols-5   md:grid-cols-4 sm:grid-cols-3 grid-cols-2   pt-8  gap-x-8  max-sm:gap-y-4 gap-y-4 grid ">
        {topTracks &&
          topTracks.map((track: any, index) => (
            <TracksComp track={track} index={index} />
          ))}
      </div>
    </section>
  );
};

export default TopTracks;
