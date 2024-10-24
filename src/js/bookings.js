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
                    row += '<td>' + displayDate(event.startDate) + '</td>';
                    row += '<td>' + displayDate(booking.createdOn) + '</td>';
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
        error: function(xhr, status, error) {
            displayError('bookings_error_container', xhr, status, error);
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
            displayError('bookings_error_container', xhr, status, error);
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