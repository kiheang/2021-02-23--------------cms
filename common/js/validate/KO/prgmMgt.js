function validator()
{	
	$("#aform").validate({
		onkeyup : false,
		onfocusout : false,
		onclick : false,
		rules : {
			srt_ord : { required : true, checkNum : true, checkDup : true },
			branch_outln : { maxlength : 2000 },
			branch_outln_cn : { maxlength : 2000 },
		},
		messages : {
			srt_ord : {
				required : "정렬순서를 입력해 주세요.",
				checkNum : "숫자만 입력해 주세요.",
				checkDup : "정렬순서는 같을수 없습니다.",
			},
			branch_outln : {
				maxlength : "점포개요는 {0}자 이하로 넣어주십시오.",
			},
			branch_outln_cn : {
				maxlength : "점포개요는 {0}자 이하로 넣어주십시오.",
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