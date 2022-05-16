//일정 추가
function addCalendar() {
    // console.log("aa")
    var content = $(".cal_content").val();
    var start_date = $(".cal_start_date").val();
    var end_date = $(".cal_end_date").val();
    var start_time = $(".cal_start_time").val();
    var end_time = $(".cal_end_time").val();



    if (start_date == "") {
        alert("시작 일을 입력하세요")
    } else if (start_time == "") {
        alert("시작 시간을 입력하세요")
    } else if (end_date == "") {
        alert("종료 일을 입력하세요")
    } else if (end_time == "") {
        alert("종료 시간을 입력하세요")
    } else if (content == null || content == "") {
        alert("글을 입력하세요")
    } else if (new Date(end_date) - new Date(start_date) < 0) { // date 타입으로 변경 후 확인
        alert("종료일을 시작일 이후로 지정해주세요.");
        // console.log("일자 다시 설정")
    }
    // else if ((end_time) - (start_time) < 0) {
    //     alert("종료 시간을 시작 시간 이후로 지정해주세요. ")
    //     // if (new Date(end_time) - new Date(start_time) < 0) {
    //     //     alert("종료 시간을 시작 시간 이후로 지정해주세요. ")
    //     // }
    // }  
    else {
        // console.log("입력 완료")
    }

    $(function () {
        $('.add_date_btn').click(() => {
            let token = localStorage.getItem('access_token')
            console.log(token);
            let srv_id = localStorage.getItem('srv_id')
            console.log(srv_id)
            alert('일정 추가')
            // var server_id = $('#server_id').val();
            // var server_id = server_id

            // console.log(server_id)
            console.log(start_date)
            console.log(start_time)
            console.log(end_date)
            console.log(end_time)
            console.log(content)

            var c_start = start_date + "T" + start_time + ":00"
            console.log(c_start)
            var c_end = end_date + "T" + end_time + ":00"
            console.log(c_end)


            $.ajax({
                headers: {
                    "authorization": 'bearer ' + token
                },
                type: "POST",
                url: "https://49.50.174.207:5000/server/calendar/add?srv_id=" + srv_id,//  url
                dataType: "json",

                data: {

                    "srv_id": srv_id,
                    "c_start": c_start,
                    "c_end": c_end,
                    "c_memo": content
                },


                success: (data) => {
                    console.log(data)
                    let result = data.result;
                    if (result == "1") {
                        $('.addDate').modal('hide');
                        window.location.reload(); // 새로고침

                    } else {
                        alert("오류가 발생하였습니다. 다시 실행해주시길 바랍니다.")
                    }

                },

                error: function () {
                    console.log("error")
                },
                complete: function (data) {

                }


            })
        })
    })


}



// 공지 추가
function addNotice() {
    // console.log("aa")
    var notice_name = $(".nt_title").val();
    var notice_memo = $(".nt_content").val();

    if (notice_name == null || notice_name == "") {
        alert("공지 명을 입력하세요")
    } else if (notice_memo == null || notice_memo == "") {
        alert("공지 글을 입력하세요")
    } else {
        // console.log("입력 완료")
    }

    $(function () {

        $('.add_notice_btn').click(() => {
            let token = localStorage.getItem('access_token')
            console.log(token);
            let srv_id = localStorage.getItem('srv_id')
            console.log(srv_id)
            alert('공지 추가')

            console.log(notice_name)
            console.log(notice_memo)

            $.ajax({
                headers: {
                    "authorization": 'bearer ' + token
                },
                type: "POST",
                url: "https://49.50.174.207:5000/server/notice/add?srv_id=" + srv_id,//  url
                dataType: "json",
                
                data: {

                    "srv_id": srv_id,
                    "n_name": notice_name,
                    "n_memo": notice_memo,
                },


                success: (data) => {
                    console.log(data)
                    let result = data.result;
                    if (result == "1") {
                        $('.addNotice').modal('hide');
                        window.location.reload(); // 새로고침

                    } else {
                        alert("오류가 발생하였습니다. 다시 실행해주시길 바랍니다.")
                    }

                },

                error: function () {
                    console.log("error")
                },
                complete: function (data) {

                }


            })

        })
    })

}
