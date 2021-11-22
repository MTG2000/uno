import { EventsObject } from "./EventsObject";

class _GameAudio extends EventsObject {
  audioTracks = {
    //   Put all the game music and audio effects here
    music: "/assets/audio/bg-music.mp3",
    shuffle: "/assets/audio/shuffle.mp3",
    play: "/assets/audio/play.mp3",
    draw: "/assets/audio/draw.mp3",
  };
  musicVolume = 1;
  effectsVolume = 1;

  musicPlaying;

  constructor() {
    super();
    this.cntAudio = Object.keys(this.audioTracks).length;
    this.cntLoadedAudio = 0;
  }

  preload() {
    for (const url of Object.values(this.audioTracks)) {
      var audio = new Audio();
      audio.addEventListener(
        "canplaythrough",
        () => this.loadedAudio.apply(this),
        false
      );
      audio.src = url;
    }
  }

  loadedAudio() {
    this.cntLoadedAudio++;
    this.fireEvent("progress", this.cntLoadedAudio / this.cntAudio);
    if (this.cntLoadedAudio === this.cntAudio) this.fireEvent("completed");
  }

  playMusic(name) {
    if (!this.audioTracks[name])
      throw new Error("No Audio Track with this name");

    if (this.musicPlaying) return;
    this.musicPlaying = new Audio(this.audioTracks[name]);
    this.musicPlaying.volume = this.musicVolume * 0.5;
    this.musicPlaying.play();
    this.musicPlaying.loop = true;
  }

  playAudio(name, reps = 1) {
    if (!this.audioTracks[name])
      throw new Error("No Audio Track with this name");

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
