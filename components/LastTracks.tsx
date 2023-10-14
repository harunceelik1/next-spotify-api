import { useEffect, useState } from "react";
import { getLastTracksApi } from "@/services";
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
    const intervalId = setInterval(fetchLastTracksPeriodically, 30000); // Fetch every 60 seconds (adjust the time as needed)

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
              key={index}
              className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10  p-3"
            >
              <Link href={t.track.external_urls.spotify} target="_blank">
                <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                  <Image
                    src={t.track.album.images[0].url}
                    alt="currentTrack"
                    height={220}
                    width={220}
                    className="rounded-lg object-cover "
                  />
                </div>
              </Link>
              <div className="flex flex-col items-start w-full pt-4  gap-y-1">
                <p className="font-semibold truncate w-full">{t.track.name}</p>
                <p className="text-neutral-400 text-sm pb-4 w-full">
                  {t.track.artists[0].name}
                </p>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default LastTracks;

{
  /* <motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="p-4 px-2 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10"
>
<div
  onMouseMove={handleMouseMove}
  className=" overflow-hidden  relative border rounded-xl     hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400 border-transparent border-zinc-600 transition-all duration-1000"
>
  <motion.div
    className="rounded-xl pointer-events-none absolute -inset-px  opacity-80 transition duration-1000 group-hover:opacity-50 "
    style={{
      background: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px,rgb(244 244 245 / 0.10),transparent 80%  )`,
    }}
  />
  <article className=" relative w-full h-full p-4 md:p-8  ">
    <div className="flex items-center justify-between gap-2 ">
      <div className="text-zinc-600 dark:text-zinc-100">Time</div>
      <span className="flex  items-center gap-1 text-xs text-zinc-600 dark:text-zinc-100 ">
        {/* <AiOutlineEye className={" text-xl "} />
        <p className="text-zinc-400">{date}</p> */
}
//         {lastTracks.map((t: any) => (
//           <div key={t.id} className="relative ">
//             <div className=" ">
//               <Image
//                 src={t.track.album.images[0].url}
//                 height={120}
//                 width={120}
//                 className="shadow hover:w-[160px] hover:h-[160px] transition "
//                 alt="img"
//               />
//               <p className="text-center text-xl font-bold">
//                 {t.track.name}
//               </p>
//             </div>
//           </div>
//         ))}
//       </span>
//     </div>
//   </article>
// </div>
// </motion.div>
