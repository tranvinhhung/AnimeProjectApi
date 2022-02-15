import React from "react";
import { useSelector } from "react-redux";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const urlRef = React.useRef(null);
  const { options, onReady } = props;
  const optionRedux = useSelector((state) => state.myVideo.config);
  const currentTimeRedux = useSelector((state) => state.myVideo.currentTimee);
  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      // you can update player here [update player through props]

      const player = playerRef.current;
      console.log(urlRef.current === optionRedux.sources[0].src);
      if (urlRef.current !== optionRedux.sources[0].src) {
        // player.seeking();
        player.autoplay(true);
        player.src(options.sources);

        // set
      }
    }
    return () => {
      urlRef.current = optionRedux.sources[0].src;
      console.log(urlRef.current);
    };
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered vjs-16-9 video-js vjs-big-play-centered vjs-16-9 vjs-fluid vjs_video_2374-dimensions vjs-controls-enabled vjs-workinghover vjs-v7 vjs-layout-small vjs-has-started vjs-playing vjs-user-active vjs-fullscreen"
      />
    </div>
  );
};

export default VideoJS;
