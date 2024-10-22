$(document).ready(function () {

    $('#HomeLink').click(function () {
        const roles = getUserRoles();
        if (roles != null) {
            if (roles.includes("ROLE_ADMIN")) {
                $('#div_content').load('./pages/home_admin.html');
            } else if (roles.includes("ROLE_INSTRUCTOR")) {
                $('#div_content').load('./pages/home_instructor.html');
            } else if (roles.includes("ROLE_STUDENT")) {
                $('#div_content').load('./pages/home_student.html');
            }
        } else {
            $('#div_content').load('./pages/home.html');
        }
    });
    $('#HomeButton').click(function () {
        $('#div_content').load('./pages/home.html');
    });
    $('#ProfileLink').click(function () {
        $('#div_content').load('./pages/profile.html');
    });
    $('#EventsLink').click(function () {
        $('#div_content').load('./pages/events.html');
    });
    $('#CoursesLink').click(function () {
        $('#div_content').load('./pages/courses.html');
    });
    $('#ContactLink').click(function () {
        $('#div_content').load('./pages/contact.html', function () {
            $('#div_content').addClass('no-center');
        });
    });
    $('#TeamLink').click(function () {
        $('#div_content').load('./pages/team.html');
    });
    $('#FAQLink').click(function () {
        $('#div_content').load('./pages/faq.html');
    });

    $('#RegistrationLink').click(function () {
        $('#div_content').load('./pages/registration.html');
    });
    $('#LoginLink').click(function () {
        $('#div_content').load('./pages/login.html');
    });

    const roles = getUserRoles();
    if (roles != null) {
        $('#UserNameText').html("Hi, " + getUserName() + "!");
    }
});