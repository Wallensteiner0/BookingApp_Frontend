$("#country").click(function () {

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
                    $("#country").add("<option value=\"this.id\">this.name</option>");
                });
            } else {
                console.log("No countries received!");
            }
        }
    });
});