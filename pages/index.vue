<template>
  <section>
    <h1>Welcome to <em>Spotify Fetcher</em></h1>

    <section v-if="!useIsLoggedIn()">
      <p>You must authorize yourself...</p>
      <button><a :href="authUrl">Authorize...</a></button>
    </section>

    <p>Authorized, thanks!</p>
    <button @click="logout">Logout...</button>
  </section>
</template>

<script setup lang="ts">
const $config = useRuntimeConfig();
const url = new URL("https://accounts.spotify.com/authorize");

const scopes: string[] = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
];

url.searchParams.set("response_type", "code");
url.searchParams.set("scope", scopes.join(" "));
url.searchParams.set("redirect_uri", $config.redirectUri);
url.searchParams.set("client_id", $config.clientId);
url.searchParams.set("state", "state");

const authUrl = url.href;
const useIsLoggedIn = () => useState("isLoggedIn");
const useAccessToken = () => useState("accessToken");

const logout = () => {
  console.log("po");

  const isLoggedIn = useState("isLoggedIn", () => false);
  isLoggedIn.value = false;

  const token = useState("token", () => "");
  token.value = "";

  const refreshToken = useState("refreshToken", () => "");
  refreshToken.value = "";
};
</script>
