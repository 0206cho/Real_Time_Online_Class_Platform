
$(function start() {
    let token = localStorage.getItem('access_token')
    console.log(token);
    let srv_id = localStorage.getItem('srv_id')
    console.log(srv_id);
    // let n_id = localStorage.getItem('n_id')
    // console.log(n_id);
    // console.log(data)

    var fail_msg = "접근 권한이 없습니다."

    // var n_id = location.href.substr( location.href.lastIndexOf('=') + 1 );
    var n_id = location.href.split('=')[1];

    console.log(n_id)
    
    // var n_name = data.list[i].n_name
            // var n_write = data.list[i].n_write
            // var n_id = data.list.n_id
            // // console.log(n_id)
            // console.log(n_name)
            // console.log(n_write)
            // console.log(n_id)

    $.ajax({
        headers: {
            "authorization": 'bearer ' + token,
        },
        type: "GET",
        url: "https://49.50.174.207:5000/server/notice?srv_id="+srv_id+"&n_id="+n_id,

        success: (data) => {

            console.log(data)
            list = data.list
            // console.log(data.list.user_name)

            // var n_id = data.list.n_id
            // for (i = 0; i < data.list.length; i++) {
            var user_name = data.list.user_name
            var notice_name = data.list.notice_name
            var notice_memo = data.list.notice_memo
            var notice_write = data.list.notice_write
            
            // console.log(n_id)
            console.log(user_name)
            console.log(notice_name)
            console.log(notice_memo)
            console.log(notice_write)
            

            var n_notice_select = 

            '<div class="row">'
            +'<div class="col-3" style="border: solid 1px ; background-color:#C3E1D2; height: 40px;">공지명</div>'
            +'<div class="col-9" style="border: solid 1px ; ">'+notice_name+'</div>'
        +'</div>'

        +'<div class="row">'
            +'<div class="col" style="border: solid 1px ; background-color:#C3E1D2; height: 30px;">작성자</div>'
            +'<div class="col" style="border: solid 1px ;">'+user_name+'</div>'
           +'<div class="col" style="border: solid 1px ; background-color:#C3E1D2;">작성일</div>'
            +'<div class="col" style="border: solid 1px ;">'+notice_write+'</div>'
        +'</div>'

        +'<div class="row">'
            +'<div class="col" style="border: solid 1px; height: 500px;">'+notice_memo+'</div>'
        +'</div>'

                 $("#n_select").html(n_notice_select)   
                }
                
            // }
            

        })
    // })
    

})