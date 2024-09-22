function getProfile() {

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
                var o = new Option(response.country.name, response.country.id);
                $("#country").append(o);
                $("#username").val(response.username);
                $("#email").val(response.email);
                $("#gender").val(response.gender);
            } else {
                console.log("Error...!");
            }
        },
        error: function(xhr, status, error) {
            console.error('Error during catching profile:', error);
        }
    });
}

getProfile();