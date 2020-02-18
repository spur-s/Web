jQuery(function ($)  {

    $.ajaxSetup({
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      });
    let stop_list = $("#stop_list");
    let route_name = $("#route_name");
    let fare=$("#fare");
    let vechicle_type = $("#type");
    let show_map = $("#show_map");
    show_map.hide();
    let base_url = 'http://localhost:4800/';
    let params = new URLSearchParams(location.search);
    

function stopList(route) {
    route_name.text(route.routename);
    vechicle_type.text("-> Vehicle: "+route.type);  
    fare.text("-> Fare: NPR-"+route.cost);
    $.each(route.stop, function (index, stopDetails) {   
                let myRows = [];
                myRows.push(show_stops(stopDetails,index));
                stop_list.append(myRows);    
                show_map.show();
    });   

}

function show_stops(stop,index) {
    //let oneRow = "<div id='stops_"+index+"_"+stop._id+"' data-value='" + stop.stopname + "_" + stop.lat + "_" + stop.lon + "'>" + stop.stopname + "</div>";
    let oneRow = "<li class='list-group-item d-flex justify-content-between align-items-center '  id='stops_"+index+"_"+stop._id+"' data-value='" + stop.stopname + "_" + stop.lat + "_" + stop.lon + "'><i class='fa fa-arrow-right'></i><h5>" + stop.stopname + "</h5><i class='fa fa-bus fa-2x'></i></li>";
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