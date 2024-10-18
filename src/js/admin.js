function getUsers() {

    const apiUrl = "http://localhost:8080/api/profiles"

    $.ajax({
        type: "GET",
        url: apiUrl,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        },
        success: function (response, status, xhr) {
            console.log(response);
            if (response) {
                var users = response.users;
                $.each(users, function(i, d) {
                    var row = '<tr>';
                    $.each(d, function (j, e) {
                        console.log(e);
                        row += '<td>' + e + '</td>';
                    });
                    if(isAdmin()) {
                        row += '<td><button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#updateUserModal" onclick="getUser(' + d.id + ');">Update</button></td>';
                        row += '<td><button class="btn btn-primary" type="button" onclick="deleteUser(' + d.id + ');">Delete</button></td>';
                    } else {
                        row += '<td></td><td></td>';
                    }
                    row += '</tr>';
                    $('#table_users tbody').append(row);
                });
            } else {
                console.log("Error...!");
            }
        },
        error: function (xhr, status, error) {
            console.error('Error during catching events', error);
        }
    });
}

getUsers();

function deleteUser(userID) {
    if (userID === undefined) userID = -1;

    const apiUrl = "http://localhost:8080/api/profiles/" + userID

    $.ajax({
        type: "DELETE",
        url: apiUrl,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        },
        success: function (response, status, xhr) {
            console.log(response);
            if (response) {
                $('#div_content').load('./pages/home_admin.html');
            } else {
                console.log("Error...!");
            }
        },
        error: function(xhr, status, error) {
            console.error('Error during deleting user', error);
        }
    });
}

$('#saveUser').click(function () {

    const apiUrl = "http://localhost:8080/api/profiles"
    const data = {
        "username": $('#username').val(),
        "email": $('#email').val(),
        "password": $('#password').val(),
        "gender": $('#gender').val(),
        "other": $('#other').val(),
        "role": $('#role').val(),
        "country": {
            "id": $('#country').val(),
            "name": $('#country').text()
        }
    }

        $.ajax({
            type: "POST",
            url: apiUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data),
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            },
            success: function (response, status, xhr) {
                console.log(response);
                if (response) {
                    //bug fix for modal hide
                    $(".modal-backdrop").remove();
                    $("#createEventModal").hide();
                    $('#div_content').load('./pages/home_admin.html');
                } else {
                    console.log("Error...!");
                }
            },
            error: function(xhr, status, error) {
                console.error('Error during creating user', error);
            }
        });
    }
);

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

$("#countryU").append(function () {

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
                    $("#countryU").append(o);
                });
            } else {
                console.log("No countries received!");
            }
        }
    });
});

function getUser(userID) {
    if (userID === undefined) userID = -1;

    const apiUrl = "http://localhost:8080/api/profiles/" + userID

    $.ajax({
        type: "GET",
        url: apiUrl,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        },
        success: function (response, status, xhr) {
            console.log(response);
            if (response) {
                $('#userIDU').val(response.id);
                $('#usernameU').val(response.username);
                $('#emailU').val(response.email);
                $('#genderU').val(response.gender);
                $('#otherU').val(response.other);
                $('#roleU').val(response.role);
                $('#countryU').val(response.country.id);
            } else {
                console.log("Error...!");
            }
        },
        error: function(xhr, status, error) {
            console.error('Error during getting single event', error);
        }
    });
}

$('#updateUser').click(function () {

        const apiUrl = "http://localhost:8080/api/profiles/" + $('#userIDU').val();
        const data = {
            "username": $('#usernameU').val(),
            "email": $('#emailU').val(),
            "gender": $('#genderU').val(),
            "other": $('#otherU').val(),
            "role": $('#roleU').val(),
            "country": {
                "id": $('#countryU').val(),
                "name": $('#countryU').text()
            }
        }

        $.ajax({
            type: "PUT",
            url: apiUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data),
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            },
            success: function (response, status, xhr) {
                console.log(response);
                if (response) {
                    //bug fix for modal hide
                    $(".modal-backdrop").remove();
                    $('#updateUserModal').hide();
                    $('#div_content').load('./pages/home_admin.html');
                } else {
                    console.log("Error...!");
                }
            },
            error: function(xhr, status, error) {
                console.error('Error during updating event', error);
            }
        });
    }

);