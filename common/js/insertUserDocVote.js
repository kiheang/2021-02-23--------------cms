
	$(function(){
		//달력 한글 세팅	
		settingdatepickerko();
		$(".s_inp_btn").addClass("on");
		$(".step02").addClass("off");
		$(".step03").addClass("off");
		
		
		$('#sch_st_date').datepicker({ 
			 dateFormat: 'yy-mm-dd',
			 changeYear: true,
			 changeMonth : true,
			 onSelect: function(selected) { 
				$('#sch_ed_date').datepicker("option","minDate", selected);
			}
		}).datepicker("setDate", "0");
		  
		$('#sch_ed_date').datepicker({ 
			dateFormat: 'yy-mm-dd',
			changeYear: true,
			changeMonth : true,
			onSelect: function(selected) { 
				$('#sch_st_date').datepicker("option","maxDate", selected);
				$('#sch_counting_date').datepicker("option","minDate", selected);
			}
		}).datepicker("setDate", "7");
		
		
		$('#sch_counting_date').datepicker({ 
			 dateFormat: 'yy-mm-dd',
			 changeYear: true,
			 changeMonth : true,
			 minDate : 0
		}).datepicker("setDate", "7");
		
		$('#sch_st_date_btn').click(function() {
			$('#sch_st_date').datepicker('show');
	    });
		 
		$('#sch_ed_date_btn').click(function() {
	    	$('#sch_ed_date').datepicker('show');
	    });
		
		$('#sch_counting_date_btn').click(function() {
	    	$('#sch_counting_date').datepicker('show');
	    });
		
		$(".ui-datepicker-month").css({'color':'#222 !important'});
		
		$(".btn_help").click(function() {
			var locat = $(this);
			if ($(".btn_help").hasClass("on")) {
				$(".btn_help").removeClass("on");
			} else {
				$(locat).parent().find(locat).addClass("on");
			}
		});
		
		
		
		
		//질문 갯수가 1개일떄 투표 제목을 질문으로 넣어줌
		$('.voteTitle').keyup(function() {
			var val = $(this).val();
			var qestn_co = $("#qestn_co").val();
			if(qestn_co == 1){
				$(".vote_box1").eq(0).find("input").eq(0).val(val);
			}
	    });
		
		// 최대투표수 설정 변경시
		$('#mxmm_vote_cnt').change(function(e){
			// 체크시
			if($(this).prop('checked')){
				$('[name=mxmm_vote_co]').prop('disabled', false);
			} else {
				$('[name=mxmm_vote_co]').prop('disabled', true);
			}
		});
		
		
		
		// 최소의사정족수 설정 변경시
		$('#minmm_vote_quorum_cnt').change(function(e){
			// 체크시
			if($(this).prop('checked')){
				$('[name=minmm_vote_qurrum_co]').prop('disabled', false);
			} else {
				$('[name=minmm_vote_qurrum_co]').val('');
				$('[name=minmm_vote_qurrum_co]').prop('disabled', true);
			}
		});
		
		
		// 정책반영 투표 타입 선택시
		$('[name=policy_vote_ty]').change(function(e){
			
			// 정책반영투표인경우
			if($(this).val() == '001'){
				// 투표대상 전체공개(핸드폰) 고정
				$('#vote_radio01_04').prop('checked', true);
				// 비활성화 처리
				$('[name=othbc_trget]').prop('disabled', true);
				// 히든값 동적추가
				$('#vote_radio01_04').after('<input type="hidden" name="othbc_trget" value="004" />');
				
				// 마감후 결과노출 고정
				$('#vote_radio02_02').prop('checked', true);
				// 비활성화 처리
				$('[name=progrs_middl_result]').prop('disabled', true);
				// 히든값 동적추가
				$('#vote_radio02_02').after('<input type="hidden" name="progrs_middl_result" value="E" />');
				
				// 통계정보 받음 고정
				$('#vote_radio03_01').prop('checked', true);
				// 비활성화 처리하고 Y값을 동적 추가해준다.
				$('[name=stats_colct_yn]').prop('disabled', true);
				$('#vote_radio03_01').after('<input type="hidden" name="stats_colct_yn" value="Y" />');
				
				//의자정족수 - 정책반영투표
				$('#minmm_vote_quorum_cnt').prop('disabled', false);
			}
			// 정책 참조 투표인경우
			else {
				//의사정족수 -  정책 참조투표
				$('#minmm_vote_quorum_cnt').prop('checked',false);
				$('#minmm_vote_quorum_cnt').prop('disabled', true);
				$('[name=minmm_vote_qurrum_co]').prop('disabled', true);
				$('[name=minmm_vote_qurrum_co]').val('');
				
				// 히든타입의 othbc_trget 삭제
				$('[type=hidden][name=othbc_trget]').remove();
				// 비활성화 풀기
				$('[name=othbc_trget]').prop('disabled', false);
				
				// 히든타입의 stats_colct_yn 삭제
				$('[type=hidden][name=stats_colct_yn]').remove();
				// 비활성화 풀기
				$('[name=stats_colct_yn]').prop('disabled', false);
				$('#vote_radio03_02').prop('checked',true );
				
				
				// 히든타입의 progrs_middl_result 삭제
				$('[type=hidden][name=progrs_middl_result]').remove();
				// 비활성화 풀기
				$('[name=progrs_middl_result]').prop('disabled', false);
			}
		});
		// 최소의사정족수 설정 변경시
		$('#counting_yn_01').change(function(e){
			// 체크시
			$(".cal_fl5").show();
			var selEndHour = $('#ed_hour').val();
			selEndHour *=1;
			newselEndHour = selEndHour;
			var nd = $.trim($("#sch_ed_date").val());
			if(newselEndHour >=24)
			{
				if("22"==selEndHour) { newselEndHour="00";}
				if(selEndHour=="23") { newselEndHour="01";}
				if(selEndHour=="24") { newselEndHour="02";}
				var endDate = nd.split("-");
				endDate[2] *=1;
				endDate[1] *=1;
				var newDate = new Date(endDate[0], endDate[1]-1, endDate[2]+1);
				nd = $.datepicker.formatDate('yy-mm-dd', new Date(newDate));
			}
			var leadingZeros = function (date, num) {
			     var zero = '';
			     date = date.toString();
			    
			     if (date.length < num) {
			     for (i = 0; i < num - date.length; i++)
			     zero += '0';
			     }
			     return zero + date;
			}
			var newselEndHour= leadingZeros(newselEndHour,2);
			
			$('#sch_counting_date').val(nd).prop("selected",true);
			$('#counting_hour').val(newselEndHour).prop("selected",true);
			 
			$('#sch_counting_date').datepicker("option","minDate", nd);
		});
		$('#counting_yn_02').change(function(e){
			// 체크시
			$(".cal_fl5").hide();
		});
		$('#ed_hour').change(function(e){
			// 체크시
			var selEndHour = $('#ed_hour').val();
			selEndHour *=1;
			newselEndHour = selEndHour;
			var nd = $.trim($("#sch_ed_date").val());
			if(newselEndHour >=24)
			{
				if("22"==selEndHour) { newselEndHour="00";}
				if(selEndHour=="23") { newselEndHour="01";}
				if(selEndHour=="24") { newselEndHour="02";}
				var endDate = nd.split("-");
				endDate[2] *=1;
				endDate[1] *=1;
				var newDate = new Date(endDate[0], endDate[1]-1, endDate[2]+1);
				nd = $.datepicker.formatDate('yy-mm-dd', new Date(newDate));
			}
			var leadingZeros = function (date, num) {
			     var zero = '';
			     date = date.toString();
			    
			     if (date.length < num) {
			     for (i = 0; i < num - date.length; i++)
			     zero += '0';
			     }
			     return zero + date;
			}
			var newselEndHour= leadingZeros(newselEndHour,2);
			
			$('#sch_counting_date').val(nd).prop("selected",true);
			$('#counting_hour').val(newselEndHour).prop("selected",true);
		});
		
		$('#ed_min').change(function(e){
			// 체크시
			var selEndMin = $('#ed_min').val();
			$('#counting_min').val(selEndMin).prop("selected",true);
		});
	});
	
	// 차단번호 양식 다운
	function fnTampletBlockNumDown(){
		document.location.href="/upload/sample/block_num_sample.xls";
	}
	
	/* 대상 선택 (일반투표 / vs형 투표) */
	function fnSelVoteType(id){
		$('.vote_type01').css('display', 'none');
		$('.vote_type02').css('display', 'none');
		$('.vote_type' + id).css('display', '');
		$(".main-sidebar").css("height", $(".wrapper")[0].scrollHeight);
		
		if(id == "02"){
			$("#vote_ty").val("V"); 
		}else{
			$("#vote_ty").val("M"); 
		}
	}
	
	//등록
	function fnGoInsert(k){
		
		var returnFlag = true;
		var selVoteType = $('input:radio[name="voteType"]:checked').val();
		var othbc_trget = $('input:radio[name="othbc_trget"]:checked').val();
		var alertMsg = "";
		//임시저장 여부
		if(k != "save"){
			$("#vote_sttus").val("007"); 
			alertMsg = getNotiMsg('C_MV36');
			//필수값 체크
			if(selVoteType == "V"){
				if($.trim($("#vs_vote_sj").val()) == ""){
					alert(getNotiMsg('C_MV37'));
					$("#vs_vote_sj").val("");
					$("#vs_vote_sj").focus();
					return false;
				}
				
				//투표 질문 답변 갯수 설정
				$("#qestn_co").val("1"); 
				$("#totAnsCnt").val("2");
				
				// 최대 투표수 비활성화 처리
				$('#ge_mxmm_choise_co').prop('disabled', true);
				
			}else{
				if($.trim($("#ge_vote_sj").val()) == ""){
					alert(getNotiMsg('C_MV37'));
					$("#ge_vote_sj").val("");
					$("#ge_vote_sj").focus();
					return false;
				}
			}
		}else{
			$("#vote_sttus").val("002"); 
			alertMsg = "투표 등록시 관리자 승인 후 투표가 진행됩니다.";
			//필수값 체크
			if(selVoteType == "V"){
				if($.trim($("#vs_vote_sj").val()) == ""){
					alert(getNotiMsg('C_MV39'));
					$("#vs_vote_sj").val("");
					$("#vs_vote_sj").focus();
					return false;
				}
				
				if($.trim($("#vs_vote_ans_1").val()) == ""){
					alert(getNotiMsg('C_MV63').replace("(두번째)", ""));
					$("#vs_vote_ans_1").val("");
					$("#vs_vote_ans_1").focus();
					return false;
				}
				
				if($.trim($("#vs_vote_ans_2").val()) == ""){
					alert(getNotiMsg('C_MV63').replace("첫", "두").replace("(두번째)", ""));
					$("#vs_vote_ans_2").val("");
					$("#vs_vote_ans_2").focus();
					return false;
				}
				
				//투표 질문 답변 갯수 설정
				$("#qestn_co").val("1"); 
				$("#totAnsCnt").val("2");
				
				// 최대 투표수 비활성화 처리
				$('#ge_mxmm_choise_co').prop('disabled', true);
				
			}else{
				if($.trim($("#ge_vote_sj").val()) == ""){
					alert(getNotiMsg('C_MV39'));
					$("#ge_vote_sj").val("");
					$("#ge_vote_sj").focus();
					return false;
				}
				
				$(".queInput").each(function() {
					if ($.trim($(this).val()) == '') {
						alert(getNotiMsg('C_MV40'));
						returnFlag = false;
						return false;
					}
				});
				
				if(!returnFlag){
					return false;
				}
				
				$(".ansInput").each(function() {
					if ($.trim($(this).val()) == '') {
						alert(getNotiMsg('C_MV41'));
						returnFlag = false;
						return false;
					}
				});
				
				if(!returnFlag){
					return false;
				}
				
				// 분기투표인경우 다음 질문 선택이 되어야 한다.
				if($('.vote_type01 [name^=ge_next_qestn_seq]').length > 0){
					
					$('.vote_type01 [name^=ge_next_qestn_seq]').each(function(){
						if($(this).val() == ''){
							alert(getNotiMsg('C_MV64'));
							returnFlag = false;
							return false;
						}
					});
				}
				
				if(!returnFlag){
					return false;
				}
			}
			
			// 메인 서브 이미지가 있는경우 대표 이미지가 없는경우에는 등록 막기
			var main_sub_img = $('[name=ge_attImgFileInfoMain]:gt(0)').filter(function(){
				return nvl($(this).val()) != '' ? true : false;
			});
			
			if(main_sub_img.length > 0){
				if(nvl($('[name=ge_attImgFileInfoMain]').eq(0).val()) == ''){
					alert(getNotiMsg('C_MV42'));
					return false;
				}
			}
			
			var ans_num = '';
			var img_submit_flag = true;
			// 각각 답변의 서브 이미지가 있는경우 대표 이미지가 없는경우에는 등록 막기
			$('[name^=ge_attImgFileInfo_]').each(function(){
				// 해당답변의 처음 이미지인경우
				if($(this).attr('name').split('_')[2] != ans_num){
					// 답변 고유번호 셋팅
					ans_num = $(this).attr('name').split('_')[2];
					// 해당 답변 서브 이미지 개수 구하기
					var and_sub_img = $('[name=ge_attImgFileInfo_' + ans_num + ']:gt(0)').filter(function(){
						return nvl($(this).val()) != '' ? true : false;
					});
					// 해당 답변의 서브이미지와 대표이미지 있는지 여부 확인
					if(and_sub_img.length > 0){
						if(nvl($('[name=ge_attImgFileInfo_' + ans_num + ']').eq(0).val()) == ''){
							alert(getNotiMsg('C_MV43'));
							img_submit_flag = false;
							return false;
						}
					}
				}
			});
			
			if(!img_submit_flag){
				return false;
			}
			
			if($.trim($("#vote_dc").val()) == ""){
				alert(getNotiMsg('C_MV45'));
				$("#vote_dc").val("");
				$("#vote_dc").focus();
				return false;
			}
			
			if($.trim($("#vote_crtr").val()) == ""){
				alert(getNotiMsg('C_MV46'));
				$("#vote_crtr").val("");
				$("#vote_crtr").focus();
				return false;
			}
			
			if($.trim($("#sch_st_date").val()) == ""){
				alert(getNotiMsg('C_MV47'));
				$("#sch_st_date").val("");
				$("#sch_st_date").focus();
				return false;
			}
			
			if($.trim($("#sch_ed_date").val()) == ""){
				alert(getNotiMsg('C_MV48'));
				$("#sch_ed_date").val("");
				$("#sch_ed_date").focus();
				return false;
			}
			
			// 시작일자가 끝날짜를 넘어갈수 없다.
			var start_time = '' + $.trim($("#sch_st_date").val()).replace(/-/gi, '') + $('#st_hour').val() + $('#st_min').val();
			var end_time = '' + $.trim($("#sch_ed_date").val()).replace(/-/gi, '') + $('#ed_hour').val() + $('#ed_min').val();
			var counting_time = '' + $.trim($("#sch_counting_date").val()).replace(/-/gi, '') + $('#cointing_hour').val() + $('#counting_min').val();
			if(start_time > end_time){
				alert(getNotiMsg('C_MV49'));
				return false;
			}
			var counting_yn = $(":input:radio[name=counting_yn]:checked").val();
			if(counting_yn =='Y')
			{
				if(end_time > counting_time){
					alert('개표시작일을 확인 바랍니다.');
					return false;
				}
			}
			if($.trim($("#targetSource").val()) == ""){
				alert(getNotiMsg('C_MV53'));
				return false;
			}
		}
		
		$("#begin_dt").val($("#sch_st_date").val().replace(/-/g , "") + $("#st_hour").val() + $("#st_min").val());
		$("#end_dt").val($("#sch_ed_date").val().replace(/-/g , "") + $("#ed_hour").val() + $("#ed_min").val());
		$("#counting_dt").val($("#sch_counting_date").val().replace(/-/g , "") + $("#counting_hour").val() + $("#counting_min").val());
		
		if(confirm(alertMsg)){
			var submitUrl = "/admin/userdocvote/insertUserDocVoteAjax.do";
			var resultUrl = "/admin/userdocvote/selectPageListVoteStatus.do";
			
			$("#submitForm").attr("action", submitUrl);
			$("#submitForm").ajaxForm({
				beforeSubmit : function(){
					var loading = '<div class="overlay loadingbar"><i class="fa fa-refresh fa-spin"></i></div>';
					// 로딩바 추가
					$('.box-primary').append(loading);
				},
			    success : function(param) {
			        if(param.resultStats.resultCode == 'ok')
			        {
			        	alert(getNotiMsg('C_MV60'));
			        	//document.location.href = resultUrl;
			        	//$("#aform").attr( { 'action':'/admin/userdocvote/selectPageListVoteStatus.do', 'method':'post'}).submit();
			        	//document.aform.userdoc_seq.value=$("#userdoc_seq").val();
			        	$('#aform').attr({ 'action' : '/admin/userdocvote/selectPageListVoteStatus.do', 'method' : 'post' }).submit();
					}else{
						alert(param.resultStats.resultMsg);
						return;
					}
			    },
				error : function(jqXHR, textStatus, thrownError){
					ajaxJsonErrorAlert(jqXHR, textStatus, thrownError);
				},
				complete : function(){
					$('.overlay.loadingbar').remove();
				}
			}); 
			$("#submitForm").submit(); 
		}
	}

	$(function(){	
		fnSetAttr();
		// 최대투표수 활성화
		$("#ge_mxmm_choise").click(function(){
			// 최대투표수 설정할 경우
			if($('input:checkbox[name=ge_mxmm_choise]').prop('checked')){
				alert('총 투표수를 우측표기숫자로 제한합니다.');
				$('#ge_mxmm_choise_co').prop('disabled', false);
			} else {
				$('#ge_mxmm_choise_co').prop('disabled', true);
			}
			
			fnSetAttr();
		});
	});
	
	//옵션 버튼 활성화
	function fnOpenOption(section){
		var locat = section;
		if ($(".option_box").hasClass("on")) {
			if($(locat).parent().find(".option_box").hasClass("on")){
				$(locat).parent().find(".option_box").removeClass("on"); 
			}else{
				$(locat).parent().find(".option_box").addClass("on");
			}
		} else {
			$(locat).parent().find(".option_box").addClass("on");
		}
	}
	
	//옵션 내 랜덤 설정 버튼
	function fnCheckRan(section){
		if ($(section).hasClass("on")) {
			$(section).removeClass("on");
			$(section).next().attr("value", "N");
		} else {
			$(section).addClass("on");
			$(section).next().attr("value", "Y");
		}
	}
	
	// 답변관련 추가 정보 활성화
	function fnOpenAnswerDetail(section){
		fnOpenImg(section);
		fnOpenAnsPop(section);
	}
	
	//이미지 버튼 활성화
	function fnOpenImg(section){
		var locat = section;
		if ($(".v_w_img_box").hasClass("on")) {
			if($(locat).parent().parent().find(".v_w_img_box").hasClass("on")){
				$(locat).parent().parent().find(".v_w_img_box").removeClass("on");
				$(locat).find("i").removeClass("fa-caret-up").addClass("fa-caret-down");
			}else{
				$(locat).parent().parent().find(".v_w_img_box").addClass("on");
				$(locat).find("i").removeClass("fa-caret-down").addClass("fa-caret-up");
			}
		} else {
			$(locat).parent().parent().find(".v_w_img_box").addClass("on");
			$(locat).find("i").removeClass("fa-caret-down").addClass("fa-caret-up");
		}
	}
	
	//답변팝업 버튼 활성화 (토글)
	function fnOpenAnsPop(section){
		var locat = section;
		if ($(".reply_box").hasClass("on")) {
			if($(locat).parent().parent().find(".reply_box").hasClass("on")){
				$(locat).parent().parent().find(".reply_box").removeClass("on");
			}else{
				$(locat).parent().parent().find(".reply_box").addClass("on");
			}
		} else {
			$(locat).parent().parent().find(".reply_box").addClass("on");
		}
	}
	
	function toggleURLCheckbox(element) {
		var $inputSj = $(element).parent("li").siblings().eq("0").find("input");
		var $inputCn = $(element).parent("li").siblings().eq("1").find("textarea");
		
		$inputCn.attr({"disabled": !$inputCn.prop("disabled")});
		
		if($inputCn.prop("disabled")){
			$inputSj.prop("placeholder", "URL을 입력해 주세요.");
		} else {
			$inputSj.prop("placeholder", "제목을 입력해 주세요.");
		}
	}
	
	//답변 팝업 닫기 (확인 버튼)
	function fnCloseAnsPop(section){
		var locat = $(section).parent().parent();
		
		// 답변 문구 팝업 닫기
		$(locat).parent().parent().find(".reply_box").removeClass("on");
		
		// 답변 이미지 닫기
		$(locat).parent().parent().find(".v_w_img_box").removeClass("on");
		$(locat).parent().parent().find("i").removeClass("fa-caret-up").addClass("fa-caret-down");
	}
	
	//질문 타입 변경
	function fnChangeQueType(index, key){
		if(key == "001"){
			var layer = $("#queTypee001Temp").html();
			$("#que_type_layer_"+index).html(layer);
			$("#que_type_layer_"+index).addClass("type001");
			$("#que_type_layer_"+index).removeClass("type002");

			fnSetNextQestn();
			fnSetAttr();
			
		}else if(key == "002"){
			var layer = $("#queTypee002Temp").html();
			$("#que_type_layer_"+index).html(layer);
			$("#que_type_layer_"+index).addClass("type002");
			$("#que_type_layer_"+index).removeClass("type001");

			fnSetNextQestn();
			fnSetAttr();
		}
	}
	
	//질문 추가
	function fnAddQueType001(){
		var layer = $("#que001Temp").html();
		$("#que_layer").append(layer);
		
		// 분기투표시에 질문추가되는경우 질문선택지가 늘어나야함.
		fnSetNextQestn();
		
		fnSetAttr();
	}
	
	//질문 삭제
	function fnQueDelete(section){
		$(section).parent().parent().remove();
		
		// 분기투표시에 질문추가되는경우 질문선택지가 늘어나야함.
		fnSetNextQestn();
		
		fnSetAttr();
	}
	
	//질문 복사
	function fnQueCopy(section , type){
		var copyHtml =	'<div class="vote_box vote_box1 '+type+'">' ;
		copyHtml += $(section).parent().parent().html();
		copyHtml += '</div>' ;
		$("#que_layer").append(copyHtml);
		// 분기투표시에 질문추가되는경우 질문선택지가 늘어나야함.
		fnSetNextQestn();
		fnSetAttr();
	}
	
	//답변 추가
	function fnAddAns(section, no){
		var layer = $("#addAnsBox").html();
		$(section).parent().parent().append(layer);
		var cnt = $(section).parent().parent().find(".v_w_inp_box").length;
		fnChAnsCount(section,no,cnt);
		// 분기투표시에 질문추가되는경우 질문선택지가 늘어나야함.
		fnSetNextQestn();
		fnSetAttr();
	}
	
	//답변 삭제
	function fnAnsDelete(section,no){
		var cnt = $(section).parent().parent().find(".v_w_inp_box").length -1;
		fnChAnsCount(section,no,cnt);
		$(section).parent().remove();
		fnSetAttr();
	}
	
	//옵션의 답변 선택 갯수 변경
	function fnChAnsCount(section,no,cnt) {
		//최대 선택(필수 선택) 갯수 변경
		var maxInnerHtml = "";
		var minInnerHtml = "";
		
		// 현재선택한 개수 조회
		var max = $("#ge_anse_mxmm_choise_co_"+no).val();
		var min = $("#ge_anse_mumm_choise_co_"+no).val();
		
		for (var i = 0; i <= cnt; i++) {
			var min_sel = i == min ? 'selected="selected"' : '';
			var max_sel = i == max ? 'selected="selected"' : '';
			
			minInnerHtml += '<option value="'+i+'" ' + min_sel + '>'+i+'개</option>' ;
			maxInnerHtml += '<option value="'+i+'" ' + max_sel + '>'+i+'개</option>' ;
		}
		
		$("#ge_anse_mxmm_choise_co_"+no).html(maxInnerHtml);
		$("#ge_anse_mumm_choise_co_"+no).html(minInnerHtml);
	}
	
	//name. id 등 재설정
	function fnSetAttr(){
		var queCount = 1;
		var ansTotCount = 0;
		var queLen = $(".vote_box1").length -2;
		
		//등록시 복사버튼 삭제
		$(".copyBtn").remove();
		 
		for (var i = 0; i < queLen; i++) {
			var ansCount = 0;
			$(".vote_box1").eq(i).attr({"id" : "que_type_layer_"+ queCount +""});
			$(".vote_box1").eq(i).find("input").eq(0).attr({"id" : "ge_qestn_sj_"+ queCount +"" , "name" : "ge_qestn_sj_"+ queCount +"" , "readonly" : false});
			$(".vote_box1").eq(i).find("input").eq(0).addClass("queInput");
			$(".vote_box1").eq(i).find("select").eq(0).attr({"id" : "ge_qestn_se_"+ queCount +"" , "name" : "ge_qestn_se_"+ queCount +"" , "onchange" : "fnChangeQueType('"+ queCount +"',this.value); return false;"});
			$(".vote_box1").eq(i).find(".deleteBtn").eq(0).attr({"disabled" : false});
			$(".vote_box1").eq(i).find(".btn_option_box").find("input").eq(0).attr({"id" : "ge_answer_random_yn_"+ queCount +"" , "name" : "ge_answer_random_yn_"+ queCount +""});
			$(".vote_box1").eq(i).find(".btn_option_box").find("input").eq(1).attr({"id" : "ge_answer_co_"+ queCount +"" , "name" : "ge_answer_co_"+ queCount +""});
//			$(".vote_box1").eq(i).find(".btn_option_box").find("select").eq(0).attr({"id" : "ge_anse_mxmm_choise_co_"+ queCount +"" , "name" : "ge_anse_mxmm_choise_co_"+ queCount +""});
			
			// 최대, 최소 네이밍 설정
			$(".vote_box1").eq(i).find(".btn_option_box .v_ls_min label").attr({"for" : "ge_anse_mumm_choise_co_"+ queCount +""});
			$(".vote_box1").eq(i).find(".btn_option_box .v_ls_min select").attr({"id" : "ge_anse_mumm_choise_co_"+ queCount +"" , "name" : "ge_anse_mumm_choise_co_"+ queCount +""});
			$(".vote_box1").eq(i).find(".btn_option_box .v_ls_max label").attr({"for" : "ge_anse_mxmm_choise_co_"+ queCount +""});
			$(".vote_box1").eq(i).find(".btn_option_box .v_ls_max select").attr({"id" : "ge_anse_mxmm_choise_co_"+ queCount +"" , "name" : "ge_anse_mxmm_choise_co_"+ queCount +""});
			
			// 분기투표 다음 질문선택 네이밍 설정
			$(".vote_box1").eq(i).find("[name^=ge_next_qestn_seq]").attr({"name" : "ge_next_qestn_seq_"+ queCount +""});
			
			$(".vote_box1").eq(i).find(".v_w_inp_box").find(".addAnsBtn").eq(0).attr({"onclick" : "fnAddAns(this,"+ queCount +"); return false;"});
			ansLen = $(".vote_box1").eq(i).find(".v_w_inp_box").length;   
			
			for (var j = 0; j < ansLen; j++) {
				ansCount = j + 1;
				$(".vote_box1").eq(i).find(".v_w_inp_box").eq(j).find("input").eq(0).attr({"id" : "ge_answer_"+ queCount +""+ ansCount +"" , "name" : "ge_answer_"+ queCount +""});
				$(".vote_box1").eq(i).find(".v_w_inp_box").eq(j).find("input").eq(0).addClass("ansInput");
				$(".vote_box1").eq(i).find(".v_w_inp_box").eq(j).find(".deleteAnsBtn").eq(0).attr({"onclick" : "fnAnsDelete(this,"+ queCount +"); return false;"});
				
				for (var k = 0; k < 6; k++) {
					var imgCount = k + 1;
					$(".vote_box1").eq(i).find(".v_w_inp_box").eq(j).find(".v_w_img_box").find("li").eq(k).find("span").attr({"id" : "geImgDelete_"+ queCount +"_"+ ansCount +""+ imgCount +"" , "onclick" : "fnGeImgDelete("+ queCount +"_"+ ansCount +""+ imgCount +"); return false;"});
					$(".vote_box1").eq(i).find(".v_w_inp_box").eq(j).find(".v_w_img_box").find("li").eq(k).find("img").attr({"id" : "geImgfileBtn_"+ queCount +"_"+ ansCount +""+ imgCount +"" , "onclick" : "fnSeleteGeImgTrigger("+ queCount +"_"+ ansCount +""+ imgCount +"); return false;"});
					$(".vote_box1").eq(i).find(".v_w_inp_box").eq(j).find(".v_w_img_box").find("li").eq(k).find("input").attr({"id" : "ge_attImgFileInfo_"+ queCount +"_"+ ansCount +""+ imgCount +"" , "name" : "ge_attImgFileInfo_"+ queCount +"_"+ ansCount +""});
					$(".vote_box1").eq(i).find(".v_w_inp_box").eq(j).find(".reply_box").find("input").eq(0).attr({"id" : "ge_popup_sj_"+ queCount +"_"+ ansCount +"" , "name" : "ge_popup_sj_"+ queCount +"_"+ ansCount +""});
					$(".vote_box1").eq(i).find(".v_w_inp_box").eq(j).find(".reply_box").find("textarea").eq(0).attr({"id" : "ge_popup_cn_"+ queCount +"_"+ ansCount +"" , "name" : "ge_popup_cn_"+ queCount +"_"+ ansCount +""});
					$(".vote_box1").eq(i).find(".v_w_inp_box").eq(j).find(".reply_box").find("li").eq(2).find("input").attr({"id" : "ge_popup_url_at_"+ queCount +"_"+ ansCount +"" , "name" : "ge_popup_url_at_"+ queCount +"_"+ ansCount +""});
				}
			}
			
			// 맨 마지막 질문에만 질문 추가 버튼을 보여준다.
			if(queCount != queLen){
				$('.vote_box1').eq(i).find('.addQueBox').hide();
			} else {
				var btn = '<button type="button" class="btn btn-info" onclick="fnAddQueType001(); return false;"><i class="fa fa-plus"></i>질문추가</button>';
				$('.vote_box1').eq(i).find('.addQueBox').html(btn).show();
			}
			
			// 질문이 2개 이상인 경우 총투표수 설정을 셋팅할수 있게끔 설정
			if(queLen < 2){
				$('#ge_mxmm_choise').prop('disabled', true);
			} else {
				$('#ge_mxmm_choise').prop('disabled', false);
			}
			
			// 총투표수 설정을 하지 않았거나 질문수가 하나 인경우 총 투표수 설정을 막는다.
			if(!$('#ge_mxmm_choise').prop('checked') || queLen < 2){
				$('#ge_mxmm_choise_co').prop('disabled', true);
			} else {
				$('#ge_mxmm_choise_co').prop('disabled', false);
			}
			
			ansTotCount += ansCount;
			//답변수 저장
			$("#ge_answer_co_"+queCount).val(ansCount);
			queCount++;
		}
		
		//질문일 1개 일때
		if(queLen == 1){
			$(".vote_box1").eq(0).find("input").eq(0).attr({"readonly" : true});
			$(".vote_box1").eq(0).find("input").eq(0).val("");
			$(".vote_box1").eq(0).find(".deleteBtn").eq(0).attr({"disabled" : true});
			$(".vote_box1").eq(0).find(".addQueBox").css("display","");
			$(".vote_box1").eq(0).find("input").eq(0).val($("#ge_vote_sj").val());
		}
		
		//투표권 설정 시 셀렉트 옵션 갯수 생성
		var selectOptionHtml = "";
		//객관식 질문만 선택
		que001Count = $("body").find(".type001").length - 1;
		for (var i = 0; i <= ansTotCount; i++) {
			selectOptionHtml += '<option value="'+i+'">'+i+'개</option>' ;
		}
		//최대선택 갯수 셀렉트 박스 생성
		$("#ge_mxmm_choise_co").html(selectOptionHtml);
		
		//투표 타입 결정
		
		// 분기투표가 아닌경우만 설정
		if($("#vote_ty").val() != 'D'){
			var typeList = "";
			var vote_ty = "";
			var maxChose = $('input:checkbox[name="ge_mxmm_choise"]:checked').val();
			for (var i = 0; i < queLen; i++) {
				typeList += $(".vote_box1").eq(i).attr("class");
			}
			
			if(typeList.indexOf("type001") > -1 && typeList.indexOf("type002") > -1){
				//복합형
				if(maxChose == "Y"){
					//alert("복합형 복수");
					vote_ty = "A";
				}else{
					//alert("복합형 단수");
					vote_ty = "B";
				}
			}else if(typeList.indexOf("type001") > -1 && typeList.indexOf("type002") == -1 ){
				//객관식 
				if(maxChose == "Y"){
					//alert("객관식 복수");
					vote_ty = "O";
				}else{
					//alert("객관식 단수");
					vote_ty = "M";
				}
			}else if(typeList.indexOf("type002") > -1 && typeList.indexOf("type001") == -1 ){
				//주관식
				vote_ty = "S";
				//투표권 설정 제어
				$("#ge_mxmm_choise_co").attr("disabled", true);
				$('#ge_mxmm_choise').prop('checked', false);
			}else{
				vote_ty = "V";
			}
			
			//투표 타입 설정
			$("#vote_ty").val(vote_ty); 
		}
		
		//총 질문 갯수 세팅
		$("#qestn_co").val(queLen); 
	}
	
	/* 첨부파일 선택시 */
    var mutex = true;
    
    /* 이미지 클릭 트리거*/
	function fnSeleteGeImgTrigger(idx) {
		//뮤텍스가 false일경우 리턴
		if(!mutex) {
			//alert("이미지 처리중입니다. 잠시만 기다려 주세요.");
			return;
		}
		//뮤텍스 false로 변경하여 mutex값이 변경되지 전엔 호출 금지
    	$('#temp_geImgFile').trigger('click'); 
    	$("#temp_geImgFile_idx").val(idx);
    } 
    
	$(function(){	
	    
		$("[name='ajaxFormGeImg']").on("change", "[name^='temp_geImgFile']", function(){
			
			//뮤텍스가 false일경우 리턴
			if(!mutex) {
				//alert("이미지 처리중입니다. 잠시만 기다려 주세요.");
				return;
			}
			//뮤텍스 false로 변경하여 mutex값이 변경되지 전엔 호출 금지
			mutex = false;
			
			var ext = $(this).val().split(".").pop().toLowerCase(); 
			//해당 input:file의 index 조회
			//index로 input:hidden(파일정보저장)와 썸네일 이미지의 위치를 찾는다.
			var idx = $("#temp_geImgFile_idx").val();
			//이미지 파일만 업로드 가능함
			if($.inArray(ext, ["png","jpg","jpeg"]) == -1) { 
				if ( $(this).val() != "" ) {
					alert("사진파일만 등록 가능합니다.(jpg, jpeg, png)");
				}
				//스틸컷 이미지를 기본 이미지로 변경
				
				var imgSrc = "/common/images/img_none02.png";
				if(idx > 10){
					imgSrc = "/common/images/img_none03.png";
				}  
				$("#geImgfileBtn_"+idx).attr("src", imgSrc);
				$("#temp_geImgFile").val("");
				$("#geImgDelete_"+idx).removeClass("btn_img_delete");
				//해당 파일 정보 초기화
				mutex = true;
			} else {
				$("#temp_geImgFile_idx").val(idx);
				$("[name='ajaxFormGeImg']").submit();
			}
		});
		
	    /* 첨부파일 임시저장 */
		$("[name='ajaxFormGeImg']").ajaxForm({
			url : "/admin/vote/uploadGeImgFileAjax.do",
			beforeSubmit: function(arr, $form, options) { 
				//$("#loadingBar").show();
			},
			success : function(param) {
				//문자열형태의 응답파라미터를 JSON타입으로 변경
				param = $.parseJSON(param);
				var resultStats = param.resultStats;
				var resultCode = resultStats.resultCode;
				//파일업로드 성공
				if ( resultCode == "ok" ) {
					//"image/jpeg|jpg|1441758811057EGQI8XGWCJP9LWAYCHL31XL69|Lighthouse.jpg|/upload/cnts/1/20150911104058230|561276|D:/eGovFrameDev-3.0.0-32bit-SMP/workspace/AllNewSMP/src/main/webapp/upload/cnts/87/20150914033811300/"
					//fileInfo[0] : contentType;
					//fileInfo[1] : 확장자;
					//fileInfo[2] : 파일ID;
					//fileInfo[3] : 파일명;
					//fileInfo[4] : 상대경로;
					//fileInfo[5] : 파일크기;
					//fileInfo[6] : 절대경로;
					
					//파일정보 저장
					var idx = $("#temp_geImgFile_idx").val();
					//var idx = resultStats.temp_geImgFile_idx;
					var fileInfo = resultStats.fileInfo.split("|");
					//썸네일 변경
					var imgSrc = fileInfo[4] + fileInfo[2] + "." + fileInfo[1]; 
					$("#ge_attImgFileInfo_"+idx).val(resultStats.fileInfo);
					$("#geImgfileBtn_"+idx).attr("src", imgSrc);
					$("#geImgDelete_"+idx).addClass("btn_img_delete");
					$("#temp_geImgFile").val("");
					$("#temp_geImgFile_idx").val("");
				} else {
					if ( resultMsg != "" ) {
						alert(resultMsg);
					}
				}
				
				mutex = true;
			}
		});
	});
	
	//이미지 삭제
	function fnGeImgDelete(idx) {
		if(confirm(getNotiMsg('C_MV07'))){
			var imgSrc = "/common/images/img_none02.png";
			if(idx > 10){
				imgSrc = "/common/images/img_none03.png";
			}  
			$("#temp_geImgFile").val("");
			$("#temp_geImgFile_idx").val("");
			$("#geImgfileBtn_"+idx).attr("src", imgSrc);
			$("#geImgDelete_"+idx).removeClass("btn_img_delete");
			$("#ge_attImgFileInfo_"+idx).val("");
		}
	}
	
	$(function(){	
		
		var mutex = true;
		
		/* 이미지 클릭 트리거*/
		$('#vsImgfileBtn_1').click(function(){ 
			if(!mutex) {
				//alert("이미지 처리중입니다. 잠시만 기다려 주세요.");
				return;
			}
	    	$('#temp_vsImgFile_1').trigger('click'); 
	    });
	    $('#vsImgfileBtn_2').click(function(){ 
	    	if(!mutex) {
				//alert("이미지 처리중입니다. 잠시만 기다려 주세요.");
				return;
			}
	    	$('#temp_vsImgFile_2').trigger('click'); 
	    });
		
	    /* 첨부파일 선택시 */
		$("[name='ajaxFormVsImg']").on("change", "[name^='temp_vsImgFile']", function(){
			
			//뮤텍스가 false일경우 리턴
			if(!mutex) {
				//alert("이미지 처리중입니다. 잠시만 기다려 주세요.");
				return;
			}
			//뮤텍스 false로 변경하여 mutex값이 변경되지 전엔 호출 금지
			mutex = false;
			
			var ext = $(this).val().split(".").pop().toLowerCase(); 
			//해당 input:file의 index 조회
			//index로 input:hidden(파일정보저장)와 썸네일 이미지의 위치를 찾는다.
			var idx = $(this).attr("id").replace("temp_vsImgFile_", "");
			//이미지 파일만 업로드 가능함
			if($.inArray(ext, ["png","jpg","jpeg"]) == -1) { 
				if ( $(this).val() != "" ) {
					alert("사진파일만 등록 가능합니다.(jpg, jpeg, png)");
				}
				//스틸컷 이미지를 기본 이미지로 변경
				var imgSrc = "/common/images/img_none04.png";
				$("#vsImgfileBtn_"+idx).attr("src", imgSrc);
				$("#temp_vsImgFile_"+idx).val("");
				$("#vsImgDelete_"+idx).removeClass("btn_img_delete");
				//해당 파일 정보 초기화
				mutex = true;
			} else {
				$("#temp_vsImgFile_idx").val(idx);
				$("[name='ajaxFormVsImg']").submit();
			}
		});
		
	    /* 첨부파일 임시저장 */
		$("[name='ajaxFormVsImg']").ajaxForm({
			url : "/admin/vote/uploadVsImgFileAjax.do",
			beforeSubmit: function(arr, $form, options) { 
				//$("#loadingBar").show();
			},
			success : function(param) {
				//문자열형태의 응답파라미터를 JSON타입으로 변경
				param = $.parseJSON(param);
				var resultStats = param.resultStats;
				var resultCode = resultStats.resultCode;
				//파일업로드 성공
				if ( resultCode == "ok" ) {
					//"image/jpeg|jpg|1441758811057EGQI8XGWCJP9LWAYCHL31XL69|Lighthouse.jpg|/upload/cnts/1/20150911104058230|561276|D:/eGovFrameDev-3.0.0-32bit-SMP/workspace/AllNewSMP/src/main/webapp/upload/cnts/87/20150914033811300/"
					//fileInfo[0] : contentType;
					//fileInfo[1] : 확장자;
					//fileInfo[2] : 파일ID;
					//fileInfo[3] : 파일명;
					//fileInfo[4] : 상대경로;
					//fileInfo[5] : 파일크기;
					//fileInfo[6] : 절대경로;
					
					//파일정보 저장
					var idx= $("#temp_vsImgFile_idx").val();
					var fileInfo = resultStats.fileInfo.split("|");
					//썸네일 변경
					var imgSrc = fileInfo[4] + fileInfo[2] + "." + fileInfo[1];  
					$("#vs_attImgFileInfo_"+idx).val(resultStats.fileInfo);
					 
					$("#vsImgfileBtn_"+idx).attr("src", imgSrc);
					$("#vsImgDelete_"+idx).addClass("btn_img_delete");
					
				} else {
					if ( resultMsg != "" ) {
						alert(resultMsg);
					}
				}
				
				mutex = true;
			}
		});
	}); 
	
	//VS투표 이미지 삭제
	function fnVsimgDelete(idx) {
		if(confirm(getNotiMsg('C_MV07'))){
			var imgSrc = "/common/images/img_none04.png";
			$("#temp_vsImgFile_"+idx).val("");
			$("#temp_vsImgFile_idx").val("");
			$("#vsImgfileBtn_"+idx).attr("src", imgSrc);
			$("#vsImgDelete_"+idx).removeClass("btn_img_delete");
			$("#vs_attImgFileInfo_"+idx).val("");
		}
	}
	
	// 질문수가 변경이 될때마다 분기투표에서 다음 질문 선택지 변경
	function fnSetNextQestn(){
		var qLen = $('.vote_type01 .vote_box1').length;
		
		// 각각의 질문번호를 수정한다.
		$('.vote_box .qestn_num').each(function(){
			var index = $('.vote_box .qestn_num').index($(this));
			
			$(this).find('.num').text(index + 1);
		});
		
		// 개수만큼 설정한다.
		$('[name^=ge_next_qestn_seq').each(function(){
			// 자신의 질문 인덱스
			var index = $('.vote_type01 .vote_box1').index($(this).closest('.vote_type01 .vote_box1'));
			var sel = $(this).val();
			
			// 기존 리스트를 지운다.
			$(this).find('option').remove();
			// 개수만큼 리스트 추가
			var innerStr = '<option value="">다음질문선택</option>';
			
			for(var i = 1; i <= qLen; i++){
				// 자신의 번호 아래로는 선택하지 못하도록 한다.
				if(index + 1 < i){
					innerStr += '<option value="' + i + '">' + i + '번째 질문으로</option>';
				}
			}
			
			innerStr += '<option value="-1">종료</option>';
			
			$(this).append(innerStr).val(sel);
		});
	}
	// 결과 현황 보기
	

	
