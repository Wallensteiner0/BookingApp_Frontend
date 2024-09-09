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
                console.log("No countries received!");
            }
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
    const data = {
        "username": $('#username').val(),
        "email": $('#email').val(),
        "password": $('#password').val(),
        "gender": $('#gender').val(),
        "other": $('#other').val(),
        "country": {
            "id": $('#country').val(),
            "name": $('#country').text()
        }
    }

    if (($("#username").val() !== "") && ($("#email").val() !== "") && ($("#password").val() !== "")){
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
                } else {
                    console.log("Registration failed");
                }
            }
        });
    } else {
        alert("Username, email and password are mandatory!");
    }
});
