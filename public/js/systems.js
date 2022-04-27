//영상테스트
  var myVideoStream = document.getElementById('myVideo')     // make it a global variable
  function getVideo() {
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.getMedia({ video: true, audio: false },

      function (stream) {
        myVideoStream.srcObject = stream
        myVideoStream.play();
      },

      function (error) {
        alert('webcam not working');
      });
  }

// 마이크테스트
  const chkHearMic = document.getElementById("chk-hear-mic")

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)() // 오디오 컨텍스트 정의

  const analyser = audioCtx.createAnalyser()

  function makeSound(stream) {
    const source = audioCtx.createMediaStreamSource(stream)

    source.connect(analyser)
    analyser.connect(audioCtx.destination)

  }

  if (navigator.mediaDevices) {
    console.log('getUserMedia supported.')

    const constraints = {
      audio: true
    }
    let chunks = []

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {

        const mediaRecorder = new MediaRecorder(stream)

        chkHearMic.onchange = e => {
          if (e.target.checked == true) {
            audioCtx.resume()
            makeSound(stream)
          } else {
            audioCtx.suspend()
          }
        }

        mediaRecorder.ondataavailable = e => {
          chunks.push(e.data)
        }
      })
      .catch(err => {
        console.log('The following error occurred: ' + err)
      })
  }