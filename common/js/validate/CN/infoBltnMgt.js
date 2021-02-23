function validator()
{	
	$("#aform").validate({
		onkeyup : false,
		onfocusout : false,
		onclick : false,
		rules : {
			ttl : { required : true, maxlength : 250 },
			cnts : { /*required : true,*/ maxlength : 2000 },
			upload : { checkExt : true, accept: 'image/*', eachfilesize : MAX_SIZE_IMG },
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
				accept : '只能登记图像文件',
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
}