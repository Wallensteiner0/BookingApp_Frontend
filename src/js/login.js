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
                //token
                token = xhr.getResponseHeader("Authorization");

                if (token) {
                    // Remove the "Bearer " prefix (first 7 characters)
                    token = token.substring(7);
                    console.log(token);
                    localStorage.setItem("token", token);
                }

                // console.log(localStorage.getItem('bookingCookie'))
                if (response) {
                    localStorage.setItem("userRoles",response.roles);
                    $("#userName").html("Hello " + response.username + "!");
                } else {
                    console.log("Login failed");
                }
            },
            error: function(xhr, status, error) {
                console.error('Error during login:', error);
                $('#result').val('Error during login');
            }
        });
    } else {
        alert("Username or password missing!");
    }
});
