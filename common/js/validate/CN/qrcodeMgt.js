function validator()
{	
	$("#aform").validate({
		onkeyup : false,
		onfocusout : false,
		onclick : false,
		rules : {
			code_size : { number : true },
			code_padding : { number : true },
			code_margin : { number : true },
			code_cnts : { required : true, maxlength : 200 },
			busiplcd : { required : false, maxlength : 5, checkEngNum : true },
			busiplnm : { required : false, maxlength : 100 },
			upload : { accept: 'image/*', filesize : MAX_SIZE_IMG },
		},
		messages : {
			code_size : {
				number : "编码大小只能用数字",
			},
			code_padding : {
				number : "编码内部空白只能用数字",
			},
			code_margin : {
				number : "编码外面空白只能输入数字",
			},
			code_cnts : {
				required : "输入内容",
				maxlength : "内容输入{0}字内",
			},
			busiplcd : {
				maxlength : "门店编码输入{0}字内",
				checkEngNum : "输入门店编码只能用英文和数字",
			},
			busiplnm : {
				maxlength : "门店名输入{0}字内",
			},
			upload : {
				accept : '只能登记图像文件',
				filesize : '文件不能超过 ' + MAX_SIZE_IMG_STR
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