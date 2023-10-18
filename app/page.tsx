"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LastTracks from "@/components/LastTracks";
import TopTracks from "@/components/TopTrack";
import CurrentTrack from "@/components/CurrentTrack";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import Playlist from "@/components/Playlist";
import RecommendTrack from "@/components/RecommendTrack";
import { BiLogoSpotify } from "react-icons/bi";
import { motion } from "framer-motion";
import {
  Item,
  LastTrackItem,
  PlaylistData,
  Track,
  UserData,
} from "@/lib/model";
import {
  getLastTracksApi,
  getPlaylist,
  getRecommendTracksApi,
  getUserData,
} from "@/lib/services";
import LoginBtn from "@/components/LoginBtn";

export default function Home() {
  const [token, setToken] = useState<string | null>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [lastPlayedTracks, setLastPlayedTracks] = useState<LastTrackItem[]>([]);
  const [trackId, setTrackId] = useState<string>("");
  const router = useRouter();

  const [playlists, setPlaylists] = useState<Item[]>([]);
  const [recommendedTracks, setRecommendedTracks] = useState<Track[]>([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";

    if (!token && hash) {
      const tokenFromHash = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", tokenFromHash);
      setToken(tokenFromHash);
    } else if (token) {
      setToken(token);
    }
    getPlayLists();
  }, []);

  useEffect(() => {
    if (token) {
      router.push("/");
      try {
        getUserData().then((response: any) => {
          setUserData(response);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [token]);

  const logout = () => {
    setToken("");
    window.location.hash = "";
    setUserData(null); // Kullanıcı bilgilerini temizle

    window.localStorage.removeItem("token");
  };

  const getPlayLists = async (): Promise<void> => {
    try {
      const resp = await getPlaylist();

      // resp.items[0].

      // console.log("playlistresp", resp.items[0].id);
      setTrackId(resp.items[0].id);
      setPlaylists(resp.items);
    } catch (e) {
      console.error("Verileri alırken bir hata oluştu (getPlaylist):", e);
    }
  };

  const getLastTrack = async (limit: number = 5): Promise<void> => {
    try {
      const resp = await getLastTracksApi(limit);
      setLastPlayedTracks(resp.items);
      getRecommendedTracks(resp.items);
    } catch (e) {
      console.error(
        "Verileri alırken bir hata oluştu (setLastPlayedTracks):",
        e
      );
    }
  };

  const getRecommendedTracks = async (
    items: any,
    limit: number = 5
  ): Promise<void> => {
    try {
      const topTracks = items ? items : lastPlayedTracks;
      const topFifthTracks = topTracks.slice(0, 5);
      const topTrackIds = topFifthTracks.map((item: any) => item.track.id);

      const resp = await getRecommendTracksApi(limit, topTrackIds);
      setRecommendedTracks(resp.tracks);
    } catch (e) {
      console.error(
        "Verileri alırken bir hata oluştu (setLastPlayedTracks):",
        e
      );
    }
  };

  return (
    <>
      <section className="px-20  md:px-20 py-24 h-screen">
        {token ? (
          <>
            <div className="fixed top-5 right-5">
              <Button variant="outline" size="icon" onClick={logout}>
                <XIcon className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col   h-[250px] gap-4 items-center">
              {userData ? (
                <>
                  <motion.div>
                    <BiLogoSpotify size={120} />
                  </motion.div>

                  <div className="flex flex-col gap-6">
                    <h2 className="text-6xl font-bold text-center ">
                      Welcome to Spotify Api
                    </h2>
                    <p className="text-6xl font-semibold text-center uppercase">
                      {userData.display_name}
                    </p>
                  </div>
                  <p className="opacity-50">The currently playing song</p>
                  {/* <p>E-posta: {userData.email}</p> */}
                  {/* <Image
                    src={userData.images[0].url}
                    alt="profile"
                    width={54}
                    height={54}
                    className="rounded-full object-cover"
                  /> */}

                  <CurrentTrack />
                  <LastTracks
                    lastTracks={lastPlayedTracks}
                    getLastTracks={getLastTrack}
                  />
                  {/* <div className="w-full h-[0.5px] bg-gray-600 mt-8"></div> */}
                  <TopTracks />
                  <Playlist playlists={playlists} />
                  <RecommendTrack
                    recommendedTracks={recommendedTracks}
                    getRecommendedTracks={getRecommendedTracks}
                    trackId={trackId}
                    getPlayLists={getPlayLists}
                  />
                </>
              ) : (
                "Kullanıcı bilgileri yükleniyor..."
              )}
            </div>
          </>
        ) : (
          <>
            <LoginBtn />
          </>
        )}
      </section>
    </>
  );
}
