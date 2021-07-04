import React, {useState, useEffect} from "react"


function useUserMedia() {
  const [mediaStream, setMediaStream] = useState(null)

  const enableStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {width: 1920, height: 1080, facingMode: 'user'},
        audio: false
      })
      setMediaStream(stream)
    } catch (e) {}
  }

  useEffect(() => {
    if (!mediaStream) {
      enableStream()
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          track.stop()
        })
      }
    }
  }, [mediaStream])

  return {mediaStream}
}

export default useUserMedia
