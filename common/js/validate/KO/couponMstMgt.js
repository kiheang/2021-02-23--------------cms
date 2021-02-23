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
				required : "쿠폰명을 입력해 주세요.",
				maxlength : "쿠폰명은 {0}자 이하로 넣어주십시오.",
			},
			upload : {
				required : "미사용이미지를 입력해 주세요.",
				accept : '이미지파일만 등록하실수 있습니다.',
				filesize : '파일 사이즈는 ' + MAX_SIZE_IMG_STR + ' 를 넘을수 없습니다.'
			},
			upload2 : {
				required : "사용이미지를 입력해 주세요.",
				accept : '이미지파일만 등록하실수 있습니다.',
				filesize : '파일 사이즈는 ' + MAX_SIZE_IMG_STR + ' 를 넘을수 없습니다.'
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