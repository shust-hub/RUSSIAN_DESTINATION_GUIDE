var addZero = function(str) {
	if (str<10)
		str = "0" + str; 
	return (str);
	};
	
var addDate = function(dat, day){
	var cdat = dat.split(".");
	
	var dday=new Date(cdat[2], cdat[1]-1 , parseInt(cdat[0])+parseInt(day), 12);
	
	return (addZero(dday.getDate())+ "." + addZero(dday.getMonth()+1) + "." + dday.getFullYear());
	

};
 var countDown = function(second) {
	 
	 var interval = setInterval(function() { 
	 	second--;
		if(second<=0) {
			window.location.href="/train/timeout.html";
		}
		else {
		 var mn = Math.floor(second/60);
		 var sc = second-mn*60;
		 var ret = "";
		 if(mn)
			ret += mn + " min ";
		 ret += sc + " sec";
		 $('#countDown').html(ret);
		}
		 
		}, 1000);
 };
var isValidEmail = function(email) {
	var ml = email.trim();
	var patternMail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
   	var check_email =  patternMail.test(ml);
  return (check_email);
};	 
var getModal = function(){
	var container = $('#modal_container');
	if(container.html()) {
		
	}
	else {
		container = $('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="modal_container">').appendTo(document.body);
		var container_1 = $('<div class="modal-dialog modal-sm">').appendTo(container);
		var container_2 = $('<div class="modal-body">').appendTo(container_1);
		var container_3 = $('<div class="modal-content">').appendTo(container_2);
		var container_head = $('<div class="modal-header">').appendTo(container_3);
		
		$('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>').appendTo(container_head);
		var cont_title = $('<h4 class="modal-title" id="modal_title">').appendTo(container_head);
		
		var cont_body = $('<div class="modal-body" id="modal_body">').appendTo(container_3);
		var cont_footer = $('<div class="modal-footer" id="modal_footer">').appendTo(container_3);
	}
	return container
	}
var showError = function(title,message){
	var modalWin = getModal();
	modalWin.find('#modal_title').html(title);
	modalWin.find('#modal_body').html(message);
	var footer = modalWin.find('#modal_footer').empty();
	$('<button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>').appendTo(footer);
	modalWin.modal('show');
	}
var showConfirm = function(title,message,onConfirm){
	var modalWin = getModal();
	modalWin.find('#modal_title').html(title);
	modalWin.find('#modal_body').html(message);
	var footer = modalWin.find('#modal_footer').empty().css('display','block');
	$('<button type="button" class="btn btn-default" data-dismiss="modal">No</button>').appendTo(footer);
    var yes = $('<button type="button" class="btn btn-primary">').appendTo(footer);
	yes.html("Yes");
	yes.click(function(){
		onConfirm();
		modalWin.modal('hide');
		});
	
	
	modalWin.modal('show');
	}
var showPopover = function(elm, tx){
	  elm.popover('destroy');
	  elm.data('placement',"top");
	  elm.data('content',tx);
	  elm.data('animation',false);
	  //elm.data('trigger',"focus");
	  elm.focus();
	  elm.popover('show');
	  elm.blur(function(){
		  $(this).popover('destroy');
	  });
	 // elm.on('hide.bs.popover', function () {
	//	  $(this).popover('destroy');
	//	});
	}	
$(function() {
  $('#roundtrip_check').click(function(){
    var ck = $(this).prop('checked');
    var selectedDate = $('#dateR').attr('disabled',!ck).val();
	$( "#dateT" ).datepicker( "option", "maxDate", '+360d' );
	if(ck) {
		$('#dateR').focus();
	}
  });
  $( "#dateT" ).datepicker({
    dateFormat: 'dd.mm.yy',
    minDate: '+4d',
	maxDate: '+360d',
	firstDay: 1,
    numberOfMonths: 2,
    onClose: function( selectedDate ) {
      $( "#dateR" ).datepicker( "option", "minDate", selectedDate );
    }
  });
  $( "#dateR" ).datepicker({
    dateFormat: 'dd.mm.yy',
    minDate: '+4d',
	maxDate: '+360d',
	firstDay: 1,
    numberOfMonths: 2,
	onClose: function( selectedDate ) {
      $( "#dateT" ).datepicker( "option", "maxDate", selectedDate );
    }
  });
  
  $( ".calendar" ).datepicker({
    dateFormat: 'dd.mm.yy',
    minDate: '+1d',
	firstDay: 1
  });

  $( "input.search_station" ).autocomplete({
    source: "/train/station.php",
    autoFocus: true,
    minLength: 0,
    search: ""
  });

  $( "input.search_station" ).focus(function(){
    if(!$(this).val().length)
      $(this).autocomplete( "search", "def" );
  });
  $('.station_switcher').click(function(){
	  var from = $('#from_tr').val();
	  var to = $('#to_tr').val();
	  $('#from_tr').val(to);
	  $('#to_tr').val(from);
	  });
  $('#searchButton').click(function(){
	 var fm = $(this).parents('form');
	 var st_from = $(fm).find('input[name="from"]');
	 var st_to = $(fm).find('input[name="to"]');
	 var dt = $(fm).find('input[name="date"]');
	 var rt = $(fm).find('input[name="return"]');
	 if(!st_from.val()) {
		 showPopover(st_from,'Please choose the city of departure');
	 }
	 else if(!st_to.val()) {
		 showPopover(st_to,'Please choose the city of arrival');
	 }
	 else if(st_from.val()==st_to.val()) {
		 showPopover(st_to,'Arrival and departure cities are the same');
	 }
	 else if(!dt.val()) {
		 showPopover(dt,'Please choose departure date');
	 }
	 else {
		fm.submit(); 
	 }
	  
  });	
  var sm_btn = $('#search_link_sm').clone();  

  if(sm_btn && sm_btn.html()) {
  	sm_btn.appendTo($('#content_container'));
	}
});
