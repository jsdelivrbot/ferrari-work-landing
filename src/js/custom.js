/**************************************/
/* Custom JavaScript files supervisor */
/**************************************/

$(document).ready(function() {

    /* Custom */

 /*    //= ./common/material-init.js */
 /*    //= ./common/google-analytics.js */
  var vacancies = $("#vacancy");
  vacancies.selectmenu({
    // appendTo: "#vacancy"
    width: 200
  });
  $("#phone").mask('+0 (000) 000-00-00').bind("focus",function(){
    if( $(this).val() === ""){
      $(this).val("+");
    }
  });
  function SizeControl(){
    var full_height = $(".mbr-slide--fullheight");
    var timer;
    var self = this;
    self.setFullHeight = function (){
      var temp = this;
      clearInterval(timer);
      timer = setTimeout(function(){
        full_height.each(function(){
          $(this).height(window.innerHeight);
        });
        console.log("resize");
      },200);
    }
    // self.setFullHeight();
  }

  var window_control = new SizeControl();
  window_control.setFullHeight();
  $(window).resize(
    window_control.setFullHeight
  );

  $('#vacancy-form').submit(function(){
    var form = $(this), error = false;
    var btn = form.find('button[type="submit"]');
    
    console.log($("select").val()+" select");
    form.find('input, textarea').each( function(){
      if ($(this).val() === '') {
        $(this).addClass("invalid");
        error = true;
      }
      else{
        $(this).removeClass("invalid");
      }
    });
    if($("select").val() === ""){
        $("#vacancy-button").addClass("invalid");
        error = true;
      } else{
        $("#vacancy-button").removeClass("invalid");
      }
    if (!error){
      btn.attr('disabled', 'disabled');
      var data = form.serialize();
      $.ajax({
         type: 'POST',
         url: 'send.php',
         dataType: 'json',
         data: data, 
           beforeSend: function(data) { 
              btn.text("Идет отправка...");
            },
           success: function(data){ 
            if (data['error']) { 
              btn.text("Ошибка1");
              btn.prop('disabled', false);
            } else {
              btn.text("Отправлено");
              btn.prop('disabled', false);
            }
           },
           error: function (xhr, ajaxOptions, thrownError) {
            btn.text("Ошибка2");
            btn.prop('disabled', false);
            alert(xhr.status); 
            alert(xhr.responseText);
            alert(thrownError);
           },
           complete: function(data) {
            btn.prop('disabled', false);
           }
           });
    }
    return false;
  });
});
