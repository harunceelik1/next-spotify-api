import { getTopTracks } from "@/lib/services";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineLink } from "react-icons/hi";
import { fadeInAnimation } from "@/lib/utils";
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
            <motion.div
              whileHover={{ scale: 1.1, originX: 0 }}
              transition={{ type: "tween", stiffness: 200 }}
              variants={fadeInAnimation}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              custom={index}
              key={track.id}
              className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10  p-3"
            >
              <Link href={track.external_urls.spotify} target="_blank">
                <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                  <Image
                    src={track.album.images[0].url}
                    alt="currentTrack"
                    height={220}
                    width={220}
                    className="rounded-lg object-cover "
                  />
                </div>
              </Link>
              <div className="flex flex-col items-start w-full pt-4  gap-y-1">
                <p className="font-semibold truncate w-full">{track.name}</p>
                <p className="text-neutral-400 text-sm pb-4 w-full">
                  {track.artists[0].name}
                </p>
              </div>
              {/* <div className="absolute bottom-24 right-5">
                  <div className="transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 ">
                    <HiOutlineLink/>
                  </div>
                </div> */}
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default TopTracks;
