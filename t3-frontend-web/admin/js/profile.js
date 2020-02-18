jQuery(function ($) {

    let userid = localStorage.getItem('userid');
   // alert(userid);
   $.ajaxSetup({
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  });
    let base_url = 'http://localhost:4800/';
   // let update_user = $("#update-user");
    function add(users) {
      $("#gfirstname").val(users.firstname);
      $("#glastname").val(users.lastname);
      $("#gusername").val(users.username);
      $("#gpassword").val(users.password);
      $("#efirstname").val(users.firstname);
      $("#elastname").val(users.lastname);
      $("#eusername").val(users.username);
      $("#epassword").val(users.password);
    }

    $.ajax({
        type: 'GET',
        url: base_url + 'users/profile',
        success: function (me) {
           let users=me;
            add(users);
        },
        error: function () {
            alert("Please Login First!");
            $(location).attr("href","../login.html");
        }
    });

    
 
        $("#update-user").on('click', function (event) {
            if(checkForm())
            {
            event.preventDefault();
    let usersup = {
        firstname: $("#efirstname").val(),
        lastname: $("#elastname").val(),
        username: $("#eusername").val(),
        password: $("#epassword").val(),
    }
    $.ajax({
        type: 'PUT',
        url: base_url + 'users/profile',
        data:usersup,
        success: function () {
           alert("User updated succesfully");
           location.reload();
        },
        error: function () {
            alert("Not Allowed!");
            location.reload();
        }
    });
}
});

function checkForm()
    {
        //return false;
        if($("#efirstname").val() == "") {
            alert("Please enter your First Name");
            $("#efirstname").focus();
            return false;
          }
          if($("#elastname").val() == "") {
            alert("Please enter your Last Name");
            $("#elastname").focus();
            return false;
          }
          if($("#eusername").val() == "") {
            alert("Please enter your User Name");
            $("#eusername").focus();
            return false;
          }
          if($("#epassword").val() == "") {
            alert("Please enter your Password");
            $("#epassword").focus();
            return false;
          }
         
         return true;
    }

});
