class _GameAudio {
  musicVolume = 1;
  effectsVolume = 1;
  audioTracks = {};
  musicPlaying;
  audioTracksFailed = {};

  preload(audioTracks, onload) {
    this.audioTracks = audioTracks;
    for (const url of Object.values(this.audioTracks)) {
      var audio = new Audio();

      const cb = () => {
        onload();
      };

      audio.addEventListener(
        "canplaythrough",cb,
        false
      );
      audio.src = url;

      setTimeout(()=>{
        if(audio.readyState !== 4){
          this.audioTracksFailed[url] = true;
          onload();
          audio.removeEventListener("canplaythrough",cb);
          console.error("Failed to load audio track: ", url);
        }
      }, 10000)
    }
  }

  playMusic(name) {
    if (!this.audioTracks[name])
      throw new Error("No Audio Track with this name");

    if(this.audioTracksFailed[this.audioTracks[name]]) return;

    if (this.musicPlaying) return;
    this.musicPlaying = new Audio(this.audioTracks[name]);
    this.musicPlaying.volume = this.musicVolume * 0.5;
    this.musicPlaying.play();
    this.musicPlaying.loop = true;
  }

  playAudio(name, reps = 1) {
    if (!this.audioTracks[name])
      throw new Error("No Audio Track with this name");

    if(this.audioTracksFailed[this.audioTracks[name]]) return;

    for (let i = 0; i < reps; i++) {
      setTimeout(() => {
        let audio = new Audio(this.audioTracks[name]);
        audio.volume = this.effectsVolume;
        audio.play();
      }, 200 * i);
    }
  }

  changeMusicVolume(newVolume) {
    this.musicVolume = newVolume;
  }

  changeEffectsVolume(newVolume) {
    this.effectsVolume = newVolume;
  }
}

const GameAudio = new _GameAudio();

export default GameAudio;
