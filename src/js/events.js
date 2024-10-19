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
                    var row = '<tr>';
                    $.each(d, function (j, e) {
                        console.log(e);
                        row += '<td>' + e + '</td>';
                    });
                    if(isAdmin()) {
                        row += '<td><button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#updateEventModal" onclick="getEvent(' + d.id + ');">Update</button></td>';
                        row += '<td><button class="btn btn-primary" type="button" onclick="deleteEvent(' + d.id + ');">Delete</button></td>';
                    } else if (isInstructor()) {
                        row += '<td><button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#updateEventModal" onclick="getEvent(' + d.id + ');">Update</button></td>';
                        row += '<td></td>';
                    } else if (isStudent()) {
                        row += '<td><button class="btn btn-primary" type="button" onclick="bookEvent(' + d.id + ');">Book</button></td>';
                        row += '<td></td>';
                    } else {
                        row += '<td></td><td></td>';
                    }
                    row += '</tr>';
                    $('#table_events tbody').append(row);
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

getEvents();



$('#saveEvent').click(function () {

    const apiUrl = "http://localhost:8080/api/events"
    const data = {
        "title": $('#eventTitle').val(),
        "eventType": $('#eventType').val(),
        "eventStatus": $('#eventStatus').val(),
        "price": $('#eventPrice').val(),
        "startDate": $('#eventDate').val()
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
                $('#div_content').load('./pages/events.html');
            } else {
                console.log("Error...!");
            }
        },
        error: function(xhr, status, error) {
            console.error('Error during creating event', error);
        }
    });
    }
    
);

$('#updateEvent').click(function () {

        const apiUrl = "http://localhost:8080/api/events/" + $('#eventIDU').val();
        const data = {
            "title": $('#eventTitleU').val(),
            "eventType": $('#eventTypeU').val(),
            "eventStatus": $('#eventStatusU').val(),
            "price": $('#eventPriceU').val(),
            "startDate": $('#eventDateU').val()
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
                    $('#updateEventModal').hide();
                    $('#div_content').load('./pages/events.html');
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

function bookEvent(eventID) {
    if (eventID === undefined) eventID = -1;

    const apiUrl = "http://localhost:8080/api/bookings?eventId=" + eventID

    $.ajax({
        type: "POST",
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
                $('#div_content').load('./pages/events.html');
            } else {
                console.log("Error...!");
            }
        },
        error: function(xhr, status, error) {
            console.error('Error during deleting event', error);
        }
    });
}

function deleteEvent(eventID) {
    if (eventID === undefined) eventID = -1;

    const apiUrl = "http://localhost:8080/api/events/" + eventID

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
                $('#div_content').load('./pages/events.html');
            } else {
                console.log("Error...!");
            }
        },
        error: function(xhr, status, error) {
            console.error('Error during deleting event', error);
        }
    });
}

function getEvent(eventID) {
    if (eventID === undefined) eventID = -1;

    const apiUrl = "http://localhost:8080/api/events/" + eventID

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
                $('#eventIDU').val(response.id);
                $('#eventTitleU').val(response.title);
                $('#eventTypeU').val(response.eventType);
                $('#eventStatusU').val(response.eventStatus);
                $('#eventPriceU').val(response.price);
                $('#eventDateU').val(response.startDate);
            } else {
                console.log("Error...!");
            }
        },
        error: function(xhr, status, error) {
            console.error('Error during getting single event', error);
        }
    });
}