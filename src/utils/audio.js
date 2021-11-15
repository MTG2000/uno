import { EventsObject } from "./EventsObject";

class GameAudio extends EventsObject {
  audioTracks = {
    //   Put all the game music and audio effects here
    name: "url",
  };
  musicVolume = 1;
  effectsVolume = 1;

  constructor() {
    this.cntAudio = Object.keys(this.audioTracks).length;
    this.cntLoadedAudio = 0;
  }

  preload() {
    for (const url of Object.values(this.audioTracks)) {
      var audio = new Audio();
      audio.addEventListener("canplaythrough", this.loadedAudio, false);
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

    var audio = new Audio(this.audioTracks[name]);
    audio.volume = this.musicVolume;
    audio.play();
  }

  playAudio(name) {
    if (!this.audioTracks[name])
      throw new Error("No Audio Track with this name");

    var audio = new Audio(this.audioTracks[name]);
    audio.volume = this.effectsVolume;
    audio.play();
  }

  changeMusicVolume(newVolume) {
    this.musicVolume = newVolume;
  }

  changeEffectsVolume(newVolume) {
    this.effectsVolume = newVolume;
  }
}

export default GameAudio;
