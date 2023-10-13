import React from "react";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { FaPause, FaPlay } from "react-icons/fa";

interface TrackBarProps {
  handlePreviousClick: () => void;
  handlePauseClick: () => void;
  handlePlayClick: () => void;
  handleNextClick: () => void;
  isPlaying: boolean;
}

const TrackBar: React.FC<TrackBarProps> = ({
  handlePreviousClick,
  handlePauseClick,
  handlePlayClick,
  handleNextClick,
  isPlaying,
}) => {
  return (
    <div className="flex gap-x-6">
      <div className="transition   flex items-center  drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
        <BiSkipPrevious
          onClick={handlePreviousClick}
          className="cursor-pointer"
          size={32}
        />
      </div>
      <div className=" ">
        {isPlaying ? (
          <div
            className="transition rounded-full cursor-pointer flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
            onClick={handlePauseClick}
          >
            <FaPause className="text-black cursor-pointer " />
          </div>
        ) : (
          <div
            className="transition rounded-full cursor-pointer flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
            onClick={handlePlayClick}
          >
            <FaPlay className="text-black cursor-pointer" />
          </div>
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
  );
};

export default TrackBar;
