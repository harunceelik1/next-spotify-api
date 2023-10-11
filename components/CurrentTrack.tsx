import {
  getCurrentTrack,
  nextTrack,
  pauseTrack,
  playTrack,
  previousTrack,
} from "@/services";
import Image from "next/image";
import { cn } from "@/lib/utils";

import React, { useEffect, useState } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import styles from "./styles.module.css";
import { Skeleton } from "@/components/ui/skeleton";

const CurrentTrack = () => {
  const [current, setCurrent] = useState<any>({}); // initial state'i boş bir nesne olarak ayarlayın
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePauseClick = async () => {
    try {
      await pauseTrack();
      setIsPlaying(false);
    } catch (error) {
      setIsPlaying(false);

      console.error("Şarkıyı duraklatma hatası:", error);
    }
  };
  const handlePlayClick = async () => {
    try {
      await playTrack();
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(true);

      console.error("Şarkıyı oynatma hatası:", error);
    }
  };
  const fetchData = () => {
    // console.log("CURRENT1", current);

    // Eğer "current" boşsa isteği yap
    getCurrentTrack()
      .then((data: any) => {
        setCurrent(data.item);
        setIsPlaying(data.is_playing);
      })
      .catch((error) => {
        console.error("API isteği sırasında hata oluştu:", error);
      });
    // console.log("CURRENT2S", current);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const handleNextClick = async () => {
    try {
      await nextTrack();
    } catch (error) {}
  };
  const handlePreviousClick = async () => {
    try {
      await previousTrack();
    } catch (error) {}
  };
  return (
    <section className="mt-4 w-full">
      <div className="flex items-center justify-center flex-col ">
        {isPlaying ? (
          current &&
          current.album &&
          current.album.images &&
          current.album.images.length > 0 && (
            <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
              <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image
                  src={current.album.images[0].url}
                  alt="currentTrack"
                  height={220}
                  width={220}
                  className="rounded-lg object-cover "
                />
              </div>
              <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <div style={{ maxWidth: "220px" }}>
                  <p className="font-semibold truncate w-full">
                    {current.name}
                  </p>
                </div>
                <p className="text-neutral-400 text-sm pb-4 w-full">
                  {current.artists[0].name}
                </p>
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
            </div>
          )
        ) : (
          <Skeleton>
            <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
              <div className="relative aspect-square w-full h-full rounded-md overflow-hidden"></div>
              <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <div style={{ maxWidth: "220px" }}>
                  <Skeleton className="w-[220px] pb-4 bg-neutral-500/5"></Skeleton>
                </div>
                <Skeleton className="w-[220px] pb-4 bg-neutral-500/5 mt-2"></Skeleton>
              </div>
            </div>
          </Skeleton>
        )}
        <div className="flex gap-x-6">
          <div className="transition   flex items-center  drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
            <BiSkipPrevious
              onClick={handlePreviousClick}
              className="cursor-pointer"
              size={32}
            />
          </div>
          <div className="transition rounded-full cursor-pointer flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 ">
            {isPlaying ? (
              <FaPause
                className="text-black cursor-pointer"
                onClick={handlePauseClick}
              />
            ) : (
              <FaPlay
                className="text-black cursor-pointer"
                onClick={handlePlayClick}
              />
            )}
          </div>
          <div className="transition   flex items-center  drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
            <BiSkipNext
              onClick={handleNextClick}
              className="cursor-pointer"
              size={32}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentTrack;
