function ajaxFunction(serviceUrl, param, type, methodType, as, successCallBack) {

    $.ajax({
        url: serviceUrl,
        data: param,
        dataType: type,
        async: as,
        method: methodType,
        success: successCallBack,
        error: function (data) {

            //alert("Error");
        }
    });
}



 function ajaxFunctionWithoutParam(serviceUrl,type,methodType,as,successCallBack) {

     $.ajax({
         url: serviceUrl,
         dataType: type,
         async: as,
         method: methodType,
         success: successCallBack,
         error: function (data) {

             //alert("Error");
         }
     });
 }




 function colResizing() {
     var pressed = false;
     var start = undefined;
     var startX, startWidth;

     $(document).on("mousedown", "table th", function (e) {
         start = $(this);
         pressed = true;
         startX = e.pageX;
         startWidth = $(this).width();
         $(start).addClass("resizing");
     });

     $(document).mousemove(function (e) {
         if (pressed) {
             $(start).width(startWidth + (e.pageX - startX));
         }
     });

     $(document).mouseup(function () {
         if (pressed) {
             $(start).removeClass("resizing");
             pressed = false;
         }
     });
 }






 