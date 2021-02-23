function validator()
{	
	$("#aform").validate({
		onkeyup : false,
		onfocusout : false,
		onclick : false,
		rules : {
			user_id : { required : true, maxlength : 20 },
			user_nm : { required : true, maxlength : 20 },
			stats_code : { required : true },
			user_div_cd : { required : true },
			auth_id : { required : true },
			comp_cd : { required : true },
			auth_start_ymd : { required : true },
			auth_end_ymd : { required : true },
		},
		messages : {
			user_id : {
				required : "id를 입력해 주세요.",
				maxlength : "id는 {0}자 이하로 넣어주십시오.",
			},
			user_nm : {
				required : "사용자명을 입력해 주세요.",
				maxlength : "사용자명은 {0}자 이하로 넣어주십시오.",
			},
			stats_code : {
				required : "상태를 입력해 주세요.",
			},
			user_div_cd : {
				required : "사용자구분코드를 입력해 주세요.",
			},
			auth_id : {
				required : "권한명을 입력해 주세요.",
			},
			comp_cd : {
				required : "회사구분을 입력해 주세요.",
			},
			auth_start_ymd : {
				required : "시작일을 선택해 주세요.",
			},
			auth_end_ymd : {
				required : "종료일을 선택해 주세요.",
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
}