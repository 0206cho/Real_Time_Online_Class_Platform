// 페이지 들어오자마자
$(function start() {
    let token = localStorage.getItem('access_token')
    console.log(token);

    $.ajax({
        headers: {
            "authorization": 'bearer ' + token,
        },
        type: 'GET',
        url: 'https://49.50.174.207:5000/home',

        success: (data) => {
            console.log(data)

            var c_modal = "<div class='row'>  ";

            for (var i = 0; i <= data.list.length; i++) { //시작시간 설정 안되어있는 경우 null -> 예약없음
                if(data.list[i].calendar_start == null){
                    data.list[i].calendar_start = "예약없음"
                }

                c_modal = c_modal +
                    '<div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 1rem;">'
                    + '<div class="card" width="100%" height="225">'
                    + '<div class="card-body">'
                    + '<h5 class="card-title" id="srv_name" style="font-weight: bold;">'+data.list[i].srv_name+'</h5>'
                    + '다음 미팅<div>'
                    + '<svg class="bi me-1 mr-2" width="1em" height="1em">'
                    + '<use xlink:href="#calendar-event" />'
                    + '</svg>'
                    + '<label id="calendar_start">'+data.list[i].calendar_start+'</label></div>'
                    + '<a href="../views/notice.html" class="btn btn-enter">접속하기</a>'
                    + '</div></div></div>'
                $("#serverlist").html(c_modal)
            }
            c_modal += "</div>"

            $("#serverlist").html(c_modal)

        },
        error: (error) => {
            console.log('실패')
            console.log(error)
        },
    });



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
