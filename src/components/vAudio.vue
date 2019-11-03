<template>
  <v-card style="text-align: center" class="elevation-0">
    <v-card-text>
      <v-btn text icon class="primary--text" @click.native="playing ? pause() : play()" v-if="loaded">
        <v-icon v-if="playing === false || paused === true">play_arrow</v-icon>
        <v-icon v-else>pause</v-icon>
      </v-btn>
      <v-btn text icon class="primary--text" @click.native="stop()" v-if="loaded">
        <v-icon>stop</v-icon>
      </v-btn>
      <v-btn text icon class="primary--text" @click.native="mute()" v-if="loaded">
        <v-icon v-if="isMuted === false">volume_up</v-icon>
        <v-icon v-else>volume_off</v-icon>
      </v-btn>
      <v-btn text icon class="primary--text" @click.native="download()" v-if="loaded">
        <v-icon>get_app</v-icon>
      </v-btn>
      <v-btn @click.native="reload()" v-else color="red">Reload</v-btn>
      <v-switch style="margin: auto;" append-icon="repeat" v-model="repeat" :disabled="loaded === false"></v-switch>
      <v-slider ref="slider" @click.native="setPosition()" v-model="percentage" :disabled="loaded === false"></v-slider>
      <p><strong>{{ currentTime }}</strong> / {{ duration }}</p>
    </v-card-text>
    <audio id="player" ref="player" v-on:ended="ended" v-on:canplay="canPlay" :src="file"></audio>
  </v-card>
</template>

<script>
const formatTime = (second) => {
  let time = new Date(second * 1000).toISOString().substr(11, 8)
  return time
}
export default {
  name: 'vuetify-audio',
  props: {
    file: {
      type: String,
      default: null
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    ended: {
      type: Function,
      default: () => {},
    },
    canPlay: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    duration() {
      return this.audio ? formatTime(this.totalDuration) : ''
    },
  },
  data() {
    return {
      isMuted: false,
      loaded: false,
      playing: false,
      paused: false,
      percentage: 0,
      currentTime: '00:00:00',
    	audio: undefined,
      totalDuration: 0,
      repeat: false
    }
  },
  methods: {
  	setPosition() {
      this.audio.currentTime = parseInt(this.audio.duration / 100 * this.percentage)
    },
    stop() {
      this.paused = this.playing = false
      this.audio.pause()
      this.audio.currentTime = 0
    },
    play() {
      if (this.playing) return
      	this.paused = false
        this.audio.play()
        this.playing = true
        this.$parent.logMusic(this.file)
    },
    pause() {
      this.paused = !this.paused;
      (this.paused) ? this.audio.pause() : this.audio.play()
    },
    download() {
      this.audio.pause()
      window.open(this.file, 'download')
    },
    mute() {
      this.isMuted = !this.isMuted
      this.audio.muted = this.isMuted
      this.volumeValue = this.isMuted ? 0 : 75
    },
    reload() {
      this.audio.load()
    },
    _handleLoaded() {
      if (this.audio.readyState >= 2) {
        if (this.autoPlay) this.audio.play()
        this.loaded = true
        this.totalDuration = parseInt(this.audio.duration)
      } else {
        throw new Error('Failed to load sound file')
      }
    },
    _handlePlayingUI(e) {
      this.percentage = this.audio.currentTime / this.audio.duration * 100
      this.currentTime = formatTime(this.audio.currentTime)
		},
		_handlePlayPause(e) {
			if (e.type === 'pause' && this.paused === false && this.playing === false) {
				this.currentTime = '00:00:00'
			}
		},
		_handleEnded() {
      this.paused = this.playing = false
      if (this.repeat) {
        this.play()
      } else {
        this.stop()
      }
		},
		init() {
			this.audio.addEventListener('timeupdate', this._handlePlayingUI)
			this.audio.addEventListener('loadeddata', this._handleLoaded)
			this.audio.addEventListener('pause', this._handlePlayPause)
			this.audio.addEventListener('play', this._handlePlayPause)
			this.audio.addEventListener('ended', this._handleEnded)
		},
	},
	mounted() {
		this.audio = this.$refs.player
		this.init()
	},
	beforeDestroy() {
		this.audio.removeEventListener('timeupdate', this._handlePlayingUI)
		this.audio.removeEventListener('loadeddata', this._handleLoaded)
		this.audio.removeEventListener('pause', this._handlePlayPause)
		this.audio.removeEventListener('play', this._handlePlayPause)
		this.audio.removeEventListener('ended', this._handleEnded);
	}
}
</script>
