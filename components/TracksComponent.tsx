import Link from "next/link";
import { motion } from "framer-motion";

import { fadeInAnimation } from "@/lib/utils";

import Image from "next/image";

const TracksComp = ({
  track,
  index,
  track1,
}: {
  track: any;
  index: number;
  track1: any;
}) => {
  return (
    <>
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
        <Link
          href={
            track
              ? track.external_urls.spotify
              : track1.track.external_urls.spotify
          }
          target="_blank"
        >
          <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
            <Image
              src={
                track
                  ? track.album.images[0].url
                  : track1.track.album.images[0].url
              }
              alt="currentTrack"
              height={220}
              width={220}
              className="rounded-lg object-cover "
            />
          </div>
        </Link>
        <div className="flex flex-col items-start w-full pt-4  gap-y-1">
          <p className="font-semibold truncate w-full">
            {track ? track.name : track1.track.name}
          </p>
          <p className="text-neutral-400 text-sm pb-4 w-full">
            {track ? track.artists[0].name : track1.track.artists[0].name}
          </p>
        </div>
        {/* <div className="absolute bottom-24 right-5">
                  <div className="transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 ">
                    <HiOutlineLink/>
                  </div>
                </div> */}
      </motion.div>
    </>
  );
};

export default TracksComp;
