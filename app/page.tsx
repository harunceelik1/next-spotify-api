"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getUserData } from "@/services";
import LastTracks from "@/components/LastTracks";
import TopTracks from "@/components/TopTrack";
import CurrentTrack from "@/components/CurrentTrack";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import Playlist from "@/components/Playlist";
import RecommendTrack from "@/components/RecommendTrack";

export default function Home() {
  const [token, setToken] = useState<string | null>(""); // Başlangıç değeri olarak null verildi
  const [userData, setUserData] = useState<any>(null); // Kullanıcı bilgilerini saklamak için bir state

  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = "7d6ceec2821d4bfd934dde5f047a6546";
  const REDIRECT_URI = "http://localhost:3000"; // Spotify Developer Dashboard'da ayarladığınız geri yönlendirme URI
  const SCOPE =
    "playlist-modify-public playlist-modify-private user-modify-playback-state user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-read-playback-state user-read-currently-playing"; // İhtiyaca göre kapsamı ayarlayın

  // const apiUrl = "https://api.spotify.com/v1/me";

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
  }, []);

  useEffect(() => {
    if (token) {
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

  return (
    <>
      {token ? (
        <div className="fixed top-5 right-5">
          <Button variant="outline" size="icon" onClick={logout}>
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        ""
      )}
      <section className="px-20  md:px-20 py-24">
        {token ? (
          <>
            <div className="flex flex-col h-[250px] gap-4 items-center">
              {userData ? (
                <>
                  <h2 className="text-6xl font-semibold  ">
                    HELLO <span className="">{userData.display_name}</span>
                  </h2>
                  <p className="opacity-50">The currently playing song</p>
                  {/* <p>E-posta: {userData.email}</p> */}
                  {/* <Image
                      src={userData.images[0].url}
                      alt="profile"
                      width={54}
                      height={54}
                    /> */}

                  <CurrentTrack />
                  <LastTracks />
                  {/* <div className="w-full h-[0.5px] bg-gray-600 mt-8"></div> */}
                  <TopTracks />

                  <Playlist />
                  <RecommendTrack />
                </>
              ) : (
                "Kullanıcı bilgileri yükleniyor..."
              )}
            </div>
          </>
        ) : (
          <>
            <div className="items-center flex justify-center flex-col gap-8  ">
              <div className="p-4 items-center flex justify-center flex-col gap-y-6">
                <Image
                  src={"/icons/logo-black.png"}
                  alt="logoblack"
                  width={180}
                  height={180}
                />
                <p className="w-1/2 text-center text-white font-semibold">
                  The purpose of this application is to provide information
                  about your recently listened songs, your most-played tracks in
                  recent times, and the song you are currently listening to.
                  Click to log in.
                </p>
                <Link
                  href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=token`}
                >
                  <Button variant="outline" className="text-sm">
                    LOGIN
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
