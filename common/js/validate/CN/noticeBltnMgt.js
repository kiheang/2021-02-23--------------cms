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
				required : "输入题目",
				maxlength : "题目输入{0}字内",
			},
			cnts : {
				required : "输入内容",
				maxlength : "内容输入{0}字内",
			},
			push_date_m : {
				checkMin : "请输入1-60间的数字"
			},
			push_date_ymd : {
				checkEmpty : "请输入日期"
			},
			disp_start_ymd : {
				required : "请选择告示起始日",
			},
			disp_end_ymd : {
				required : "请选择告示终止日",
			},
			upload : {
				checkExt : EXCEPT_EXT + " 是不能添加的文件形式",
				eachfilesize : '文件不能超过 ' + MAX_SIZE_STR
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
	
	// 시간 형식 확인
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