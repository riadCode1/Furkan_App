import TrackPlayer, { useTrackPlayerEvents } from "react-native-track-player";

useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], async (event) => {
    if (event.state === TrackPlayer.STATE_PLAYING) {
      console.log('Track is playing');
    } else if (event.state === TrackPlayer.STATE_PAUSED) {
      console.log('Track is paused');
    }
  });
  