// 페이지 들어오자마자
$(function () {
    // alert("페이지 로딩")
    $.ajax({
        url: 'https://49.50.174.207:5000/home',
        type: 'get',
        // data: {
        // 	'email': email,
        // 	'pwd': password,
        // },
        success: function (res) {
            console.log(res)
            let result = res.result;
            let msg = res.msg;

            // if (result == 1) {
            //     alert(msg)

            // } else {
            //     alert(msg)
            // }
        },
        error: function (error) {
            console.log(error)
        },
        complete: function (data) {

        }
    });
});

// 로그아웃
$(function () {
    $('#logout').click(() => {

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
