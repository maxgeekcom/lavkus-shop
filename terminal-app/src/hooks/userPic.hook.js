import React from "react"


function useUserPic() {
  const createUserPic = (srcMedia, canvasTag) => {
    canvasTag.current.width = srcMedia.current.videoWidth
    canvasTag.current.height = srcMedia.current.videoHeight

    const context = canvasTag.current.getContext('2d')
    context.drawImage(
      srcMedia.current,
      0, 0, srcMedia.current.videoWidth, srcMedia.current.videoHeight,
      0, 0, srcMedia.current.videoWidth, srcMedia.current.videoHeight
    )

    return new Promise(resolve => canvasTag.current.toBlob(resolve, 'image/png'))
  }

  return {createUserPic}
}

export default useUserPic
