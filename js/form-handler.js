document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        let isValid = true;
        let errorMessages = [];

        // Validation for First Name
        const firstName = document.getElementById('firstName');
        const firstNameError = document.getElementById('firstName_Error');
        if (!firstName.value.trim()) {
            firstNameError.textContent = "First name is required.";
            firstNameError.style.display = 'block';
            errorMessages.push("First name is required.");
            isValid = false;
        } else {
            firstNameError.style.display = 'none';
        }

        // Repeat similar blocks for other fields...
        // Validation for Family Name
        const familyName = document.getElementById('familyName');
        const familyNameError = document.getElementById('familyName_Error');
        if (!familyName.value.trim()) {
            familyNameError.textContent = "Family name is required.";
            familyNameError.style.display = 'block';
            errorMessages.push("Family name is required.");
            isValid = false;
        } else {
            familyNameError.style.display = 'none';
        }

        // Validation for Gender
        const gender = document.getElementById('gender');
        const genderError = document.getElementById('gender_Error');
        if (gender.value === "Choose...") {
            genderError.textContent = "Gender is required.";
            genderError.style.display = 'block';
            errorMessages.push("Gender is required.");
            isValid = false;
        } else {
            genderError.style.display = 'none';
        }

        // Validation for Date of Birth
        const dob = document.getElementById('dob');
        const dobError = document.getElementById('dob_Error');
        if (!dob.value.trim()) {
            dobError.textContent = "Date of Birth is required.";
            dobError.style.display = 'block';
            errorMessages.push("Date of Birth is required.");
            isValid = false;
        } else {
            dobError.style.display = 'none';
        }

        // Validation for Street
        const street = document.getElementById('street');
        const streetError = document.getElementById('street_Error');
        if (!street.value.trim()) {
            streetError.textContent = "Street is required.";
            streetError.style.display = 'block';
            errorMessages.push("Street is required.");
            isValid = false;
        } else {
            streetError.style.display = 'none';
        }

        // Validation for Number
        const number = document.getElementById('number');
        const numberError = document.getElementById('number_Error');
        if (!number.value.trim()) {
            numberError.textContent = "Number is required.";
            numberError.style.display = 'block';
            errorMessages.push("Number is required.");
            isValid = false;
        } else {
            numberError.style.display = 'none';
        }

        // Validation for Top-Number
        const topNumber = document.getElementById('topNumber');
        const topNumberError = document.getElementById('topNumber_Error');
        if (!topNumber.value.trim()) {
            topNumberError.textContent = "Top-Number is required.";
            topNumberError.style.display = 'block';
            errorMessages.push("Top-Number is required.");
            isValid = false;
        } else {
            topNumberError.style.display = 'none';
        }

        // Validation for ZIP-Code
        const zipCode = document.getElementById('zipCode');
        const zipCodeError = document.getElementById('zipCode_Error');
        if (!zipCode.value.trim()) {
            zipCodeError.textContent = "ZIP-Code is required.";
            zipCodeError.style.display = 'block';
            errorMessages.push("ZIP-Code is required.");
            isValid = false;
        } else {
            zipCodeError.style.display = 'none';
        }

        // Validation for City
        const city = document.getElementById('city');
        const cityError = document.getElementById('city_Error');
        if (!city.value.trim()) {
            cityError.textContent = "City is required.";
            cityError.style.display = 'block';
            errorMessages.push("City is required.");
            isValid = false;
        } else {
            cityError.style.display = 'none';
        }

        // Validation for Country
        const country = document.getElementById('country');
        const countryError = document.getElementById('country_Error');
        if (!country.value.trim()) {
            countryError.textContent = "Country is required.";
            countryError.style.display = 'block';
            errorMessages.push("Country is required.");
            isValid = false;
        } else {
            countryError.style.display = 'none';
        }

        // Validation for Phone Number
        const phoneNumber = document.getElementById('phoneNumber');
        const phoneNumberError = document.getElementById('phoneNumber_Error');
        if (!phoneNumber.value.trim()) {
            phoneNumberError.textContent = "Phone Number is required.";
            phoneNumberError.style.display = 'block';
            errorMessages.push("Phone Number is required.");
            isValid = false;
        } else {
            phoneNumberError.style.display = 'none';
        }

        // Validation for Email
        const email = document.getElementById('email');
        const emailError = document.getElementById('email_Error');
        if (!email.value.trim()) {
            emailError.textContent = "Email is required.";
            emailError.style.display = 'block';
            errorMessages.push("Email is required.");
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Validation for Password
        const password = document.getElementById('password');
        const passwordError = document.getElementById('password_Error');
        if (!password.value.trim()) {
            passwordError.textContent = "Password is required.";
            passwordError.style.display = 'block';
            errorMessages.push("Password is required.");
            isValid = false;
        } else {
            passwordError.style.display = 'none';
        }

        // Validation for Repeat Password
        const repeatPassword = document.getElementById('repeatPassword');
        const repeatPasswordError = document.getElementById('repeatPassword_Error');
        if (!repeatPassword.value.trim()) {
            repeatPasswordError.textContent = "Repeat Password is required.";
            repeatPasswordError.style.display = 'block';
            errorMessages.push("Repeat Password is required.");
            isValid = false;
        } else if (password.value.trim() && repeatPassword.value.trim() && password.value !== repeatPassword.value) {
            repeatPasswordError.textContent = "Passwords do not match.";
            repeatPasswordError.style.display = 'block';
            errorMessages.push("Passwords do not match.");
            isValid = false;
        } else {
            repeatPasswordError.style.display = 'none';
        }

        // Validation for Passport Picture
        const passportPicture = document.getElementById('passportPicture');
        const passportPictureError = document.getElementById('passportPicture_Error');
        if (!passportPicture.value.trim()) {
            passportPictureError.textContent = "Passport Picture is required.";
            passportPictureError.style.display = 'block';
            errorMessages.push("Passport Picture is required.");
            isValid = false;
        } else {
            passportPictureError.style.display = 'none';
        }

        // Display Modal if there are errors
        if (!isValid) {
            document.getElementById('modalErrorMessage').textContent = 'Please correct the errors below:';
            const errorList = document.getElementById('errorList');
            errorList.innerHTML = ''; // Clear previous errors
            errorMessages.forEach(msg => {
                const li = document.createElement('li');
                li.textContent = msg;
                errorList.appendChild(li);
            });

            const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
            errorModal.show();
            event.preventDefault(); // Prevent form submission
        }
    });
});
