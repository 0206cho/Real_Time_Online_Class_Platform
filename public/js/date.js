
$(() => {
  // $(".sbb_date").click(function () {
  let token = localStorage.getItem('access_token')
  console.log(token);

  var aa = {
    'title': '캡스톤 수업',
    start: '2022-04-13',
  };

  // calendar element 취득
  var calendarEl = $('#calendar')[0];
  // full-calendar 생성하기
  var calendar = new FullCalendar.Calendar(calendarEl, {
    // height: '700px', // calendar 높이 설정
    height: '560px', // calendar 높이 설정
    expandRows: true, // 화면에 맞게 높이 재설정
    slotMinTime: '08:00', // Day 캘린더에서 시작 시간
    slotMaxTime: '22:00', // Day 캘린더에서 종료 시간
    eventColor: '#c3d9cd',
    // 해더에 표시할 툴바
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    initialView: 'dayGridMonth', // 초기 로드 될때 보이는 캘린더 화면(기본 설정: 달)
    // navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
    editable: false, // 수정 가능?
    // selectable: true, // 달력 일자 드래그 설정가능
    nowIndicator: true, // 현재 시간 마크
    dayMaxEvents: true, // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
    locale: 'ko', // 한국어 설정
    eventAdd: function (obj) { // 이벤트가 추가되면 발생하는 이벤트
      console.log(obj);
    },
    eventChange: function (obj) { // 이벤트가 수정되면 발생하는 이벤트
      console.log(obj);
    },
    eventRemove: function (obj) { // 이벤트가 삭제되면 발생하는 이벤트
      console.log(obj);
    },

    eventClick: function (obj) {
      console.log(obj.event._def.publicId)
      var c_id = obj.event._def.publicId
      $.ajax({

        headers: {
          "authorization": 'bearer ' + token,
        },
        type: "GET",
        url: "https://49.50.174.207:5000/server/calendar?srv_id=33&c_id=" + c_id,//  url
        dataType: "json",
        success: (data) => {
          // console.log(data.list)
          // console.log(data.list.c_start)
          // console.log(data.list.c_end)

          // $("#modal_event").text(data.list)
          var list = data.list
          var cal_start = data.list.c_start
          var cal_end = data.list.c_end

          var now = new Date();
          var year = now.getFullYear(); // 연도
          var month = now.getMonth() + 1;	// 월
          var date = now.getDate();	// 일
          var hours = now.getHours();	// 시간
          var minutes = now.getMinutes();	// 분
          var time = year + "-" + 0 + month + "-" + date + " " + hours + ":" + minutes
          // console.log(time) 

          var video_btn = "";
          var state = "";
          if (time < cal_start) {
            console.log("진행 전");
            state = "진행 전"
            video_btn = +'<button type="button" class="btn event_btn" onclick=\'location.href="https://49.50.174.207:5000/join/' + list.video_id + '"\' style="display:none;">전</>'

          } else if (time >= cal_start && time <= cal_end) {
            console.log("진행 중");
            state = "진행 중"
            video_btn = +'<button type="button" class="btn event_btn" onclick=\'location.href="https://49.50.174.207:5000/join/' + list.video_id + '"\'>참여하기</>'

          } else if (time > cal_end) {
            console.log("진행 완료");
            state = "진행 완료"
            video_btn = +'<button type="button" class="btn event_btn" onclick=\'location.href="https://49.50.174.207:5000/join/' + list.video_id + '"\' style="display:none;">후</>'

          }

          var c_modal =
            '<h5 class="modal-title" style="font-weight: bold;">' + list.c_memo + '</h5>'
            + '<div class="modal-body">'
            + '<div class="mb-3">'
            + '<label for="server-name" class="col-form-label">진행 시간 : <br>' + list.c_start + ' ~ ' + list.c_end + ' </label>'
            + '<br><label for="server-name" class="col-form-label">진행 상황 : ' + state + ' </label>'
            + ' </div>'
            + ' </div>'

          var video = '<button type="button" class="btn event_btn" onclick=\'location.href="https://49.50.174.207:5000/join/' + list.video_id + '"\'' + video_btn + '</button>';

          $("#mdal_top").html(c_modal)
          $("#modal_video").html(video)

        }
      })

      function modal10(id) {
        var zIndex = 9999;
        var modal = document.getElementById(id);

        // 모달 div 뒤에 희끄무레한 레이어
        var bg = document.createElement('div');
        bg.setStyle({
          position: 'fixed',
          zIndex: zIndex,
          left: '0px',
          top: '0px',
          width: '100%',
          height: '100%',
          overflow: 'auto',
          // 레이어 색갈은 여기서 바꾸면 됨
          backgroundColor: 'rgba(0,0,0,0.4)'
        });
        document.body.append(bg);

        // 닫기 버튼 처리, 시꺼먼 레이어와 모달 div 지우기
        modal.querySelector('.event_close_btn').addEventListener('click', function () {
          bg.remove();
          modal.style.display = 'none';
        });

        modal.setStyle({
          position: 'fixed',
          display: 'block',
          // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

          // 시꺼먼 레이어 보다 한칸 위에 보이기
          zIndex: zIndex + 1,

          // div center 정렬
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          msTransform: 'translate(-50%, -50%)',
          webkitTransform: 'translate(-50%, -50%)'
        });
      }

      // 모달창 띄우기
      modal10('modal_event');

      // Element 에 style 한번에 오브젝트로 설정하는 함수 추가
      Element.prototype.setStyle = function (styles) {
        for (var k in styles) this.style[k] = styles[k];
        return this;

      };



    },

    // 이벤트 
    events:
      [
        aa,

        $.ajax({
          // headers: {
          //   "authorization": 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTY1MjE0Mzc4OSwiZXhwIjoxNjUyMTUwOTg5fQ.qe4OvfXnWut6j8fSORlMx00WjfDDyGY9A7PEm_grU58'//          token
          // },
          headers: {
            "authorization": 'bearer ' + token,
          },
          type: "GET",
          // url: "https://49.50.174.207:5000/server/calendar",//  url
          url: "https://49.50.174.207:5000/server/calendar?srv_id=33",//  url
          dataType: "json",
          // contentType: "application/x-www-form-urlencoded",
          success: (data) => {
            // console.log(data)
            list = data.list
            for (i = 0; i < list.length; i++) {
              calendar.addEvent({

                id: list[i]['c_id'],
                title: list[i]['c_memo'],
                start: list[i]['c_start'],
                end: list[i]['c_end']

              })
            }
          }
        })
      ]

  });
  // 캘린더 랜더링
  calendar.render();
  
})