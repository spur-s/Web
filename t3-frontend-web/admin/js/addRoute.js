jQuery(function ($)  {
    $.ajaxSetup({
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      });

    let stops_list = $("#stop");
   // let stops = [];
    let base_url = 'http://localhost:4800/';

    // get list of stops and add to select START

    function optionTemplate(stop) {
        let oneRow = "<option value='"+ stop._id +"'>" + stop.stopname + "</option>";
        return oneRow;
    }
   
    $.ajax({
        type: 'GET',
        url: base_url + 'stops',
        success: function (stops) {
            let myRows = [];
            $.each(stops, function (index, stop) {
                myRows.push(optionTemplate(stop));
            });
            stops_list.append(myRows);
            
  
    jQuery('#stop').multiSelect({
        afterSelect: function(value, text){
          var get_val = jQuery("#multiple_value").val();
          var hidden_val = (get_val != "") ? get_val+"," : get_val;
          jQuery("#multiple_value").val(hidden_val+""+value);
        },
        afterDeselect: function(value, text){
          var get_val = jQuery("#multiple_value").val();
          var new_val = get_val.replace(value, "");
          jQuery("#multiple_value").val(new_val);
        }
      });
        },
        error: function () {
            alert("Please Login First!");
            $(location).attr("href","../login.html");
        }
    });



    // END
   
    function rowTemplate(route) {
        let oneRow = "<tr><td>" + route.routename + "</td><td>" + route.stop + "</td><td>" + route.type + "</td>";
    
        oneRow += '<td><button type="button" class="btn btn-danger delete" route_id=' + route._id + '>Del</button></td> </tr>';
        return oneRow;
    }
    $.ajax({
        type: 'GET',
        url: base_url + 'routes',
        success: function (routes) {
            let myRows = [];
            $.each(routes, function (index, route) {
                //route.push(rowTemplate(route));
            });
           
        },
        error: function () {
            $(location).attr("href","../login.html");
        }
    });


    $("#add-route").on('click', function () {
        if(checkForm())
        {
        let testarray=$("#multiple_value").val();
        testarray=testarray.trim().split(",")
        console.log(testarray);
        let routes = {
            routename: $("#routename").val(),
            stop: testarray,
            type: $("#type").val(),
            cost: $("#cost").val(),         
    
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'routes',
            'contentType': 'application/json',
            data:JSON.stringify(routes),
            success: function (route) {
               alert("Route added successfully!");
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
      if($("#routename").val() == "") {
        alert("Admin enter Route name!");
        $("#routename").focus();
        return false;
      }
      if($("#multiple_value").val() == "") {
        alert("Admin enter Stops!");
        $("#multiple_value").focus();
        return false;
      }
      if($("#type").val() == "") {
        alert("Admin enter Vehicle Type!");
        $("#type").focus();
        return false;
      }
      if($("#cost").val() == "") {
        alert("Admin enter Vehicle Fare!");
        $("#cost").focus();
        return false;
      }
     return true;
}

});

jQuery('#stop option').ready(function(){

    

});




