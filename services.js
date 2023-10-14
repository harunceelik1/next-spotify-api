// api.js
// const token = window.localStorage.getItem("token");
export async function fetchWebApi(endpoint, method, body) {
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
  return await fetchWebApi("v1/me/player/devices", "GET");
};

export const getUserData = async () => {
  return await fetchWebApi("v1/me", "GET");
};

export const getTopTracks = async (limit) => {
  return await fetchWebApi(
    `v1/me/top/tracks?time_range=short_term&limit=${limit}`,
    "GET"
  );
};
export const getCurrentTrack = async () => {
  return fetchWebApi("v1/me/player/currently-playing", "GET");
};
export const nextTrack = async () => {
  return fetchWebApi(`v1/me/player/next`, "POST");
};
export const previousTrack = async () => {
  return fetchWebApi(`v1/me/player/previous`, "POST");
};

export const pauseTrack = async () => {
  return await fetchWebApi(`v1/me/player/pause`, "PUT");
};
export const playTrack = async () => {
  // const play = fetchWebApi(`v1/me/player/play`, "PUT");
  // console.log("Services Play", play);
  return await fetchWebApi(`v1/me/player/play`, "PUT");
};

export const getPlaylist = async () => {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks

  return await fetchWebApi("v1/me/playlists", "GET");
};

export const getLastTracksApi = async (limit) => {
  return await fetchWebApi(
    `v1/me/player/recently-played?limit=${limit}`,
    "GET"
  );
};

const topTracksIds = [
  "50KVOLNNqft8SJr5ybrv8G",
  "50KVOLNNqft8SJr5ybrv8G",
  "50KVOLNNqft8SJr5ybrv8G",
  "50KVOLNNqft8SJr5ybrv8G",
  "50KVOLNNqft8SJr5ybrv8G",
];
export const getRecommendTracksApi = async (limit, topTracksIds) => {
  return await fetchWebApi(
    `v1/recommendations?limit=${limit}&seed_tracks=${topTracksIds.join(",")}`,
    "GET"
  );
};

export async function addToPlaylist(playlistId, trackUri) {
  try {
    await fetchWebApi(
      `v1/playlists/${playlistId}/tracks?uris=${trackUri}`,
      "POST"
    );
  } catch (error) {
    console.error("Şarkı eklenirken hata oluştu.", error);
    throw error;
  }
}
export async function setVolumeApi(percent) {
  return await fetchWebApi(
    `v1/me/player/volume?volume_percent=${percent}`,
    "PUT"
  );
}
