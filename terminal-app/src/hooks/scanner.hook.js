import React, {useEffect, useState} from "react"
import QrScanner from "qr-scanner"


function useScanner(srcMedia) {
  const [qrResult, setQrResult] = useState('')

  function createCanvasSize(video) {
    const dimension = {width: video.videoWidth, height: video.videoHeight}

    return {
      x: 0,
      y: 0,
      height: dimension.height,
      width: dimension.width,
      downScaledWidth: 400,
      downScaledHeight: 400
    }
  }

  useEffect(() => {

    const scanner = new QrScanner(srcMedia.current, (QRDecode) => {
      setQrResult(QRDecode)
    }, undefined, createCanvasSize)

    scanner.start()

    return function cleanup() {
      scanner.stop()
      scanner.destroy()
    }
  }, [])

  const clearQrResult = () => {
    setQrResult('')
  }
  return {qrResult, clearQrResult}
}

export default useScanner
