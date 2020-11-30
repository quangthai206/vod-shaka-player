<template>
  <div class="video-container" ref="videoContainer">
    <!-- The data-shaka-player tag will make the UI library use this video element.
            If no video is provided, the UI will automatically make one inside the container div. -->
    <video
      className="shaka-video"
      ref="videoComponent"
      id="video"
      style="width: 100%; height: 100%"
      poster="https://i.vimeocdn.com/video/708740915.jpg?mw=1400&mh=788"
    ></video>

    <div v-if="isError" id="errorText" ref="errorText">
      <pre>{{ errorMessage }}</pre>
    </div>
  </div>
</template>

<script>
import "shaka-player/dist/controls.css";
const shaka = require("shaka-player/dist/shaka-player.ui.js");

export default {
  props: ["manifest"],
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
    const manifestUri = this.manifest;

    // Getting reference to video and video container on DOM
    const video = this.$refs.videoComponent;
    const videoContainer = this.$refs.videoContainer;

    // Initialize shaka player
    this.player = new shaka.Player(video);

    // Request filter
    this.player
      .getNetworkingEngine()
      .registerRequestFilter(function (type, request) {
        // Only add headers to SEGMENT requests:
        if (type == shaka.net.NetworkingEngine.RequestType.SEGMENT) {
          // This is the specific header name and value the server wants:
          request.headers["Authorization"] = localStorage.getItem("token");
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
</style>