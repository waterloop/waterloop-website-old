/**
 * @return {boolean}
 */
function ValidateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function getInputs() {
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    if (ValidateEmail(email) && message.length > 0) {
        return {
            firstname: document.getElementById('first_name').value,
            lastname: document.getElementById('last_name').value,
            email: email,
            subject: document.getElementById('subject').value,
            msg: message,
        };
    } else if (message.length === 0) {
        showMessage("Message field cannot be empty");
        return false;
    } else {
        showMessage("Invalid email");
        return false;
    }
}

function resetFields() {
    document.getElementById('first_name').value = "";
    document.getElementById('last_name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('subject').value = "";
    document.getElementById('message').value = "";
}

function showMessage(text) {
    alert(text);
}

function formatParams( params ){
    return "?" + Object
        .keys(params)
        .map(function(key){
            return key+"="+encodeURIComponent(params[key])
        })
        .join("&");
}

function submitSlackForm(){
    const form = getInputs();

    if (form) {
        $.ajax({
            type: "POST",
            url: "/api/submitSlackForm" + formatParams(form),
            success: function (returnCode) {
                showMessage(returnCode.message);
                resetFields();
            }, error: function (err) {
                showMessage(err.message);
            }
        });
    }
}

function submitEmailForm(){
    const form = getInputs();

    if (form) {
        $.ajax({
            type: "POST",
            url: "/api/submitEmailForm" + formatParams(form),
            success: function (returnCode) {
                showMessage(returnCode.message);
                resetFields();
            }, error: function (err) {
                showMessage(err.message);
            }
        });
    }
}