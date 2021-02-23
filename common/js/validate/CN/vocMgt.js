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
				required : "输入答辩",
				maxlength : "答辩输入{0}字内",
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