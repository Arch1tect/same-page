import "video.js/dist/video-js.css"
import "./MusicPlayer.css"
import React from "react"
import videojs from "video.js"
import "videojs-playlist"
import "videojs-youtube"

class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      // console.log("onPlayerReady", this)
    })
    this.player.playlist([])
    this.player.playlist.autoadvance(0)
    this.player.on("playlistitem", data => {
      if (window.setMediaIndex) {
        window.setMediaIndex(this.player.playlist.currentIndex())
      } else {
        console.error("setMediaIndex not defined yet")
      }
    })
    window.player = this.player
    // window.addToPlaylist = (item) => {
    //   this.player.playlist()
    // }
    // this.player.playlist([
    //   {
    //     sources: [
    //       {
    //         src: "https://www.youtube.com/watch?v=QO25QnboJG0",
    //         // src: "https://vimeo.com/335874600"
    //         // "https://gcs-vimeo.akamaized.net/exp=1560427305~acl=%2A%2F1217035680.mp4%2A~hmac=c27049517173d0849ad0ca0330188556c0b48e3f7c4db9e15a7777396c01bd99/vimeo-prod-skyfire-std-us/01/3027/12/315137080/1217035680.mp4"
    //         // type: "video/mp4"
    //         type: "video/youtube"
    //       }
    //     ]
    //   },
    //   {
    //     sources: [
    //       {
    //         src: "https://nusid.net/audio.mp3"
    //         // type: "video/mp4"
    //       }
    //     ]
    //   }
    // ])
    // this.player.playlist.autoadvance(0)
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      // <div>
      <div data-vjs-player>
        <video ref={node => (this.videoNode = node)} className="video-js" />
      </div>
      // </div>
    )
  }
}

function Player() {
  const videoJsOptions = {
    // autoplay: true,
    dataSetup: { techOrder: ["youtube"] },
    controls: true,
    responsive: true,
    width: "100%"
  }

  return <VideoPlayer {...videoJsOptions} />
}
export default Player
