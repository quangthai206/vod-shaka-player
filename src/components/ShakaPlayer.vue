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
    },
  },
  mounted() {
    //Link to MPEG-DASH video
    var manifestUri = this.manifest;

    //Getting reference to video and video container on DOM
    const video = this.$refs.videoComponent;
    const videoContainer = this.$refs.videoContainer;

    //Initialize shaka player
    var player = new shaka.Player(video);

    // Request filter
    player
      .getNetworkingEngine()
      .registerRequestFilter(function (type, request) {
        // Only add headers to SEGMENT requests:
        if (type == shaka.net.NetworkingEngine.RequestType.SEGMENT) {
          // This is the specific header name and value the server wants:
          request.headers["Authorization"] = localStorage.getItem("token");
        }
      });

    //Setting up shaka player UI
    const ui = new shaka.ui.Overlay(player, videoContainer, video);
    ui.getControls();

    // Listen for error events.
    player.addEventListener("error", this.onErrorEvent);

    document
      .querySelector(".shaka-small-play-button.material-icons-round")
      .addEventListener(
        "click",
        () => {
          if (!this.isManifestLoaded) {
            player
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
          player
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

<style>
</style>