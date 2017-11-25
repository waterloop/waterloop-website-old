function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

function submitEmailForm(){
    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    assert(message.length > 0, "Message should not be empty");
    $.ajax({
        type: "POST",
        url: "/api/submitEmailForm",
        data: {firstname: first_name,lastname:last_name, email: email, subject:subject, msg:message},
        success: function (returnCode) {
            alert(returnCode.message);
        },
        error: function (err) {
            alert(err.message)
        }
    });
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
    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    assert(message.length > 0, "Message should not be empty");
    $.ajax({
        type: "POST",
        url: "/api/submitSlackForm"+formatParams({firstname: first_name,lastname:last_name, email: email, subject:subject, msg:message}),
        success: function (returnCode) {
            alert(returnCode.message);
        },
        error: function (err) {
            alert(err.message)
        }
    });
}