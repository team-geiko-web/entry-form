let localStream;
const constraints = {
  video: {
    width: 640,
    height: 480,
    facingMode: "user", // デフォルトはインカメラ
  },
  audio: false,
};

const getStream = (isUser) => {
  // 直前のストリームを停止する
  if (localStream !== undefined) {
    localStream.getVideoTracks().forEach((camera) => {
      camera.stop();
      console.log("camera stop");
    });
  }

  // 再読み込み
  constraints.video.facingMode = isUser ? "user" : { exact: "environment" };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      localStream = stream;
      video.srcObject = stream;
      video.play();
    })
    .catch((e) => {
      console.log(e);
    });
};

const video = document.getElementById("video");
getStream(true);

let cameraFacingIsUser = true;
let facingText = document.getElementById("camera-facing");
facingText.innerText = "インカメラ";
document.getElementById("btn").onclick = () => {
  if (cameraFacingIsUser) {
    facingText.innerText = "アウトカメラ";
    cameraFacingIsUser = false;
    getStream(false);
  } else {
    facingText.innerText = "インカメラ";
    cameraFacingIsUser = true;
    getStream(true);
  }
};
