function validator()
{	
	$("#aform").validate({
		onkeyup : false,
		onfocusout : false,
		onclick : false,
		rules : {
			ttl : { required : true, maxlength : 250 },
			cnts : { /*required : true,*/ maxlength : 2000 },
			upload : { checkExt : true, eachfilesize : MAX_SIZE },
			push_date_m : { checkMin : true },
			push_date_ymd : { checkEmpty : true },
			disp_start_ymd : {required : true},
			disp_end_ymd : {required : true},
			appl_start_ymd : { required : true },
			appl_end_ymd : { required : true },
			max_appl_cnt : { required : true, number : true },
			per_max_appl_cnt : { required : true, number : true, compareVal : true },
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
			upload : {
				checkExt : EXCEPT_EXT + " 是不能添加的文件形式",
				eachfilesize : '文件不能超过 ' + MAX_SIZE_STR
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
			appl_start_ymd : {
				required : "请选择申请开始日",
			},
			appl_end_ymd : {
				required : "请选择申请终止日",
			},
			max_appl_cnt : {
				required : "请输入最大申请个数",
				number : "输入数字",
			},
			per_max_appl_cnt : {
				required : "请输入个人最大申请个数。",
				number : "输入数字",
				compareVal : "个人别最多申请数不可大于最多申请数量",
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
	
	// 최대신청개수와 개인별 최대 신청 개수 비교
	$.validator.addMethod("compareVal",function(value){
		if(parseInt($('[name=max_appl_cnt]').val(), 10) < parseInt($('[name=per_max_appl_cnt]').val(), 10)){
			return false;
		}
		return true;
	},"");
}