$(function () {

    $.ajaxSetup({
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      });

    let base_url = 'http://localhost:4800/';


    $("#signup-btn").on('click', function (e) {
        if(checkForm())
        {
        e.preventDefault();

        let usertype = $("#usertype").val;
        if(usertype === 'admin'){
            usertype=true;
        }
        else usertype =false;

        let users = {
        firstname: $("#fname").val(),
        lastname: $("#lname").val(),
        username: $("#uname").val(),
        password: $("#pass").val(),
        admin: usertype
      //  gender: $('input[gender]:checked').val(),
        //address: $("#address").val(),
        //number: $("#number").val()
        };

        $.ajax({
            type: 'POST',
            url: base_url + 'users/signup',
            data: users,
            success: function (user) {
               alert("Created a account successfully!");
               window.location="login.html";
            },
            error: function () {
                alert("Please insert correct data!");
            }
        });
    }
}
);

    $("#btn-login").on('click', function (e) {
        window.location="login.html";
    });

    function checkForm()
    {
        //return false;
        if($("#fname").val() == "") {
            alert("Please enter your First Name");
            $("#fname").focus();
            return false;
          }
          if($("#lname").val() == "") {
            alert("Please enter your Last Name");
            $("#lname").focus();
            return false;
          }
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
          if($("#address").val() == "") {
            alert("Please enter your Address");
            $("#address").focus();
            return false;
          }
         
         return true;
    }

});

