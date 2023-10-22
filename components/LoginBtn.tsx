import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const LoginBtn = () => {
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URI = "https://nextspotify-api.vercel.app/";
  const SCOPE =
    " user-modify-playback-state  playlist-modify-public playlist-modify-private user-modify-playback-state user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-read-playback-state user-read-currently-playing"; // İhtiyaca göre kapsamı ayarlayın
  return (
    <div className="items-center mx-auto flex h-full justify-center flex-col gap-8  ">
      <div className=" items-center flex justify-center flex-col gap-y-24 sm:gap-y-12">
        <Image
          src={"/icons/logo-black.png"}
          alt="logoblack"
          width={480}
          height={480}
        />
        <p className="w-1/2 text-center  font-semibold sm:block hidden">
          The purpose of this application is to provide information about your
          recently listened songs, your most-played tracks in recent times, and
          the song you are currently listening to. Click to log in.
        </p>
        <Link
          href={`${AUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=token`}
        >
          <Button variant="outline" className="text-sm w-[250px] rounded-lg">
            LOGIN
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginBtn;
