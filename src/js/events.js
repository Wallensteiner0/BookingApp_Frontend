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
                $.each(events, function(i, event) {
                    var row = '<tr>';

                    row += '<td>' + event.id + '</td>';
                    row += '<td>' + event.title + '</td>';
                    row += '<td>' + event.eventType + '</td>';
                    row += '<td>' + event.eventStatus + '</td>';
                    row += '<td>' + event.price + '</td>';
                    row += '<td>' + displayDate(event.startDate) + '</td>';
                    row += '<td>' + displayDate(event.createdOn) + '</td>';
                    row += '<td>' + displayDate(event.lastUpdatedOn) + '</td>';

                    if(isAdmin()) {
                        row += '<td><button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#updateEventModal" onclick="getEvent(' + event.id + ');">Update</button></td>';
                        row += '<td><button class="btn btn-primary" type="button" onclick="deleteEvent(' + event.id + ');">Delete</button></td>';
                    } else if (isInstructor()) {
                        row += '<td><button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#updateEventModal" onclick="getEvent(' + event.id + ');">Update</button></td>';
                        row += '<td></td>';
                    } else if (isStudent()) {
                        row += '<td><button class="btn btn-primary" type="button" onclick="bookEvent(' + event.id + ');">Book</button></td>';
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
        error: function(xhr, status, error) {
            displayError('eventlist_error_container', xhr, status, error);
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
            displayError('event_create_error_container', xhr, status, error);
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
                displayError('event_update_error_container', xhr, status, error);
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
            displayError('eventlist_error_container', xhr, status, error);
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
            displayError('eventlist_error_container', xhr, status, error);
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
            displayError('eventlist_error_container', xhr, status, error);
        }
    });
}

function displayDate(date) {
    return sqlToJsDate(date).toLocaleString("en-UK", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}
function sqlToJsDate(date){
    var sqlDate = new String(date);
    //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
    var sqlDateArr1 = sqlDate.split("-");
    //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
    var sYear = sqlDateArr1[0];
    var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
    var sqlDateArr2 = sqlDateArr1[2].split("T");
    //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
    var sDay = sqlDateArr2[0];
    var sqlDateArr3 = sqlDateArr2[1].split(":");
    //format of sqlDateArr3[] = ['hh','mm','ss.ms']
    var sHour = sqlDateArr3[0];
    var sMinute = sqlDateArr3[1];

    return new Date(sYear,sMonth,sDay,sHour,sMinute,0,0);
}