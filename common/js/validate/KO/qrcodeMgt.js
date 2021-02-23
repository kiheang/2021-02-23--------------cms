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
				number : "코드사이즈는 숫자만 가능합니다.",
			},
			code_padding : {
				number : "코드안쪽여백은 숫자만 가능합니다.",
			},
			code_margin : {
				number : "코드바깥쪽여백은 숫자만 가능합니다.",
			},
			code_cnts : {
				required : "내용을 입력해 주세요.",
				maxlength : "내용은 {0}자 이하로 넣어주십시오.",
			},
			busiplcd : {
				maxlength : "점포코드는 {0}자 이하로 넣어주십시오.",
				checkEngNum : "점포코드는 영문, 숫자만 입력해 주세요.",
			},
			busiplnm : {
				maxlength : "점포명은 {0}자 이하로 넣어주십시오.",
			},
			upload : {
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