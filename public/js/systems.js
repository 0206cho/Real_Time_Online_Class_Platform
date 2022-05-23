$(function start() {
  let token = localStorage.getItem('access_token')
  console.log(token);

  $.ajax({
    headers: {
      "authorization": 'bearer ' + token,
    },
    type: 'GET',
    url: 'https://49.50.174.207:5000/setting',

    success: (data) => {
      console.log(data)
      //이름
      var user_name = data.list[0].user_name;
      console.log(user_name)
      $('#usernameModal_input').val(user_name); //이름수정 모달에 기존 이름 전달
      $('#user_name').text(user_name);

      //계정
      var user_email = data.list[0].user_email;
      // console.log(user_email)
      // $('#emailModal_input').val(user_email); //이메일 전달
      $('#user_email').text(user_email);

    },
    error: (error) => {
      console.log('실패')
      console.log(error)
    },
  });
});

// 이름 수정
$(function () {
  $('#name_btn').click(() => {
    let token = localStorage.getItem('access_token');
    var alertname = $('#usernameModal_input').val(); // 수정한 이름
    $.ajax({
      headers: {
        "authorization": 'bearer ' + token,
      },
      data: {
        'name': alertname
      },
      type: 'put',
      url: 'https://49.50.174.207:5000/setting/name',

      success: (data) => {
        console.log(data)
        let result = data.result;
        let msg = data.msg;

        if (result == "1") {
          alert(msg)
          $('#usernameModal').modal('hide'); // 모달창 닫기
          window.location.reload(); // 새로고침
        }
        else {
          alert("오류가 발생하였습니다. 다시 실행해주시길 바랍니다.")
        }
      },
      error: (error) => {
        console.log('실패')
        console.log(error)
      },
    });
  });
});

// 계정 삭제
$(function () {
  $('#delete_btn').click(() => {
    let token = localStorage.getItem('access_token');
    var password = $('#delModal_input').val(); // 비밀번호
    $.ajax({
      headers: {
        "authorization": 'bearer ' + token,
      },
      data: {
        'pwd': password
      },
      type: 'put',
      url: 'https://49.50.174.207:5000/signout',

      success: (data) => {
        console.log(data)
        let result = data.result;
        let msg = data.msg;

        if (result == "1") {
          alert(msg)
          $('#accountdeleteModal').modal('hide'); // 모달창 닫기
          localStorage.clear();
          location.href = "./join.html";
        }
        else {
          alert(msg)
          console.log(result)
          console.log(data)
        }
      },
      error: (error) => {
        console.log('실패')
        console.log(error)
      },
    });
  });
});

// 비밀번호 변경
$(function () {
  $('#pwdchange_btn').click(() => {
    let token = localStorage.getItem('access_token');
    var password = $('#modal_pw').val(); // 비밀번호
    var new_password = $('#modal_newpw').val(); //새로운 비밀번호
    var newpw_confirm = $('#modal_newpwconfirm').val(); //새로운 비밀번호확인  
    var password_pattern = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,20}$/; //비밀번호 유효성  

    if(new_password != newpw_confirm || !(password_pattern.test(new_password))){
      $("#modal_newpw").focusout(); // 비밀번호 유효성 검사
			$("#modal_newpwconfirm").focusout(); // 비밀번호확인 유효성 검사
			return false;
    }
    
    $.ajax({
      headers: {
        "authorization": 'bearer ' + token,
      },
      data: {
        'pwd': password,
        'changePwd' : new_password
      },
      type: 'put',
      url: 'https://49.50.174.207:5000/setting/pwd',

      success: (data) => {
        console.log(data)
        let result = data.result;
        let msg = data.msg;

        if (result == "1") {
          alert(msg)
          $('#pwchangeModal').modal('hide'); // 모달창 닫기
          window.location.reload(); // 새로고침
        }
        else {
          alert(msg)
          console.log(result)
          console.log(data)
        }
      },
      error: (error) => {
        console.log('실패')
        console.log(error)
      },
    });
  });
});

// 비밀번호 유효성 검사
$("#modal_newpw").focusout(function () {
	var val = $(this).val(),
		regex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/;
	if (val == "" | val == null) {
		$(".msg_r_password").text("비밀번호를 입력해주시길 바랍니다.");
		$(".msg_r_password").css('color', 'red');
		return false;
	}
	else if (!regex.test(val)) {
		$(".msg_r_password").text("비밀번호는 8~16자 영문 소문자, 숫자, 특수문자를 사용하세요.");
		$(".msg_r_password").css('color', 'red');
		return false;
	}
	else {
		$(".msg_r_password").text("");
	}
});

// 비밀번호 확인 유효성 검사
$("#modal_newpwconfirm").focusout(function () {
	var orgin = $("#modal_newpw").val()

	val = $(this).val();
	regex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/;
	if (val == "" | val == null) {
		$(".msg_r_confirm-password").text("비밀번호를 확인해주시길 바랍니다.");
		$(".msg_r_confirm-password").css('color', 'red');
		return false;
	}
	else if (val != orgin) {
		$(".msg_r_confirm-password").text("비밀번호가 일치하지 않습니다.");
		$(".msg_r_confirm-password").css('color', 'red');
		return false;
	}
	else {
		$(".msg_r_confirm-password").text("비밀번호가 일치합니다.");
		$(".msg_r_confirm-password").css('color', 'green');
	}
});


// 영상설정
const myFace = document.getElementById("myFace");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");

let myStream;
let cameraOff = false;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");

    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}
async function getMedia(deviceId) {
    const initialConstrains = {
      audio: false,
      video: { facingMode: "user" },
    };
    const cameraConstraints = {
      audio: false,
      video: { deviceId: { exact: deviceId } },
    };
    try {
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstraints : initialConstrains
          );
          myFace.srcObject = myStream;
          if (!deviceId) {
            await getCameras();
          }
        } catch (e) {
          console.log(e);
        }
    }
    getMedia();
    function handleCameraClick() {
      myStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
        if (cameraOff) {
            cameraBtn.innerText = "카메라 끄기";
            cameraOff = false;
          } else {
            cameraBtn.innerText = "카메라 켜기";
            cameraOff = true;
          }
        }
        
        async function handleCameraChange() {
          await getMedia(camerasSelect.value);
        }
        
        // muteBtn.addEventListener("click", handleMuteClick);
        cameraBtn.addEventListener("click", handleCameraClick);
        camerasSelect.addEventListener("input", handleCameraChange);

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