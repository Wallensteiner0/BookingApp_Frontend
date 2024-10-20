var token = ""
$("#loginBtn").click(function () {

    const apiUrl = "http://localhost:8080/api/auth/login"
    const data = {
        "username": $('#username').val(),
        "password": $('#password').val()
    }



    if (($("#username").val() !== "") && ($("#password").val() !== "")) {

        $.ajax({
            type: "POST",
            url: apiUrl,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            dataType: "json",
            success: function(response, status, xhr) {
                console.log(response);
                $('#result').val(JSON.stringify(response));
                //token from the response header
                token = xhr.getResponseHeader("Authorization");

                if (token) {
                    // Remove the "Bearer " prefix (first 7 characters)
                    token = token.substring(7);
                    console.log(token);
                    localStorage.setItem("token", token);
                }

                // console.log(localStorage.getItem('bookingCookie'))
                if (response) {
                    const roles = response.roles;
                    localStorage.setItem("userRoles",response.roles);
                    localStorage.setItem("userName",response.username);

                    if (roles.includes("ROLE_ADMIN")) {
                        $('#div_content').load('./pages/home_admin.html');
                    } else if (roles.includes("ROLE_INSTRUCTOR")) {
                        $('#div_content').load('./pages/home_instructor.html');
                    } else if (roles.includes("ROLE_STUDENT")) {
                        $('#div_content').load('./pages/home_student.html');
                    } else {
                        //$('#div_content').load('./pages/home.html');
                    }
                    $('#div_navigation').load('./pages/navigation_loggedin.html');
                } else {
                    console.log("Login failed");
                }
            },
            error: function(xhr, status, error) {
                console.error('Error during login:', error);
                displayError('login_error_container', xhr, status, error);
            }
        });
    } else {
        displayErrorMsg('login_error_container','Username or password missing!');
    }
});
