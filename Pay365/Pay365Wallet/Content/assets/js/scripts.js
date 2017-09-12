$(function(){
	"use strict";

	function topBar(){
		if($(window).width()> 768) return;

		let top, height, hsl, alpha, light, border, blur, ratio;
		height = 100;
		top = $(window).scrollTop();
		ratio = top/height;
		alpha = ratio>0.7 ? 0.7 : ratio;
		light = ratio * 100;
		hsl = "hsla(360, 0%, "+light+"%, "+alpha+")";
		border = "1px solid rgba(238, 238, 238, "+alpha+")";
		blur = ratio * 2;
		$('.top-bar').css({
			backgroundColor : hsl,
			borderBottom: border,
			'-webkit-backdrop-filter' : 'blur('+blur+'px)', 
			'backdrop-filter' : 'blur('+blur+'px)', 
		});
	}	
	function countdown(){
		let date = new Date('Aug 15 2017 09:32:50');
    	let time = date.getTime()/1000;
    	$('#countdown').attr('data-time', time);
    	$("#countdown").kkcountdown({
	    	dayText		: 'Ngày ',
	    	daysText 	: 'Ngày ',
	        hoursText	: 'Giờ ',
	        minutesText	: 'Phút ',
	        secondsText	: 'Giây',
	        displayZeroDays : true,
	        callback	: function(){},
	        rusNumbers  :   false
	    });
	}
	function counter() {
		$(".odometer").each(function() {
			$(this).text( $(this).attr("data-to") );
		});
	}


	$(window).scroll(function(){
		topBar();
	});
	$(window).resize(function(){
		topBar();
	});
	

	$(window).on("load", function() {		
		$(".counter").appear(function() {
			counter();
		});
		topBar();
		countdown();
		$('ul.tabs').tabs();

		$('.datepicker').pickadate({
		    selectMonths: true,
		    selectYears: 180, 
		    today: 'Hôm nay',
		    clear: 'Xóa',
		    close: 'Đồng ý',
		    closeOnSelect: false,
		    format: 'dd/mm/yyyy',
		    monthsFull: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
	      	monthsShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
	      	weekdaysFull: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
	      	weekdaysShort: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
		});

		$('.modal').modal();

		
	});

    



});