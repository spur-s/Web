

jQuery(function ($)  {
   
   
    $.ajaxSetup({
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      });

    let routes_list = $("#routename");

    let base_url = 'http://localhost:4800/';


function oneTemplate(route) {
    let oneRow = "<button class='btn-sm btn-block rounded-sm'> <a href='showStops.html?route=" + route._id + "'><b>" + route.routename + "</b></a> </button>";
    return oneRow;
}

$.ajax({
    type: 'GET',
    url: base_url + 'routes',
    success: function (routes) {
        let myRows = [];
        $.each(routes, function (index, route) {
            myRows.push(oneTemplate(route));
        });
       routes_list.append(myRows);
    },
    error: function () {
        
        $(location).attr("href","login.html");
    }
});

$(".btn_search").on('click', function (event) {
    if(checkForm())
    {
    let searchdetails = $('#txtlocation').val()+'-'+$('#txtdestination').val();
    $.ajax({
        type: 'GET',
        url: base_url + 'routes/'+searchdetails+'/search',
        success: function (searchresult) {
            if(searchresult.length>0){
            window.location="showStops.html?route="+searchresult[0]._id;
        }
        else{
            alert("Destination still not available!");
        }           

      },        
        error: function () {
        }
    });
}
});

$('.btn_clear').click(
    function(){
        $('#txtlocation').val('');
        $('#txtdestination').val('');
    }
)
function checkForm()
{
      if($("#txtlocation").val() == "") {
        alert("Please enter your Current Location!");
        $("#txtlocation").focus();
        return false;
      }
      if($("#txtdestination").val() == "") {
        alert("Please enter your Destination Location!");
        $("#txtdestination").focus();
        return false;
      }
     
     return true;
}

});