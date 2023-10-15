import {
  avaliableDevice,
  getCurrentTrack,
  nextTrack,
  pauseTrack,
  playTrack,
  previousTrack,
  setVolumeApi,
} from "@/lib/services";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Monitor, Smartphone, SpeakerIcon, Volume2Icon } from "lucide-react";
import TrackBar from "./TrackBar";
import { AiOutlineDisconnect } from "react-icons/ai";
const CurrentTrack = () => {
  const [current, setCurrent] = useState<any>({}); // initial state'i boş bir nesne olarak ayarlayın
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [device, setDevice] = useState<string>("");
  const [app, setApp] = useState<boolean>(false);
  const [episode, setEpisode] = useState<string>("");

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

  const fetchData = () => {
    avaliableDevice()
      .then((data: any) => {
        // console.log("avaliable", data.devices[0].type);
        setDevice(data.devices[0].type);
      })
      .catch((error) => {
        console.error(
          "API isteği sırasında hata oluştu:(avaliableDevice)",
          error
        );
      });

    getCurrentTrack()
      .then((data: any) => {
        setCurrent(data.item);
        console.log("CURRENTAPİ", data.item);
        setEpisode(data.currently_playing_type);
        setIsPlaying(data.is_playing);
        setApp(false);
      })
      .catch((error) => {
        console.error(
          "API isteği sırasında hata oluştu:(getCurrenTrack)",
          error
        );
        setApp(true);
      });
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
  const renderDeviceIcon = () => {
    if (device === "Smartphone") {
      return <Smartphone />;
    } else if (device === "Computer") {
      return <Monitor />;
    } else {
      return <SpeakerIcon />;
    }
  };
  const renderCurrentTrack = () => {
    return app ? (
      <div>
        <p className="uppercase gap-2 h-[220px] animate-pulse flex justify-center w-[220px] text-center items-center">
          <AiOutlineDisconnect size={24} className="" />
          Device not found
        </p>
      </div>
    ) : (
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
          <p className="flex justify-between w-full text-neutral-400 text-sm truncate ">
            {current.artists[0].name}
          </p>
          <div className="flex items-center justify-end w-full">
            {renderDeviceIcon()}
          </div>
        </div>
      </div>
    );
  };
  const renderSkeleton = () => {
    return app ? (
      <div>
        <p className="uppercase h-[220px] gap-2 animate-pulse flex justify-center w-[220px] text-center items-center">
          <AiOutlineDisconnect size={24} />
          Device not found
        </p>
      </div>
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
