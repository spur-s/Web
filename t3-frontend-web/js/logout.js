
jQuery(function ($) {
    $.ajaxSetup({
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      });

    let base_url = 'http://localhost:4800/';
    
jQuery('#logout').on("click",e=>{
    e.preventDefault();
    $.ajax({
        type:"GET",
        url:base_url +'users/logout',
        success:function(){
            alert("Sucessfully Logged out!");
            var url ="login.html";
            $(location).attr("href",url);
        },
        error: function(){
            $(location).attr("href","login.html");
        
        }
    })
});

});