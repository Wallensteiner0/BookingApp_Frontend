function displayError(errorContainerID, xhr, status, error) {
    var resp = xhr.responseText;
    var respJson = JSON.parse(resp);
    const alertPlaceholder = document.getElementById(errorContainerID);

    const errorAlert = (message, data, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} d-flex align-items-center alert-dismissible" role="alert">`,
                `<div>${message}</div>`,
                `<div> ${data}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }
    var data =respJson.data;
    if(Object.is(data, null)) data = "";
    errorAlert(respJson.message, data , 'danger');

}

function displayErrorMsg(errorContainerID, error) {
    const alertPlaceholder = document.getElementById(errorContainerID);

    const errorAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} d-flex align-items-center alert-dismissible" role="alert">`,
            `<div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }

    errorAlert(error, 'warning');
}

function displaySuccessMsg(errorContainerID, error) {
    const alertPlaceholder = document.getElementById(errorContainerID);

    const errorAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} d-flex align-items-center alert-dismissible" role="alert">`,
            `<div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }

    errorAlert(error, 'success');
}