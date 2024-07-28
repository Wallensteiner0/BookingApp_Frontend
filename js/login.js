$("#loginBtn").click(function () {

    const apiUrl = "http://localhost:8080/api/auth/login"
    const data = {
        "username": $('#username').val(),
        "password": $('#password').val()
    }

    if (($("#username").val() !== "") && ($("#password").val() !== "")) {
        console.log("hello");
        $.ajax({
            type: "POST",
            url: apiUrl,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            dataType: "json",
            success: function(response, status, xhr) {
                console.log(response);
                $('#result').val(JSON.stringify(response))
                //token
                console.log(xhr.getResponseHeader("Authorization"))
                // console.log(localStorage.getItem('bookingCookie'))
                if (response) {
                    $("#userName").html("Hello " + response.username + "!");
                } else {
                    console.log("Login failed");
                }
            }
        });
    } else {
        alert("Username or password missing!");
    }
});
