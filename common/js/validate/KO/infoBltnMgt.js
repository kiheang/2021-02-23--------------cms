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
				required : "제목을 입력해 주세요.",
				maxlength : "제목은 {0}자 이하로 넣어주십시오.",
			},
			cnts : {
				required : "내용을 입력해 주세요.",
				maxlength : "내용은 {0}자 이하로 넣어주십시오.",
			},
			upload : {
				checkExt : EXCEPT_EXT + "는 등록할수 없는 첨부파일입니다.",
				accept : '이미지파일만 등록하실수 있습니다.',
				eachfilesize : '파일 사이즈는 ' + MAX_SIZE_STR + ' 를 넘을수 없습니다.'
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