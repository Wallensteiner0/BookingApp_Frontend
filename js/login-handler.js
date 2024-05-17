document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        let isValid = true;
        const errorMessages = [];

        // Validation for Username
        const username = document.getElementById('username');
        const usernameError = document.getElementById('username_Error');
        if (!username.value.trim()) {
            usernameError.style.display = 'block';
            errorMessages.push("Username is required.");
            isValid = false;
        } else {
            usernameError.style.display = 'none';
        }

        // Validation for Password
        const password = document.getElementById('password');
        const passwordError = document.getElementById('password_Error');
        if (!password.value.trim()) {
            passwordError.style.display = 'block';
            errorMessages.push("Password is required.");
            isValid = false;
        } else {
            passwordError.style.display = 'none';
        }

        // Prevent form submission if there are errors
        if (!isValid) {
            event.preventDefault(); // Prevent form submission
        }
    });
});
