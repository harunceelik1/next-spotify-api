// api.js
// const token = window.localStorage.getItem("token");
export async function fetchWebApi(endpoint, method, body) {
  try {
    return fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      method,
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then(function (response) {
        console.info("fetch()", response);

        return response;
      });
  } catch (error) {
    throw error;
  }
}

const getToken = () => {
  return window.localStorage.getItem("token");
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
  return await fetchWebApi("v1/me/player/currently-playing", "GET");
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

export const getLastTracks = async (limit) => {
  return await fetchWebApi(
    `v1/me/player/recently-played?limit=${limit}`,
    "GET"
  );
};
const topTracksIds = [
  "6wsqVwoiVH2kde4k4KKAFU",
  "2E1VxbqXsK87BmyC9O3xCA",
  "4H2KhOR9QOHHv4ttjV5Lhz",
  "4wEQaEealhUkriqzp9cfMx",
  "1PiyTtoNn0m4kfJWLfjHny",
];
export const getRecommendTracks = async (limit) => {
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
// export const topTracks = async (token) => {
//   const apiUrl = "https://api.spotify.com/v1/me/player/recently-played?limit=5"; // Son 5 şarkıyı almak için limit ekledik

//   try {
//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("API isteği başarısız oldu.");
//     }

//     const data = await response.json();
//     return data.items; // Son 5 şarkıyı döndürüyoruz
//   } catch (error) {
//     throw error;
//   }
// };
// export const fetchUserData = async (token) => {
//   const apiUrl = "https://api.spotify.com/v1/me";

//   try {
//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("API isteği başarısız oldu.");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };