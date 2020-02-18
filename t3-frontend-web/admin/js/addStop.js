jQuery(function ($)  {

    $.ajaxSetup({
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      });

    let base_url = 'http://localhost:4800/';
   

    function rowTemplate(stop) {
        let oneRow = "<tr><td>" + stop.stopname + "</td><td>" + stop.lat + "</td><td>" + stop.lon + "</td>";
    
        oneRow += '<td><button type="button" class="btn btn-danger delete" stop_id=' + stop._id + '>Del</button></td> </tr>';
        return oneRow;
    }

    $.ajax({
        type: 'GET',
        url: base_url + 'stops',
        success: function (stops) {
            let myRows = [];
            $.each(stops, function (index, stop) {
                myRows.push(rowTemplate(stop));
            });
           
        },
        error: function () {
            alert("Please Login First!");
            $(location).attr("href","../login.html");
        }
    });

   

    $("#add-stop").on('click', function () {
        if(checkForm())
    {
        let stops = {
            stopname: $("#stopname").val(),
            lat: $("#lat").val(),
            lon: $("#lon").val(),
    
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'stops',
            data: stops,
            success: function (stop) {
               alert("Stop added succesfully")
               location.reload();        
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
 
       }
       });

   
function checkForm()
{
      if($("#stopname").val() == "") {
        alert("Admin enter Stops name!");
        $("#stopname").focus();
        return false;
      }
      if($("#lat").val() == "") {
        alert("Admin enter Latitude!");
        $("#lat").focus();
        return false;
      }
      if($("#lon").val() == "") {
        alert("Admin enter Longitute!");
        $("#lon").focus();
        return false;
      }
     return true;
}

  

});



