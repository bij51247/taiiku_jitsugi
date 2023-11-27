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
    uploadedStart: 0, 
    dragging: false,
    startPinPosition: 0
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

    dragStart: function (event) {
      this.dragging = true;
      // ここでは、startPinPosition を設定する代わりに、drag メソッド内で計算を行います。
    },
    drag: function (event) {
      if (!this.dragging) return;
      var seekBarRect = this.$el.querySelector('.seek-bar').getBoundingClientRect();
      var newLeft = (event.clientX - seekBarRect.left) / seekBarRect.width * 100;
      // 範囲を0%から100%に制限します。
      newLeft = Math.min(Math.max(newLeft, 0), 100);
      var startPin = this.$el.querySelector('.start-pin');
      startPin.style.left = newLeft + '%';  // パーセンテージを使用します。
    },
    dragEnd: function () {
      this.dragging = false;
    }
  },
  mounted: function () {
    var startPin = this.$el.querySelector('.start-pin');
    startPin.addEventListener('mousedown', this.dragStart);
    document.addEventListener('mousemove', this.drag);
    document.addEventListener('mouseup', this.dragEnd);
  },
  beforeDestroy: function () {
    var startPin = this.$el.querySelector('.start-pin');
    startPin.removeEventListener('mousedown', this.dragStart);
    document.removeEventListener('mousemove', this.drag);
    document.removeEventListener('mouseup', this.dragEnd);
  }
});


