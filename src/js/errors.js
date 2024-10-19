function displayError(errorContainerID, error) {
    console.error(error);
    $(errorContainerID + '_message').innerHTML = error.message;
    $(errorContainerID).show();
}