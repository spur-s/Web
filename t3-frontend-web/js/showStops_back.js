jQuery(function ($)  {
    $.ajaxSetup({
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      });

    let stop_list = $("#stop_list");
    let route_name = $("#route_name");
    let vechicle_type = $("#type");
    let base_url = 'http://localhost:4800/';
    let params = new URLSearchParams(location.search);
    

function stopList(route) {
    route_name.text(route.routename);
    vechicle_type.text(route.type);    
    $.each(route.stop, function (index, stopDetails) {   
                let myRows = [];
                myRows.push(show_stops(stopDetails,index));
                stop_list.append(myRows);    
    });   

}

function show_stops(stop,index) {
    let oneRow = "<div id='stops_"+index+"_"+stop._id+"' data-value='" + stop.stopname + "_" + stop.lat + "_" + stop.lon + "'>" + stop.stopname + "," + stop.lat + "," + stop.lon + "</div>";
    return oneRow;
}

$.ajax({
    type: 'GET',
    url: base_url + 'routes/'+ params.get('route'),
    success: function (route) {
        stopList(route);
    },
    error: function () {
        alert("Please Login First!");
        $(location).attr("href","login.html");
    }
});

});