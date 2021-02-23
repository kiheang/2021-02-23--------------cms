function validator()
{	
	$("#aform").validate({
		onkeyup : false,
		onfocusout : false,
		onclick : false,
		rules : {
			answ : { required : true, maxlength : 2000 },
		},
		messages : {
			answ : {
				required : "답변을 입력해 주세요.",
				maxlength : "답변은 {0}자 이하로 넣어주십시오.",
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