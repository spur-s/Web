jQuery(function ($) {

    $.ajaxSetup({
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      });
      
    let liststop = $("#list-stop");
    let base_url = 'http://localhost:4800/';

   

    function rowTemplate(stop) {
        let oneRow = "<tr row_id='"+ stop._id +"'><td><div class='row_data' col_name='stopname'>" + stop.stopname + "</div></td><td><div class='row_data' col_name='lat'>" + stop.lat + "</div></td><td><div class='row_data' col_name='lon'>" + stop.lon + "</div></td>";
    
        oneRow += '<td><button type="button" class="btn btn-info btn_edit" stop_id=' + stop._id + '>Edit</button>';
        oneRow +='<span class="btn_save"> <a href="#" class="btn btn-link"  row_id="'+stop._id+'"> Save</a> | </span>';
		oneRow +='<span class="btn_cancel"> <a href="#" class="btn btn-link" row_id="'+stop._id+'"> Cancel</a> | </span>';
        oneRow += '&nbsp;&nbsp;<button type="button" class="btn btn-danger delete" stop_id=' + stop._id + '>Del</button></td> </tr>';
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
            liststop.append(myRows);
        },
        error: function () {
            alert("Please Login First!");
            $(location).attr("href","../login.html");
        }
    });

    

        //using deligates
        liststop.on('click', '.delete', function () {
        if (confirm("Do you want to delete this stops?")) {
        $.ajax({
            type: 'DELETE',
            url: base_url + 'stops/' + $(this).attr('stop_id'),
            success: function () {
                location.reload();
            }
        })
    }
    });

    liststop.on('click', '.btn_edit', function () {
        if (confirm("Do you want to edit this stops?")) {
         
                event.preventDefault();
                var tbl_row = $(this).closest('tr');
            
                var row_id = tbl_row.attr('row_id');
            
                tbl_row.find('.btn_save').show();
                tbl_row.find('.btn_cancel').show();
            
                //hide edit button
                tbl_row.find('.btn_edit').hide(); 
            
                //make the whole row editable
                tbl_row.find('.row_data')
                .attr('contenteditable', 'true')
                .attr('edit_type', 'button')
                .addClass('bg-warning')
                .css('padding','3px')
            
                //--->add the original entry > start
                tbl_row.find('.row_data').each(function(index, val) 
                {  
                    //this will help in case user decided to click on cancel button
                    $(this).attr('original_entry', $(this).html());
                }); 		
                //--->add the original entry > end
         
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

    liststop.on('click', '.btn_save', function () {
	event.preventDefault();
	var tbl_row = $(this).closest('tr');

	var row_id = tbl_row.attr('row_id');

	
	//hide save and cacel buttons
	tbl_row.find('.btn_save').hide();
	tbl_row.find('.btn_cancel').hide();

	//show edit button
	tbl_row.find('.btn_edit').show();


	//make the whole row editable
	tbl_row.find('.row_data')
	.attr('edit_type', 'click')	
	.removeClass('bg-warning')
	.css('padding','') 

	//--->get row data > start
	var arr = {}; 
	tbl_row.find('.row_data').each(function(index, val) 
	{   
		var col_name = $(this).attr('col_name');  
		var col_val  =  $(this).html();
		arr[col_name] = col_val;
    });
    
	//--->get row data > end

	//use the "arr"	object for your ajax call
	//$.extend(arr, {row_id:row_id});
    let stops = {
        stopname: arr['stopname'],
        lat:  arr['lat'],
        lon:  arr['lon'],
        //stop_id: row_id

    };
    console.log(stops);

    $.ajax({
        type: 'PUT',
        url: base_url + 'stops/' + row_id,
        data:stops,
        success: function () {
           alert("Stops updated succesfully");
           location.reload();
        },
        error: function () {
            alert("Not Allowed!");
            location.reload();
        }
    });
});



});



