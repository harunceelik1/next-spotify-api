export interface UserData {
  id: string;
  display_name: string;
  email: string;
  images: {
    url: string;
  }[];
}

export interface PlaylistData {
  id: string;
  name: string;
  images: { url: string }[];
  external_urls: { spotify: string };
}

interface TrackData {
  album: {
    // Albüm özelliklerini burada belirtin
  };
  artists: {
    name: string;
  }[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  id: string;
  name: string;
  type: string;
  track: {};
  external_urls: { spotify: string };
  images: { url: string }[];
}

export interface LastTrackData {
  played_at: string;
  track: TrackData;
}
