import { getPlaylist } from "@/services";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInAnimation } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const Playlist = () => {
  const [playlist, setPlaylist] = useState<[]>([]);
  const [loading, setLoading] = useState(false); // Ekledik

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlists = await getPlaylist();
        console.log("playlistsS", playlists);
        console.log("2.useffect Playlist", playlists.items);
        setPlaylist(playlists.items);
        setLoading(false);
      } catch (error) {
        console.error("Verileri alırken bir hata oluştu:", error);
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="mt-16 w-full">
      <h1 className="font-bold text-3xl uppercase">Playlist</h1>
      <div className="lg:grid-cols-5   md:grid-cols-4 sm:grid-cols-3 grid-cols-2  pt-8  gap-x-8  max-sm:gap-y-4 gap-y-4  grid">
        {playlist && playlist.length > 0 ? (
          playlist &&
          playlist.map((track: any, index) => (
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
                    src={track.images[0].url}
                    alt="currentTrack"
                    height={220}
                    width={220}
                    className="rounded-lg object-cover "
                  />
                </div>
              </Link>
              <div className="flex flex-col items-start w-full pt-4  gap-y-1">
                <p className="font-semibold truncate w-full">{track.name}</p>
              </div>
              {/* <div className="absolute bottom-24 right-5">
         <div className="transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 ">
           {isPlaying ? (
             <FaPause
               className="text-black"
               onClick={handlePauseClick}
             />
           ) : (
             <FaPlay className="text-black " onClick={handlePlayClick} />
           )}
         </div>
       </div> */}
            </motion.div>
          ))
        ) : (
          <Skeleton>
            <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
              <div className="relative aspect-square w-full h-full rounded-md overflow-hidden"></div>
              <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <div className="flex flex-col items-start w-full pt-4  gap-y-1">
                  <Skeleton className="font-semibold truncate dark:bg-neutral-500/5 bg-neutral-700/20 p-2 w-full text-start"></Skeleton>
                </div>
              </div>
            </div>
          </Skeleton>
        )}
      </div>
    </section>
  );
};

export default Playlist;
