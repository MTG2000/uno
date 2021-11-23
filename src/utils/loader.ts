import GameAudio from "./audio";
import { EventsObject } from "./EventsObject";

class _Loader extends EventsObject {
  imgs = [
    "assets/images/backside.png",
    "assets/images/uno-logo.png",
    "assets/images/draw four-blank.png",
    "assets/images/draw two-blank.png",
    "assets/images/draw two-blue.png",
    "assets/images/draw two-green.png",
    "assets/images/draw two-red.png",
    "assets/images/draw two-yellow.png",
    "assets/images/draw4.png",
    "assets/images/front-black.png",
    "assets/images/front-blue.png",
    "assets/images/front-green.png",
    "assets/images/front-red.png",
    "assets/images/front-yellow.png",
    "assets/images/reverse-blank.png",
    "assets/images/reverse-blue.png",
    "assets/images/reverse-green.png",
    "assets/images/reverse-red.png",
    "assets/images/reverse-yellow.png",
    "assets/images/skip-blank.png",
    "assets/images/skip-blue.png",
    "assets/images/skip-green.png",
    "assets/images/skip-red.png",
    "assets/images/skip-yellow.png",
    "assets/images/wild.png",
  ];
  audios = {
    music: "assets/audio/bg-music.mp3",
    shuffle: "assets/audio/shuffle.mp3",
    play: "assets/audio/play.mp3",
    draw: "assets/audio/draw.mp3",
  };

  totalCnt = 0;
  loadedCnt = 0;

  constructor() {
    super();
    this.onProgress = this.onProgress.bind(this);
  }

  load() {
    this.totalCnt = this.imgs.length + Object.keys(this.audios).length;
    this.loadedCnt = 0;

    GameAudio.preload(this.audios, this.onProgress);

    for (const img of this.imgs) {
      this.preloadImage(img);
    }
  }

  preloadImage(url: string) {
    try {
      var _img = new Image();
      _img.src = url;
      _img.onload = this.onProgress;
    } catch (e) {
      console.error("Failed Loading Images");
      console.error(e);
    }
  }

  onProgress() {
    this.loadedCnt++;
    this.fireEvent("progress", this.loadedCnt / this.totalCnt);
    if (this.loadedCnt === this.totalCnt) this.fireEvent("completed");
  }
}

const Loader = new _Loader();
export default Loader;
