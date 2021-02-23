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
				required : "输入劈裂顺序",
				checkNum : "输入数字",
				checkDup : "排列顺序不可一致",
			},
			branch_outln : {
				maxlength : "门店概况输入{0}字内",
			},
			branch_outln_cn : {
				maxlength : "门店概况输入{0}字内",
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