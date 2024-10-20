$("#country").append(function () {

    const apiUrl = "http://localhost:8080/api/auth/countries"

    $.ajax({
        type: "GET",
        url: apiUrl,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, status, xhr) {
            console.log(response);
            if (response) {
                $(response.countries).each(function () {
                    console.log($(this));
                    var o = new Option(this.name, this.id);
                    // $(o).html("option text");
                    $("#country").append(o);
                });
            } else {
                displayErrorMsg('registration_error_container','No countries received!');
            }
        },
        error: function(xhr, status, error) {
            displayError('registration_error_container', xhr, status, error);
        }
    });
});

$("#gender").change(function () {

    console.log($(this).val());
    if ($(this).val() === "OTHER") {
        $("#otherDiv").css("visibility", "visible");
    } else {
        $("#otherDiv").css("visibility", "hidden");
    }
});

$("#registerBtn").click(function () {

    const apiUrl = "http://localhost:8080/api/auth/register"
    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();

    if ((username !== "") && (email !== "") && (password !== "")){
        const data = {
            "username": username,
            "email": email,
            "password": password,
            "gender": $('#gender').val(),
            "other": $('#other').val(),
            "country": {
                "id": $('#country').val(),
                "name": $('#country').text()
            }
        }

        $.ajax({
            type: "POST",
            url: apiUrl,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            dataType: "json",
            success: function(response, status, xhr) {
                console.log(response);
                if (response) {
                    alert(response.message);
                    $('#div_content').load('./pages/login.html');
                } else {
                    displayErrorMsg('registration_error_container', 'Registration failed');
                }
            },
            error: function (xhr, status, error) {
                displayError('registration_error_container', xhr, status, error);
            }
        });
    } else {
        displayErrorMsg('registration_error_container', 'Username, email and password are mandatory!');
    }
});
