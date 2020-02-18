$(function () {

    let base_url = 'http://localhost:4800/';

    $.ajaxSetup({
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      });

    $("#login-btn").on('click', function (event) {
        if(checkForm())
        {
        event.preventDefault();
        let users = {
            
        username: $("#uname").val(),
        password: $("#pass").val(),
           
    
        };

        $.ajax({
            type: 'POST',
            url: base_url + 'users/login',
            data: users,
            success: function (users) {
                console.log(users);

            let userid = localStorage.setItem('userid',users.userid);
              if(users.usertype==true){
               alert("Admin login successful!");
               window.location="admin/dashboard.html";
          }
               else{
                alert("User Login successful!");
                  window.location="dashboard.html";
               }
            },
            error: function () {
                alert("Enter a Correct username or Password!");
            }
        });
     }
     });
    $("#btn-register").on('click', function (event) {
        window.location = "index.html";
    });

    function checkForm()
    {
          if($("#uname").val() == "") {
            alert("Please enter your User Name");
            $("#uname").focus();
            return false;
          }
          if($("#pass").val() == "") {
            alert("Please enter your Password");
            $("#pass").focus();
            return false;
          }
         
         return true;
    }
});