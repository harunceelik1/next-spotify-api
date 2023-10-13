import {
  getCurrentTrack,
  nextTrack,
  pauseTrack,
  playTrack,
  previousTrack,
  setVolumeApi,
} from "@/services";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "./ui/slider";
import { Volume2Icon } from "lucide-react";
import TrackBar from "./TrackBar";

const CurrentTrack = () => {
  const [current, setCurrent] = useState<any>({}); // initial state'i boş bir nesne olarak ayarlayın
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volumeUp, setVolumeUp] = useState<number>(0);

  const handlePauseClick = async () => {
    try {
      await pauseTrack();
      await fetchData();
      setIsPlaying(false);
    } catch (error) {
      console.error("Şarkıyı duraklatma hatası:", error);
    }
  };
  const handlePlayClick = async () => {
    try {
      await playTrack();
      await fetchData();
      setIsPlaying(true);
    } catch (error) {
      console.error("Şarkıyı oynatma hatası:", error);
    }
  };
  const handlePlus = () => {
    if (volume < 100) {
      setVolumeUp(volumeUp + 10);
    }
  };
  const fetchData = () => {
    console.log("CURRENT1", current);

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
  const [volume, setVolume] = useState<number>(33); // Varsayılan ses seviyesi

  const handleChange = (e: number[]) => {
    setVolumeApi(e);
  };
  useEffect(() => {
    const hash = window.location.hash;
    window.location.hash = "";
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
      await fetchData();
    } catch (error) {}
  };
  const handlePreviousClick = async () => {
    try {
      await previousTrack();
      await fetchData();
    } catch (error) {}
  };
  const renderCurrentTrack = () => {
    return (
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
            <p className="font-semibold truncate w-full">{current.name}</p>
          </div>
          <p className="text-neutral-400 text-sm pb-4 w-full">
            {current.artists[0].name}
          </p>
        </div>
      </div>
    );
  };
  const renderSkeleton = () => {
    return (
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
    );
  };
  return (
    <section className="mt-4 w-full">
      <div className="flex items-center justify-center flex-col ">
        {isPlaying
          ? current &&
            current.album &&
            current.album.images &&
            current.album.images.length > 0 &&
            renderCurrentTrack()
          : renderSkeleton()}
        <TrackBar
          handlePreviousClick={handlePreviousClick}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          handleNextClick={handleNextClick}
          isPlaying={isPlaying}
        />
        {/* <div className="w-[220px] mt-10   flex gap-x-2 ">
          <Volume2Icon onClick={handlePlus} />

          <Slider
            defaultValue={[volume]}
            max={100}
            step={1}
            onValueChange={handleChange}
          />
        </div> */}
      </div>
    </section>
  );
};

export default CurrentTrack;
