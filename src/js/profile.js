function getProfile() {

    const apiUrl = "http://localhost:8080/api/profile"

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
                $("#username").val(response.username);
                $("#email").val(response.email);
                $("#gender").val(response.gender);
                $("#country").val(response.country.id);
                loadPicture(response.profilePictureRef);
            } else {
                displayErrorMsg('profile_error_container','Error retrieving profile!');
            }
        },
        error: function(xhr, status, error) {
            displayError('profile_error_container', xhr, status, error);
        }
    });
}

getProfile();

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

async function loadPicture(profilePictureRef) {
    if(profilePictureRef != null && profilePictureRef.length !== 0) {
        $.ajax({
            url: 'http://localhost:8080/api/pictures/' + profilePictureRef,
            type: 'GET',
            //dataType: 'text',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
            //responseType: 'text',
            processData: false,
            async: false,
            success: function (response, status, xhr){
                console.log(response);
                // console.log(atob(response));
                // console.log(btoa(encodeURIComponent(response)));
                // console.log(xhr.getAllResponseHeaders());
                const type = xhr.getResponseHeader('content-type');
                // console.log(type);
                // const blob = new Blob([response], { type });
                // const reader = new FileReader();
                // reader.onload = e => {
                //
                // };
                // reader.readAsDataURL(blob);
                document.getElementById('profile_pic').setAttribute('src', "data:" + type + ";base64," + response);
            },
            error: function(xhr, status, error) {
                displayError('profile_error_container', xhr, status, error);
            }
        });
    } else {
        document.getElementById('profile_pic').setAttribute('src', "../src/images/profile_pic.png");
    }
}

async function uploadFile() {
    let formData = new FormData();
    formData.append("picture", fileupload.files[0]);
    await fetch('http://localhost:8080/api/pictures', {
        method: "POST",
        body: formData,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    });
    displaySuccessMsg('profile_error_container', 'The picture has been uploaded successfully.');
    setTimeout(() => {  $('#div_content').load('./pages/profile.html') }, 2000);
}

$('#updateProfile').click(function () {
    const apiUrl = "http://localhost:8080/api/profiles";
    const data = {
        "username": $('#username').val(),
        "email": $('#email').val(),
        "gender": $('#gender').val(),
        "other": $('#other').val(),
        "country": {
            "id": $('#country').val(),
            "name": $('#country').text()
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
                displaySuccessMsg('profile_error_container', 'Profile updated successfully.');
            } else {
                displayErrorMsg('profile_error_container','Error updating profile!');
            }
        },
        error: function(xhr, status, error) {
            displayError('profile_error_container', xhr, status, error);
        }
    });
    }

);