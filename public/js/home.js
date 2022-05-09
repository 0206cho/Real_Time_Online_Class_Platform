// 페이지 들어오자마자
$(function () {
    let token = localStorage.getItem('access_token')
    console.log(token);

    $.ajax({
        headers:{
            "authorization":'bearer '+ token,
        },
        type: 'GET',
        url: 'https://49.50.174.207:5000/home',
        
        success: (data) => {
            console.log('성공')
            console.log(data)
            let result = data.result;
			let msg = data.msg;
            srv_name = data.list[0].srv_name;
            $("#srv_name").text(srv_name);
            calendar_start = data.list[0].calendar_start;
            $("#calendar_start").text(calendar_start);
            console.log('바껴')
        },
        error: (error) =>{
            console.log('실패')
            console.log(error)
        },
    });
    

//     let token = localStorage.getItem('access_token') || '';

// fetch('https://49.50.174.207:5000/home', {
//   headers: {
//       'Authorization': token,
//   }
// })
// .then(response => response.json())
// .then(response => {
//    console.log(response.data);
// })
    // alert("페이지 로딩")
    // token_receive = request.cookies.get('token')
    // console.log(token_receive)
    // $.ajax({
    //     url: 'https://49.50.174.207:5000/home',
    //     type: 'get',
    //     data: {
    //     // 	'email': email,
    //     // 	'pwd': password,
    //     },
    //     success: function (res) {
    //         console.log(res)
    //         let result = res.result;
    //         let msg = res.msg;

    //         // if (result == 1) {
    //         //     alert(msg)

    //         // } else {
    //         //     alert(msg)
    //         // }
    //     },
    //     error: function (error) {
    //         console.log(error)
    //     },
    //     complete: function (data) {

    //     }
    // });

    // $.ajax({
    //     token_receive : data.cookies.get('mytoken'),
    //     headers:{            
    //         "authorization" : 'bearer', token_receive
    //     },
    //     url: 'https://49.50.174.207:5000/home',
    //     type: 'get',
    //     success: (data) => {
    //         alert('성공')
    //         console.log(data)
    //         alert(data)
    //     },
    //     error: (error) => {
    //         console.log(error)
    //         alert(error)
    //     },
    // });



});


// 로그아웃
$(function () {
    $('#logout').click(() => {
        // $.removeCookie('mytoken', {path: '/'});
        // alert('로그아웃!')
        // window.location.href = "/"

        $.ajax({
            url: 'https://49.50.174.207:5000/logout',
            type: 'post',
            data: {
            },
            success: function (res) {
                let result = res.result;
                let msg = res.msg;

                if (result == 1) {
                    alert(msg)
                } else {
                    alert(msg)
                }
            },
            error: function (error) {
                console.log(error)
            },
            complete: function (data) {

            }
        })
    });
});

// 서버추가 버튼
$(function () {
    // alert("ssdsd")
    $('#sever_add').click(() => {
        alert('dd')
        console.log("ss")
        var server_name = $('#server_name').val();

        $.ajax({
            url: 'https://49.50.174.207:5000/server/add',
            type: 'post',
            data: {
                'srv_name': server_name,
            },
            success: function (res) {
                let result = res.result;
                let msg = res.msg;

                // if (result == 1) {
                //     alert(msg)
                // } else {
                //     alert(msg)
                // }

                alert(msg)
            },
            error: function (error) {
                console.log(error)
            },
            complete: function (data) {

            }
        });
    });
});
