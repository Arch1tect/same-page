import "video.js/dist/video-js.css"
import "./MusicPlayer.css"
import React from "react"
import videojs from "video.js"
import "videojs-playlist"

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
    //         src:
    //           "https://fpdl.vimeocdn.com/vimeo-prod-skyfire-std-us/01/1353/13/331768732/1305089795.mp4?token=1560173628-0x541c23a7b9fb37ff4e630489d4a8cdf852c7737c",
    //         type: "video/mp4"
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
    controls: true,
    responsive: true,
    width: "100%"
  }

  return <VideoPlayer {...videoJsOptions} />
}
export default Player
