new Vue({
  el: '#app',
  data: {
    videoSrc: null,
    embeddedCurrent: 0,
    embeddedMax: 0,
    uploadedCurrent: 0,
    uploadedMax: 0,
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
  }
});