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
                var o = new Option(response.country.name, response.country.id);
                $("#country").append(o);
                $("#username").val(response.username);
                $("#email").val(response.email);
                $("#gender").val(response.gender);
                loadPicture(response.profilePictureRef);
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

async function loadPicture(profilePictureRef) {
    if(profilePictureRef != null) {
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
                console.error('Error downloading profile picture', error);
            }
        });
    } else {
        document.getElementById('profile_pic').setAttribute('src', "../src/images/profile_pic.png");
    }
}