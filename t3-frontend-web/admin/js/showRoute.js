jQuery(function ($) {
    $.ajaxSetup({
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      });
    let listroute = $("#list-route");
    let base_url = 'http://localhost:4800/';

    function rowTemplate(route) {
        //let oneRow = "<tr><td>" + route.routename + "</td><td>" + route.stop +"</td> <td>" + route.type + "</td>";
        let oneRow = "<tr><td>" + route.routename + "</td><td>" + route.type + "</td>";
       // oneRow += '<td><button type="button" class="btn btn-info edit" route_id=' + route._id + '>Edit</button>';
        oneRow += '<td>&nbsp;&nbsp;<button type="button" class="btn btn-danger delete" route_id=' + route._id + '>Delete Route</button></td> </tr>';
        return oneRow;
    }

    $.ajax({
        type: 'GET',
        url: base_url + 'routes',
        success: function (routes) {
            let myRows = [];
            $.each(routes, function (index, route) {
                myRows.push(rowTemplate(route));
            });
            listroute.append(myRows);
        },
        error: function () {
            alert("Please Login First!");
            $(location).attr("href","../login.html");
        }
    });

    

        //using deligates
        listroute.on('click', '.delete', function () {
        if (confirm("Do you want to delete route?")) {
        $.ajax({
            type: 'DELETE',
            url: base_url + 'routes/' + $(this).attr('route_id'),
            success: function () {
                location.reload();
            }
        })
    }
    });

    listroute.on('click', '.edit', function () {
        if (confirm("Do you want to edit this stop?")) {
           
            /*
        $.ajax({
            type: 'DELETE',
            url: base_url + 'stops/' + $(this).attr('stop_id'),
            success: function () {
                location.reload();
            }
        })
        */
    }
    });

});



