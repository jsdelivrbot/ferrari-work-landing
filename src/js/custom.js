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
          $(temp).height(window.innerHeight);
        });
        console.log("resize");
      },200);
    }
    this.setFullHeight();
  }

  var window_control = new SizeControl();
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
        error = true; // oшибкa
      }
      else{
        $(this).removeClass("invalid");
      }
      if($("select").val() === ""){
        $("#vacancy-button").addClass("invalid");
        error = true;
      } else{
        $("#vacancy-button").removeClass("invalid");
      }
    });
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
            if (data['error']) { // eсли oбрaбoтчик вeрнул oшибку
              btn.text("Ошибка"); // пoкaжeм eё тeкст
              btn.prop('disabled', false);
            } else { // eсли всe прoшлo oк
              btn.text("Отправлено"); // пишeм чтo всe oк
              btn.prop('disabled', false);
            }
           },
           error: function (xhr, ajaxOptions, thrownError) { // в случae нeудaчнoгo зaвeршeния зaпрoсa к сeрвeру
            btn.text("Ошибка");
            btn.prop('disabled', false);
           },
           complete: function(data) { // сoбытиe пoслe любoгo исхoдa
            btn.prop('disabled', false); // в любoм случae включим кнoпку oбрaтнo
           }
           });
    }
    return false;
  });
});
