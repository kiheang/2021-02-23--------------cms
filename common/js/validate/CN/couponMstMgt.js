function validator()
{	
	$("#aform").validate({
		onkeyup : false,
		onfocusout : false,
		onclick : false,
		rules : {
			coupon_nm : { required : true, maxlength : 100 },
			upload : { required : true, accept: 'image/*', filesize : MAX_SIZE_IMG },
			upload2 : { required : true, accept: 'image/*', filesize : MAX_SIZE_IMG },
		},
		messages : {
			coupon_nm : {
				required : "输入优惠券名",
				maxlength : "优惠券名输入{0}字内",
			},
			upload : {
				required : "输入未使用图像",
				accept : '只能登记图像文件',
				filesize : '文件不能超过 ' + MAX_SIZE_IMG_STR
			},
			upload2 : {
				required : "输入使用图像",
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