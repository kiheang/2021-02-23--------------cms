function validator()
{	
	$("#aform").validate({
		onkeyup : false,
		onfocusout : false,
		onclick : false,
		rules : {
			busiplcd : { required : true },
			srt_ord : { required : true, number : true, checkDup : true },
			bf_start_hm : { required : true, checkTime : true, maxlength : 4, minlength : 4 },
			bf_end_hm : { required : true, checkTime : true, maxlength : 4, minlength : 4 },
			lc_start_hm : { required : true, checkTime : true, maxlength : 4, minlength : 4 },
			lc_end_hm : { required : true, checkTime : true, maxlength : 4, minlength : 4 },
			dn_start_hm : { required : true, checkTime : true, maxlength : 4, minlength : 4 },
			dn_end_hm : { required : true, checkTime : true, maxlength : 4, minlength : 4 },
			mn_start_hm : { required : true, checkTime : true, maxlength : 4, minlength : 4 },
			mn_end_hm : { required : true, checkTime : true, maxlength : 4, minlength : 4 },
			fc_end_hm_bf : { required : true, checkTime : true, maxlength : 4, minlength : 4 },
			fc_end_hm_lc : { required : true, checkTime : true, maxlength : 4, minlength : 4 },
			fc_end_hm_dn : { required : true, checkTime : true, maxlength : 4, minlength : 4 },
			fc_end_hm_mn : { required : true, checkTime : true, maxlength : 4, minlength : 4 },
			branch_outln : { maxlength : 2000 },
			up_mobile_busiplnm : { required : true, maxlength : 26 },
			up_mobile_busiplnm_cn : { required : true, maxlength : 26 },
			mobile_busiplnm : { required : true, maxlength : 26 },
			mobile_busiplnm_cn : { required : true, maxlength : 26 },
			busipl_srt_ord : { required : true, number : true, checkDup : true },
		},
		messages : {
			busiplcd : {
				required : "门店是必须. 请查询",
			},
			srt_ord : {
				required : "输入排列顺序",
				number : "输入数字",
				checkDup : "排列顺序不可一致",
			},
			bf_start_hm : {
				required : "输入早餐时间",
				maxlength : "早餐时间输入{0}字内",
				minlength : "早餐时间请输入 {0}字以上",
			},
			bf_end_hm : {
				required : "输入早餐时间",
				maxlength : "早餐时间输入{0}字内",
				minlength : "早餐时间请输入 {0}字以上",
			},
			lc_start_hm : {
				required : "输入午餐时间",
				maxlength : "午餐时间输入{0}字内",
				minlength : "午餐时间请输入 {0}字以上",
			},
			lc_end_hm : {
				required : "输入午餐时间",
				maxlength : "午餐时间输入{0}字内",
				minlength : "午餐时间请输入 {0}字以上",
			},
			dn_start_hm : {
				required : "输入晚餐时间",
				maxlength : "晚餐时间输入{0}字内",
				minlength : "晚餐时间请输入 {0}字以上",
			},
			dn_end_hm : {
				required : "输入晚餐时间",
				maxlength : "晚餐时间输入{0}字内",
				minlength : "晚餐时间请输入 {0}字以上",
			},
			mn_start_hm : {
				required : "请输入(夜餐，间餐)时间",
				maxlength : "夜餐，间餐请输入{0}以下的数字",
				minlength : "夜餐，间餐时间请输入 {0}字以上",
			},
			mn_end_hm : {
				required : "请输入(夜餐，间餐)时间",
				maxlength : "夜餐，间餐请输入{0}以下的数字",
				minlength : "夜餐，间餐时间请输入 {0}字以上",
			},
			fc_end_hm_bf : {
				required : "输入餐数预测(早餐)时间",
				maxlength : "餐数预测(早餐)时间输入{0}字内",
				minlength : "预估餐数（早餐）时间请输入 {0}字以上",
			},
			fc_end_hm_lc : {
				required : "输入餐数预测(午餐)时间",
				maxlength : "餐数预测(午餐)时间输入{0}字内",
				minlength : "预估餐数（午餐）时间请输入 {0}字以上",
			},
			fc_end_hm_dn : {
				required : "输入餐数预测(晚餐)时间",
				maxlength : "餐数预测(晚餐)时间输入{0}字内",
				minlength : "预估餐数（晚餐）时间请输入 {0}字以上",
			},
			fc_end_hm_mn : {
				required : "请输入(夜餐，间餐)时间",
				maxlength : "餐数预测(夜餐，间餐)时间请输入在{0}数字以下",
				minlength : "预估餐数（夜餐，间餐）时间请输入 {0}字以上",
			},
			branch_outln : {
				maxlength : "门店概况输入{0}字内",
			},
			up_mobile_busiplnm : {
				required : "输入应用程序门店(韩语)",
				maxlength : "应用程序门店(韩语)输入{0}字内",
			},
			up_mobile_busiplnm_cn : {
				required : "输入应用程序门店(汉语)",
				maxlength : "应用程序门店(汉语)输入{0}字内",
			},
			mobile_busiplnm : {
				required : "输入应用程序门店(韩语)",
				maxlength : "应用程序门店(韩语)输入{0}字内",
			},
			mobile_busiplnm_cn : {
				required : "输入应用程序门店(汉语)",
				maxlength : "应用程序门店(汉语)输入{0}字内",
			},
			busipl_srt_ord : {
				required : "输入排列顺序",
				checkNum : "输入数字",
				checkDup : "排列顺序不可一致",
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
	
	// 시간 형식 확인
	$.validator.addMethod("checkTime",function(value){
		var h = value.slice(0, 2);
		var m = value.slice(2, 4);
		
		if(/*h >= 0 && h < 24 &&*/ m >= 0 && m < 60){
			return true;
		}
		
		return false;
	},"中정상적인 시간이 아닙니다.");
}