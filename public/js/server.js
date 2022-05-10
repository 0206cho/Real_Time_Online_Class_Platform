$(() => {
  $("#addDate_btn").click(function () {
    let token = localStorage.getItem('access_token')
    console.log(token);

    $.ajax({
        headers: {
          "authorization": 'bearer ' + token
        },
        type: "POST",
        url: "https://49.50.174.207:5000/server/calendar/add?srv_id=33",//  url
        dataType: "json",
        success: (data) => {
            console.log(data)
        },
        error:(data) =>{
        console.error();
 }
    })

  })

})
