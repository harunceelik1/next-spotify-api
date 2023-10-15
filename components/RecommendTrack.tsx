import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fadeInAnimation } from "@/lib/utils";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Label } from "@radix-ui/react-context-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MdPlaylistAdd } from "react-icons/md";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToPlaylist, fetchWebApi } from "@/lib/services";

const RecommendTrack = (props: any) => {
  const { getPlayLists, getRecommendedTracks, recommendedTracks, trackId } =
    props;
  const [recommend, setRecommend] = useState<[]>([]);
  const [playlistId, setPlaylistId] = useState(""); // Çalma listesi kimliğini saklamak için durum
  const [playlistName, setPlaylistName] = useState(""); // Çalma listesi kimliğini saklamak için durum
  const [limit, setLimit] = useState("5");

  const [form, setForm] = useState({
    name: "",
    description: "",
    isPublic: false,
  });

  useEffect(() => {
    setRecommend(recommendedTracks);
    console.log("RECOMMEND", recommendedTracks);
  }, [recommendedTracks]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleRadioChange = (value: string) => {
    // console.log(value);
    setForm({
      ...form,
      isPublic: value === "true",
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    createPlaylist(form.name, form.description, form.isPublic);
    setForm({
      name: "",
      description: "",
      isPublic: false,
    });
  };

  const createPlaylist = async (
    name: string,
    description: string,
    isPublic: boolean
  ) => {
    try {
      const { id: user_id } = await fetchWebApi("v1/me", "GET", null);

      const playlist = await fetchWebApi(
        `v1/users/${user_id}/playlists`,
        "POST",
        {
          name: name,
          description: description,
          public: isPublic,
        }
      );
      setPlaylistId(playlist.id);
      setPlaylistName(playlist.name);
      if (playlist.type === "playlist") {
        toast.success(
          `${playlist.name}   playlist has been successfully created`
        );
      }
      getPlayLists();
    } catch (error) {}
  };
  const addTrackToast = (images: string) => {
    return (
      <div className="flex gap-2">
        {" "}
        <Image src={images} width={36} alt="src" height={36} />
        <p>
          Added to <span className="font-bold">{playlistName}</span> playlist
        </p>
      </div>
    );
  };

  const addTrackToPlaylist = async (
    playlistId: string,
    uri: string,
    images: string
  ) => {
    // console.log("playlıstiDD", playlistId);
    const data = playlistId ? playlistId : trackId;
    try {
      console.log(data);
      if (data === null) {
        toast.error("Please create a playlist");
      }
      await addToPlaylist(data, uri);
      toast.success(addTrackToast(images));
    } catch (error) {}
    getPlayLists();
  };

  const onLimitChanged = (value: string) => {
    setLimit(value);
    console.log("ONLİMİT CHANGED", value);
    getRecommendedTracks(null, value);
  };

  return (
    <section className="pt-24 w-full pb-12  ">
      <ToastContainer position="top-center" /> {/* Add this line */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col">
          <h1 className={" font-bold text-3xl"}>RECOMMEND TRACKS</h1>

          <div className="flex gap-x-4 p-2 items-center">
            <p className="opacity-50 text-sm sm:block hidden">
              {" "}
              Click to create a playlist:
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <div className="transition  cursor-pointer  rounded-full flex items-center dark:hover:bg-[#191919] hover:bg-[#191919]/10  p-2 drop-shadow-md translate  group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 ">
                  <FaPlus />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex gap-x-2">
                    <MdPlaylistAdd size={22} />
                    Creating Playlist
                  </DialogTitle>
                  <DialogDescription>
                    You can enter the title and description of your playlist.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Description</Label>
                      <Input
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <RadioGroup
                      value={form.isPublic.toString()}
                      onValueChange={handleRadioChange}
                      className="flex gap-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="true" value="false" />
                        <Label>Private</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="false" value="true" />
                        <Label>Public</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Playlist</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="  ">
          {" "}
          <Select onValueChange={onLimitChanged}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">Get 5 Tracks</SelectItem>
              <SelectItem value="10">Get 10 Tracks</SelectItem>
              <SelectItem value="15">Get 15 Tracks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
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
    </section>
  );
};

export default RecommendTrack;
