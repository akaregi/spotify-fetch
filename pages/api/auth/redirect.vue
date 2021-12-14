<template>
  <section>
    <p v-if="isLoggedin">Conguraturations, you're now authorized!</p>
    <button><NuxtLink to="/">Proceed</NuxtLink></button>
    <dl>
      <dt>Access Token</dt>
      <dd>
        <code>{{ res.access_token }}</code>
      </dd>
      <dt>Refresh Token</dt>
      <dd>
        <code>{{ res.refresh_token }}</code>
      </dd>
      <dt>Scope</dt>
      <dd>
        <code>{{ res.scope }}</code>
      </dd>
    </dl>
  </section>
</template>

<script setup lang="ts">
const $config = useRuntimeConfig();
const $route = useRoute();

const code = Array.isArray($route.query.code)
  ? $route.query.code[0]
  : $route.query.code;

const auth = Buffer.from(
  `${$config.clientId}:${$config.clientSecret}`
).toString("base64");

const params = new URLSearchParams();
params.set("grant_type", "authorization_code");
params.set("code", code);
params.set("redirect_uri", $config.redirectUri);

// XXX: top-level await できるけど script setup 節だとエラーを吐く
// @ts-ignore
const res: APITokenResponse = await $fetch("/api/token", {
  baseURL: "https://accounts.spotify.com",
  body: params.toString(),
  headers: {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  method: "POST",
});

useState("token", () => res.access_token);
useState("refreshToken", () => res.refresh_token);
// TODO: 認証が失敗したときの考慮がない
const isLoggedin = useState("isLoggedIn", () => true);

interface APITokenResponse {
  access_token: string;
  token_type: "Bearer";
  scope: string;
  expires_in: number;
  refresh_token: string;
}
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  created() {
    const $router = useRouter();

    $router.push("/");
  },
});
</script>

<style scoped>
dt {
  font-weight: bold;
}

dd {
  margin-bottom: 1rem;
}

code {
  word-break: break-all;
}
</style>
