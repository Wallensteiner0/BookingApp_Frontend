function getUserRoles() {
    return localStorage.getItem("userRoles");
}

function getUserName() {
    return localStorage.getItem("userName");
}

function isAdmin() {
    var roles = getUserRoles();
    if(roles) {
        return roles.includes("ADMIN");
    }
    return false;
}

function isInstructor() {
    var roles = getUserRoles();
    if(roles) {
        return roles.includes("INSTRUCTOR");
    }
    return false;
}

function isStudent() {
    var roles = getUserRoles();
    if(roles) {
        return roles.includes("STUDENT");
    }
    return false;
}