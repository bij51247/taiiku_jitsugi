new Vue({
  el: '#app',
  data: {
    videoSrc: null,
    embeddedCurrent: 0,
    embeddedMax: 0,
    uploadedCurrent: 0,
    uploadedMax: 0,
    embeddedVideoSrc: 'example.mp4', // 埋め込み動画のデフォルトソース
    embeddedStart: 0,
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.videoSrc = URL.createObjectURL(file);
        const uploadedVideoPlayer = this.$refs.uploadedVideo;
        if (uploadedVideoPlayer) {
          uploadedVideoPlayer.load();
        }
      }
    },
    playBothVideos() {
      const embeddedVideoPlayer = this.$refs.embeddedVideo;
      const uploadedVideoPlayer = this.$refs.uploadedVideo;
      if (embeddedVideoPlayer && uploadedVideoPlayer) {
        embeddedVideoPlayer.play();
        uploadedVideoPlayer.play();
      }
    },
    pauseBothVideos() {
      const embeddedVideoPlayer = this.$refs.embeddedVideo;
      const uploadedVideoPlayer = this.$refs.uploadedVideo;
      if (embeddedVideoPlayer && uploadedVideoPlayer) {
        embeddedVideoPlayer.pause();
        uploadedVideoPlayer.pause();
      }
    },
    updateSeekBar(videoType) {
      const videoPlayer = this.$refs[`${videoType}Video`];
      if (videoPlayer) {
        this[`${videoType}Current`] = videoPlayer.currentTime;
        this[`${videoType}Max`] = videoPlayer.duration;
      }
    },
    initializeSeekBar(videoType) {
      const videoPlayer = this.$refs[`${videoType}Video`];
      if (videoPlayer) {
        this[`${videoType}Max`] = videoPlayer.duration;
      }
    },
    setPosition(event, videoType) {
      const videoPlayer = this.$refs[`${videoType}Video`];
      const value = event.target.value;
      if (videoPlayer && value != null) {
        videoPlayer.currentTime = value;
      }
    },
    handleEmbeddedFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.embeddedVideoSrc = URL.createObjectURL(file);
        const embeddedVideoPlayer = this.$refs.embeddedVideo;
        if (embeddedVideoPlayer) {
          embeddedVideoPlayer.load();
        }
      }
    },
    setStartingPosition(event, videoType) {
      const value = parseFloat(event.target.value);
      this[`${videoType}Start`] = value;
      // Make the video start from the pin's position when played
      const videoPlayer = this.$refs[`${videoType}Video`];
      if (videoPlayer) {
        videoPlayer.currentTime = value;
      }

      // Optionally, if you want the video to start playing immediately from the pin position
      if (!videoPlayer.paused) {
        videoPlayer.play();
      }
    },

    // Use this method to make the pin draggable
    makePinInteractive(videoType) {
      const pin = this.$refs[`${videoType}Pin`];
      if (pin) {
        pin.classList.add('interactive');
      }
    }
  },
  mounted() {
    this.makePinInteractive('embedded');
    // If you have other video types or uploaded videos, call the method for them as well
  }
});


