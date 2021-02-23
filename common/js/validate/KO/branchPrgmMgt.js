function validator()
{	
	$("#aform").validate({
		onkeyup : false,
		onfocusout : false,
		onclick : false,
		rules : {
			busiplcd : { required : true },
			srt_ord : { required : true, checkNum : true, checkDup : true },
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
			busipl_srt_ord : { required : true, checkNum : true, checkDup : true },
		},
		messages : {
			busiplcd : {
				required : "점포는 필수 입니다. 검색해 주세요.",
			},
			srt_ord : {
				required : "정렬순서를 입력해 주세요.",
				checkNum : "숫자만 입력해 주세요.",
				checkDup : "정렬순서는 같을수 없습니다.",
			},
			bf_start_hm : {
				required : "아침시간을 입력해 주세요.",
				maxlength : "아침시간은 {0}자 이하로 넣어주십시오.",
				minlength : "아침시간은 {0}자 이상으로 넣어주십시오.",
			},
			bf_end_hm : {
				required : "아침시간을 입력해 주세요.",
				maxlength : "아침시간은 {0}자 이하로 넣어주십시오.",
				minlength : "아침시간은 {0}자 이상으로 넣어주십시오.",
			},
			lc_start_hm : {
				required : "점심시간을 입력해 주세요.",
				maxlength : "점심시간은 {0}자 이하로 넣어주십시오.",
				minlength : "점심시간은 {0}자 이상으로 넣어주십시오.",
			},
			lc_end_hm : {
				required : "점심시간을 입력해 주세요.",
				maxlength : "점심시간은 {0}자 이하로 넣어주십시오.",
				minlength : "점심시간은 {0}자 이상으로 넣어주십시오.",
			},
			dn_start_hm : {
				required : "저녁시간을 입력해 주세요.",
				maxlength : "저녁시간은 {0}자 이하로 넣어주십시오.",
				minlength : "저녁시간은 {0}자 이상으로 넣어주십시오.",
			},
			dn_end_hm : {
				required : "저녁시간을 입력해 주세요.",
				maxlength : "저녁시간은 {0}자 이하로 넣어주십시오.",
				minlength : "저녁시간은 {0}자 이상으로 넣어주십시오.",
			},
			mn_start_hm : {
				required : "야식,간식시간을 입력해 주세요.",
				maxlength : "야식,간식시간은 {0}자 이하로 넣어주십시오.",
				minlength : "야식,간식시간은 {0}자 이상으로 넣어주십시오.",
			},
			mn_end_hm : {
				required : "야식,간식시간을 입력해 주세요.",
				maxlength : "야식,간식시간은 {0}자 이하로 넣어주십시오.",
				minlength : "야식,간식시간은 {0}자 이상으로 넣어주십시오.",
			},
			fc_end_hm_bf : {
				required : "식수예측(아침)시간을 입력해 주세요.",
				maxlength : "식수예측(아침)시간은 {0}자 이하로 넣어주십시오.",
				minlength : "식수예측(아침)시간은 {0}자 이상으로 넣어주십시오.",
			},
			fc_end_hm_lc : {
				required : "식수예측(점심)시간을 입력해 주세요.",
				maxlength : "식수예측(점심)시간은 {0}자 이하로 넣어주십시오.",
				minlength : "식수예측(점심)시간은 {0}자 이상으로 넣어주십시오.",
			},
			fc_end_hm_dn : {
				required : "식수예측(저녁)시간을 입력해 주세요.",
				maxlength : "식수예측(저녁)시간은 {0}자 이하로 넣어주십시오.",
				minlength : "식수예측(저녁)시간은 {0}자 이상으로 넣어주십시오.",
			},
			fc_end_hm_mn : {
				required : "식수예측(야식,간식)시간을 입력해 주세요.",
				maxlength : "식수예측(야식,간식)시간은 {0}자 이하로 넣어주십시오.",
				minlength : "식수예측(야식,간식)시간은 {0}자 이상으로 넣어주십시오.",
			},
			branch_outln : {
				maxlength : "점포개요는 {0}자 이하로 넣어주십시오.",
			},
			up_mobile_busiplnm : {
				required : "앱 점포명(국문)을 입력해 주세요.",
				maxlength : "앱 점포명(국문)은 {0}자 이하로 넣어주십시오.",
			},
			up_mobile_busiplnm_cn : {
				required : "앱 점포명(중문)을 입력해 주세요.",
				maxlength : "앱 점포명(중문)은 {0}자 이하로 넣어주십시오.",
			},
			mobile_busiplnm : {
				required : "앱 점포명(국문)을 입력해 주세요.",
				maxlength : "앱 점포명(국문)은 {0}자 이하로 넣어주십시오.",
			},
			mobile_busiplnm_cn : {
				required : "앱 점포명(중문)을 입력해 주세요.",
				maxlength : "앱 점포명(중문)은 {0}자 이하로 넣어주십시오.",
			},
			busipl_srt_ord : {
				required : "정렬순서를 입력해 주세요.",
				checkNum : "숫자만 입력해 주세요.",
				checkDup : "정렬순서는 같을수 없습니다.",
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
	},"정상적인 시간이 아닙니다.");
}