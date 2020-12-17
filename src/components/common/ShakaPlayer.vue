<template>
  <div class="video-container" ref="videoContainer">
    <!-- The data-shaka-player tag will make the UI library use this video element.
            If no video is provided, the UI will automatically make one inside the container div. -->
    <video
      className="shaka-video"
      ref="videoComponent"
      id="video"
      style="width: 100%; height: 100%"
      :poster="video.poster"
    ></video>

    <div v-if="isError" id="errorText" ref="errorText">
      <pre>{{ errorMessage }}</pre>
    </div>

    <div v-if="!isManifestLoaded" id="playIcon">
      <svg
        width="100%"
        height="100%"
        viewBox="110 32 60 60"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <circle id="b" cx="30" cy="30" r="30" />
          <path
            d="M19 20.16v-.006c0-1.19.955-2.154 2.134-2.154.4 0 .775.11 1.095.305l20.314 9.537c.846.286 1.456 1.092 1.456 2.043 0 .784-.416 1.47-1.037 1.848v.007l-.08.04c-.067.035-.135.068-.204.097L22.254 41.68c-.326.203-.71.32-1.12.32-1.18 0-2.135-.964-2.135-2.154V20.16z"
            id="e"
          />
          <filter
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            filterUnits="objectBoundingBox"
            id="d"
          >
            <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
            <feGaussianBlur
              stdDeviation="1"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
              in="shadowBlurOuter1"
            />
          </filter>
          <circle id="a" cx="30" cy="30" r="28" />
          <mask id="f" x="0" y="0" width="56" height="56" fill="#fff">
            <use xlink:href="#a" />
          </mask>
        </defs>
        <g fill="none" fill-rule="evenodd" transform="translate(110 32)">
          <mask id="c" fill="#fff">
            <use xlink:href="#b" />
          </mask>
          <use
            :fill="`rgb( ${video.colors.tertiary.r}, ${video.colors.tertiary.g}, ${video.colors.tertiary.b})`"
            xlink:href="#b"
          />
          <g mask="url(#c)">
            <path
              :fill="`rgb(${video.colors.secondary.r}, ${video.colors.secondary.g}, ${video.colors.tertiary.b})`"
              opacity=".7"
              d="M-13.135 43.293l95.91 7.13 32.86-32.86-58.78-58.78-65.45 65.45"
            />
            <path
              :fill="`rgb(${video.colors.primary.r}, ${video.colors.primary.g}, ${video.colors.primary.b})`"
              opacity=".7"
              d="M-7.86 26.012l87.746 29.164 36.62-28.61-51.18-65.506L-7.61 18.047"
            />
            <path
              :fill="`rgb(${video.colors.primaryLight.r}, ${video.colors.primaryLight.g}, ${video.colors.primaryLight.b})`"
              opacity=".742"
              d="M42.803-65.815l70.468 47.53-47.53 70.47L-4.73 4.653z"
            />
          </g>
          <g mask="url(#c)">
            <use fill="#000" filter="url(#d)" xlink:href="#e" />
            <use fill="#FFF" xlink:href="#e" />
          </g>
          <use mask="url(#f)" xlink:href="#a" stroke-width="4" stroke="#FFF" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import "shaka-player/dist/controls.css";
const shaka = require("shaka-player/dist/shaka-player.ui.js");

export default {
  props: ["video"],
  data() {
    return {
      isManifestLoaded: false,
      player: null,
      ui: null,
      isError: false,
      errorMessage: "",
    };
  },
  methods: {
    onErrorEvent(event) {
      // Extract the shaka.util.Error object from the event.
      this.onError(event.detail);
    },

    onError(error) {
      // Log the error.
      console.error("Error code", error.code, "object", error);
      this.$refs.videoComponent.pause();
      this.$refs.videoComponent.poster = null;
      this.$refs.videoComponent.style.backgroundColor = "black";
      this.ui.setEnabled(false);
      const resObj = JSON.parse(error.data[2]);
      this.errorMessage = resObj.message;
      this.isError = true;
    },
  },
  mounted() {
    // Link to MPEG-DASH video
    const manifestUri = this.video.fileLink;

    // Getting reference to video and video container on DOM
    const video = this.$refs.videoComponent;
    const videoContainer = this.$refs.videoContainer;

    // Jump back to start when video is ended
    video.addEventListener("ended", function () {
      console.log("ended");
      video.currentTime = 0;
    });

    // Initialize shaka player
    this.player = new shaka.Player(video);

    // Request filter
    this.player.getNetworkingEngine().registerRequestFilter((type, request) => {
      // Only add headers to SEGMENT requests:
      if (type == shaka.net.NetworkingEngine.RequestType.SEGMENT) {
        // This is the specific header name and value the server wants:
        request.headers["uid"] = this.$store.state.auth.user._id;
      }
    });

    // Setting up shaka player UI
    this.ui = new shaka.ui.Overlay(this.player, videoContainer, video);
    this.ui.getControls();

    // Listen for error events.
    this.player.addEventListener("error", this.onErrorEvent);

    document
      .querySelector(".shaka-small-play-button.material-icons-round")
      .addEventListener(
        "click",
        () => {
          if (!this.isManifestLoaded) {
            this.player
              .load(manifestUri)
              .then(() => {
                this.isManifestLoaded = true;
                console.log("The video has now been loaded!");
                video.play();
              })
              .catch(this.onError); // onError is executed if the asynchronous load fails.
          }
        },
        { once: true }
      );

    document.querySelector(".shaka-scrim-container").addEventListener(
      "click",
      () => {
        if (!this.isManifestLoaded) {
          this.player
            .load(manifestUri)
            .then(() => {
              this.isManifestLoaded = true;
              console.log("The video has now been loaded!");
              video.play();
            })
            .catch(this.onError);
        }
      },
      { once: true }
    );
  },
};
</script>

<style scoped>
#errorText {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: #000;
  padding: 20px 40px;
}

pre {
  color: inherit;
  margin: 0;
  font-size: inherit;
}

#playIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}
</style>