function getBookings() {

    const apiUrl = "http://localhost:8080/api/bookings"

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
                var bookings = response.bookings;
                $.each(bookings, function(i, booking) {
                    var event = booking.event;
                    var user = booking.user;

                    var row = '<tr>';
                    row += '<td>' + booking.id + '</td>';
                    row += '<td>' + event.title + '</td>';
                    row += '<td>' + event.eventType + '</td>';
                    row += '<td>' + event.price + '</td>';
                    row += '<td>' + event.startDate + '</td>';
                    row += '<td>' + booking.createdOn + '</td>';
                    if(isAdmin()) {
                        row += '<td><button class="btn btn-primary" type="button" onclick="deleteBooking(' + booking.id + ');">Delete</button></td>';
                    } else if (isInstructor()) {
                        row += '<td></td>';
                    } else if (isStudent()) {
                        row += '<td><button class="btn btn-primary" type="button" onclick="deleteBooking(' + booking.id + ');">Delete</button></td>';
                    } else {
                        row += '<td></td>';
                    }
                    row += '</tr>';
                    $('#table_bookings tbody').append(row);
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

getBookings();

function deleteBooking(bookingID) {
    if (bookingID === undefined) bookingID = -1;

    const apiUrl = "http://localhost:8080/api/bookings/" + bookingID

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
                $('#div_content').load('./pages/bookings.html');
            } else {
                console.log("Error...!");
            }
        },
        error: function(xhr, status, error) {
            console.error('Error during deleting event', error);
        }
    });
}