import { getPlaylist } from "@/services";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInAnimation } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { MusicIcon } from "lucide-react";

const Playlist = (props: any) => {
  const { playlists } = props;
  const [currentPlaylist, setCurrentPlaylist] = useState<[]>(playlists);

  useEffect(() => {
    setCurrentPlaylist(playlists);
  }, [playlists]);

  const renderSkeleton = () => {
    return (
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
    );
  };

  const renderPlaylistItem = (track: any, index: number) => {
    return (
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
            {track.images[0]?.url.length > 0 ? (
              <Image
                src={track.images[0]?.url}
                alt=""
                height={220}
                width={220}
                className="rounded-lg object-cover "
              />
            ) : (
              <div className="  relative aspect-square w-full h-full rounded-md overflow-hidden ">
                <Image
                  src={"/icons/music.png"}
                  alt=""
                  height={220}
                  width={220}
                  className="rounded-lg object-cover  "
                />
              </div>
            )}
          </div>
        </Link>
        <div className="flex flex-col items-start w-full pt-4  gap-y-1">
          <p className="font-semibold truncate w-full">{track.name}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="mt-16 w-full">
      <h1 className="font-bold text-3xl uppercase">Playlist</h1>
      <div className="lg:grid-cols-5   md:grid-cols-4 sm:grid-cols-3 grid-cols-2  pt-8  gap-x-8  max-sm:gap-y-4 gap-y-4  grid">
        {currentPlaylist && currentPlaylist.length > 0
          ? currentPlaylist &&
            currentPlaylist.map((track: any, index) =>
              renderPlaylistItem(track, index)
            )
          : renderSkeleton()}
      </div>
    </section>
  );
};

export default Playlist;
