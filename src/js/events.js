function getEvents() {

    const apiUrl = "http://localhost:8080/api/events"

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
                var events = response.events;
                $.each(events, function(i, d) {
                    var row='<tr>';
                    $.each(d, function(j, e) {
                        console.log(e);
                        row+='<td>'+e+'</td>';
                    });
                    row+='</tr>';
                    $('#table_events tbody').append(row);
                });
            } else {
                console.log("Error...!");
            }
        },
        error: function(xhr, status, error) {
            console.error('Error during catching events', error);
        }
    });
}

getEvents();