/*function check(form){
	if(form.email.value == "test@test.com" && form.password.value == "1234aa!!")
	{
		window.open('home.html')
	}
	else{
		alert("삐빅 오류");
	}
}
*/

// 회원가입
$(function(){
	$('#register-submit').on("click",function () {
		var formregister = $("#register-form").serialize();

		console.log(formregister);
		var form_data = {
			"name": $('#rr_name').val(),
			"email": $('#r_email').val(),
			"pwd": $('#r_password').val(),
			// pwd_con: $('#r_confirm-password').val(),
			"tel": $('#r_phone').val()
		};
		$.ajax({
			type: "post",
			url: "http://49.50.174.207:5000/auth/signup",
			data: form_data,
			dataType: 'json',
			success: function (data) {
				alert("success");
				console.log(data);
			},
			error: function (request, status, error) {
				console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	});
});
// let index = {
// 	init: function () {
// 		$("#register-submit").on("click", () => { // function(){} 대신 ()=>{} 를 쓴 이유 : this를 바인딩하기 위해서
// 			this.save();
// 		});
// 	},

// 	save: function () {
// 		// alert('user의 save함수 호출됨');
// 		let data = {

// 			name: $('#r_name').val(),
// 			email: $('#r_email').val(),
// 			pwd: $('#r_password').val(),
// 			// pwd_con: $('#r_confirm-password').val(),
// 			tel: $('#r_phone').val()
// 		};
// 		// console.log(data);

// 		// ajax 호출시 default가 비동기 호출 -> 순서 상관없음
// 		// ajax 통신을 이용해서 3개의 데이터를 json으로 변경하여 insert 요청
// 		// ajax가 통신을 성공하고 서버가 json을 리턴해주면 자동으로 자바 오브젝트로 변환
// 		$.ajax({
// 			// 회원가입 수행 요청
// 			type: "POST",
// 			url: "http://49.50.174.207:5000/auth/signup",
// 			data: JSON.stringify(data), // http body 데이터
// 			contentType: "application/json; charset=utf-8", // body 데이터가 어떤 타입인지 (MIME)
// 			dataType: "json" // 요청을 서버로 해서 응답이 왔을 때 기본적으로 모든 것이 String(문자열), 만약 생긴게 json이라면 javascript 오브젝트로 변경
// 		}).done(function (resp) {
// 			// 결과가 정상이면 done 실행
// 			alert("회원가입이 완료되었습니다.");
// 			//console.log(resp);
// 			location.href = "/views/join.html";
// 		}).fail(function (error) {
// 			// 실패하면 fail 실행
// 			alert("회원가입이 실패하였습니다.");
// 			alert(JSON.stringify(error));
// 		});
// 	}
// }
// index.init();

$(function () {
	$('#login-form-link').click(function (e) {
		$("#login-form").delay(100).fadeIn(100);
		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function (e) {
		$("#register-form").delay(100).fadeIn(100);
		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});

// 로그인 - 이메일 유효성 검사
/*$("#email").focusout(function () {
	var val = $(this).val(),
		regex = /^\S+@\S+$/i;

	if (val == "" | val == null) {
		$(".msg_email").text("이메일을 입력해주시길 바랍니다.");
		$(".msg_email").css('color', 'red');
	}
	else if (!regex.test(val)) {
		$(".msg_email").text("양식에 맞춰서 입력해주시길 바랍니다. ex) test@test.com");
		$(".msg_email").css('color', 'red');
	}
	else {
		$(".msg_email").text("");
	}
});

// 로그인 - 비밀번호 유효성 검사
$("#password").focusout(function () {
	var val = $(this).val(),
		regex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/;
	if (val == "" | val == null) {
		$(".msg_password").text("비밀번호를 입력해주시길 바랍니다.");
		$(".msg_password").css('color', 'red');
	}
	else if (!regex.test(val)) {
		$(".msg_password").text("비밀번호는 8~16자 영문 소문자, 숫자, 특수문자를 사용하세요.");
		$(".msg_password").css('color', 'red');
	}
	else {
		$(".msg_password").text("");
	}
});
*/
// 회원가입 - 이름 유효성 검사
$("#r_name").focusout(function () {
	var val = $(this).val()

	if (val == "" | val == null) {
		$(".msg_r_name").text("이름을 입력해주시길 바랍니다.");
		$(".msg_r_name").css('color', 'red');
	}
	else {
		$(".msg_r_name").text("");
	}
});

// 회원가입 - 이메일 유효성 검사
$("#r_email").focusout(function () {
	var val = $(this).val(),
		regex = /^\S+@\S+$/i;

	if (val == "" | val == null) {
		$(".msg_r_email").text("이메일을 입력해주시길 바랍니다.");
		$(".msg_r_email").css('color', 'red');
	}
	else if (!regex.test(val)) {
		$(".msg_r_email").text("양식에 맞춰서 입력해주시길 바랍니다. ex) test@test.com");
		$(".msg_r_email").css('color', 'red');
	}
	else {
		$(".msg_r_email").text("");
	}
});

// 회원가입 - 비밀번호 유효성 검사
$("#r_password").focusout(function () {
	var val = $(this).val(),
		regex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/;
	if (val == "" | val == null) {
		$(".msg_r_password").text("비밀번호를 입력해주시길 바랍니다.");
		$(".msg_r_password").css('color', 'red');
	}
	else if (!regex.test(val)) {
		$(".msg_r_password").text("비밀번호는 8~16자 영문 소문자, 숫자, 특수문자를 사용하세요.");
		$(".msg_r_password").css('color', 'red');
	}
	else {
		$(".msg_r_password").text("");
	}
});

// 회원가입 - 비밀번호 확인 유효성 검사
$("#r_confirm-password").focusout(function () {
	var orgin = $("#r_password").val()

	val = $(this).val();
	regex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/;
	if (val == "" | val == null) {
		$(".msg_r_confirm-password").text("비밀번호를 확인해주시길 바랍니다.");
		$(".msg_r_confirm-password").css('color', 'red');
	}
	else if (val != orgin) {
		$(".msg_r_confirm-password").text("비밀번호가 일치하지 않습니다.");
		$(".msg_r_confirm-password").css('color', 'red');
	}
	else {
		$(".msg_r_confirm-password").text("비밀번호가 일치합니다.");
		$(".msg_r_confirm-password").css('color', 'green');
	}
});

// 회원가입 - 전화번호 유효성 검사
$("#r_phone").focusout(function () {
	var val = $(this).val(),
		regex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
	if (val == "" | val == null) {
		$(".msg_r_phone").text("전화번호를 입력해주시길 바랍니다.");
		$(".msg_r_phone").css('color', 'red');
	}
	else if (!regex.test(val)) {
		$(".msg_r_phone").text("양식에 맞춰서 입력해주시길 바랍니다.ex) 010-1234-5678");
		$(".msg_r_phone").css('color', 'red');
	}
	else {
		$(".msg_r_phone").text("");
	}
});