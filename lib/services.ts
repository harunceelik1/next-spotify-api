// api.js
// const token = window.localStorage.getItem("token");

import { PlaylistData, UserData, LastTrackData } from "./module";

export async function fetchWebApi(endpoint: string, method: string, body: any) {
  try {
    const response = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      method,
      body: body ? JSON.stringify(body) : null,
    });

    // HTTP durum kodunu kontrol et
    if (response.status === 404) {
      console.error("404 Hatası: Sayfa bulunamadı.");
      return;
    }

    if (response.status === 204) {
      console.error("204 Hatası: No Content.");
      return;
    }

    return response.json();
  } catch (error) {
    console.error("fetchWebApi Hatası:", error);
    throw error;
  }
}
const getToken = () => {
  return window.localStorage.getItem("token");
};

export const avaliableDevice = async () => {
  return await fetchWebApi("v1/me/player/devices", "GET", null);
};

export const getUserData = async (): Promise<UserData> => {
  return await fetchWebApi("v1/me", "GET", null);
};

export const getTopTracks = async (limit: string) => {
  return await fetchWebApi(
    `v1/me/top/tracks?time_range=short_term&limit=${limit}`,
    "GET",
    null
  );
};

export const getCurrentTrack = async () => {
  return fetchWebApi("v1/me/player/currently-playing", "GET", null);
};
export const nextTrack = async () => {
  return fetchWebApi(`v1/me/player/next`, "POST", null);
};
export const previousTrack = async () => {
  return fetchWebApi(`v1/me/player/previous`, "POST", null);
};

export const pauseTrack = async () => {
  return await fetchWebApi(`v1/me/player/pause`, "PUT", null);
};
export const playTrack = async () => {
  return await fetchWebApi(`v1/me/player/play`, "PUT", null);
};

export const getPlaylist = async (): Promise<{ items: PlaylistData[] }> => {
  return await fetchWebApi("v1/me/playlists", "GET", null);
};

export const getLastTracksApi = async (
  limit: number
): Promise<{ items: LastTrackData[] }> => {
  return await fetchWebApi(
    `v1/me/player/recently-played?limit=${limit}`,
    "GET",
    null
  );
};

export const getRecommendTracksApi = async (
  limit: number,
  topTracksIds: []
) => {
  return await fetchWebApi(
    `v1/recommendations?limit=${limit}&seed_tracks=${topTracksIds.join(",")}`,
    "GET",
    null
  );
};

export async function addToPlaylist(playlistId: string, trackUri: string) {
  try {
    await fetchWebApi(
      `v1/playlists/${playlistId}/tracks?uris=${trackUri}`,
      "POST",
      null
    );
  } catch (error) {
    console.error("Şarkı eklenirken hata oluştu.", error);
    throw error;
  }
}
export async function setVolumeApi(percent: number) {
  return await fetchWebApi(
    `v1/me/player/volume?volume_percent=${percent}`,
    "PUT",
    null
  );
}
