// RecommendedTracksList.js
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInAnimation } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Track } from "@/lib/model";

function RecommendedTracksList({
  recommend,
  addTrackToPlaylist,
  playlistId,
}: {
  recommend: Track[];
  addTrackToPlaylist: (playlistId: string, uri: string, images: string) => void;
  playlistId: string;
}) {
  return (
    <div className="lg:grid-cols-5   md:grid-cols-4 sm:grid-cols-3 grid-cols-2  pt-8  gap-x-8  max-sm:gap-y-4 gap-y-4  grid">
      {recommend &&
        recommend.map((track: any, index) => (
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
                  alt=""
                  height={220}
                  width={220}
                  className="rounded-lg object-cover "
                />
              </div>
            </Link>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
              <div style={{ maxWidth: "220px" }}>
                <p className="font-semibold truncate w-full">{track.name}</p>
              </div>
              <p className="text-neutral-400 text-sm pb-4 w-full">
                {track.artists[0].name}
              </p>
            </div>
            <div className="absolute bottom-24 right-5">
              <div className="transition opacity-0 rounded-full flex items-center bg-green-400 p-3 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 ">
                <Plus
                  className="text-black"
                  onClick={() =>
                    addTrackToPlaylist(
                      playlistId,
                      track.uri,
                      track.album.images[0].url
                    )
                  }
                />
              </div>
            </div>
          </motion.div>
        ))}
    </div>
  );
}

export default RecommendedTracksList;
