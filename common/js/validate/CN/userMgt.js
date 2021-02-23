function validator()
{	
	$("#aform").validate({
		onkeyup : false,
		onfocusout : false,
		onclick : false,
		rules : {
			user_id : { required : true, maxlength : 20 },
			user_nm : { required : true, maxlength : 20 },
			stats_code : { required : true },
			user_div_cd : { required : true },
			auth_id : { required : true },
			comp_cd : { required : true },
			auth_start_ymd : { required : true },
			auth_end_ymd : { required : true },
		},
		messages : {
			user_id : {
				required : "输入id",
				maxlength : "id登入{0}字内",
			},
			user_nm : {
				required : "输入用户名",
				maxlength : "用户名输入{0}字内",
			},
			stats_code : {
				required : "输入状态",
			},
			user_div_cd : {
				required : "输入用户区分编码",
			},
			auth_id : {
				required : "输入权限名",
			},
			comp_cd : {
				required : "输入公司分类",
			},
			auth_start_ymd : {
				required : "请选择开始日期",
			},
			auth_end_ymd : {
				required : "请选择完成日",
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