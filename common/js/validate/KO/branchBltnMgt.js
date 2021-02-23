function validator()
{	
	$("#aform").validate({
		onkeyup : false,
		onfocusout : false,
		onclick : false,
		rules : {
			ttl : { required : true, maxlength : 250 },
			cnts : { /*required : true,*/ maxlength : 2000 },
			push_date_m : { checkMin : true },
			push_date_ymd : { checkEmpty : true },
			disp_start_ymd : {required : true},
			disp_end_ymd : {required : true},
			upload : { checkExt : true, eachfilesize : MAX_SIZE },
		},
		messages : {
			ttl : {
				required : "제목을 입력해 주세요.",
				maxlength : "제목은 {0}자 이하로 넣어주십시오.",
			},
			cnts : {
				required : "내용을 입력해 주세요.",
				maxlength : "내용은 {0}자 이하로 넣어주십시오.",
			},
			push_date_m : {
				checkMin : "1 과 60 사이만 넣어주십시오."
			},
			push_date_ymd : {
				checkEmpty : "날짜를 입력해주십시오."
			},
			disp_start_ymd : {
				required : "게시시작일을 선택해 주세요.",
			},
			disp_end_ymd : {
				required : "게시종료일을 선택해 주세요.",
			},
			upload : {
				checkExt : EXCEPT_EXT + "는 등록할수 없는 첨부파일입니다.",
				eachfilesize : '파일 사이즈는 ' + MAX_SIZE_STR + ' 를 넘을수 없습니다.'
			},
		}
		, showErrors : function(error, element){
			if(element.length > 0){
				alert(element[0].message);
				element[0].element.focus();
			}
		}
		, submitHandler : function(form){
			form.submit();
		}
	});
	
	// 시간 형식 확인
	$.validator.addMethod("checkMin",function(value){
		var m = parseInt(value, 10);
		
		if(m >= 0 && m <= 60){
			return true;
		}
		return false;
	},"1 과 60 사이만 넣어주십시오.");
	
	// 예약발송인경우
	$.validator.addMethod("checkEmpty",function(value){
		// 예약 발송일경우 체크
		if(!$('#push_date_wrap').hasClass('none')){
			if(value == ''){
				return false;
			}
		}
		
		return true;
	},"날짜를 입력해주십시오.");
}