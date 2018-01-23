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

$(function(){
	var lockColor = false;
	var hovering = false;
	function rewidth(){$("#submitbtn").width($("#submitbtn span").width());}
	$("#submitbtn").mouseenter(function(){hovering = true; if(!lockColor)$(this).addClass("hovered");});
	$("#submitbtn").mouseleave(function(){hovering = false; if(!lockColor)$(this).removeClass("hovered");});
	$("#ss-form").on("submit", function () {
		$("#submitbtn span").html("Sending message...");
		$("#submitbtn").css({"background-color":"red","color":"white"});
		rewidth();
		lockColor=true;
		$("#hiddenFrame").on("load", function(){
			$("#submitbtn span").html("Thanks!");
			$("#submitbtn").css("background-color","green");
			$("#submitbtn").on("click.resubmit", function(e){
				$("#submitbtn span").html("Submit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class=\"material-icons\" style=\"vertical-align: top;display:inline;\">send</i>");
				$("#submitbtn").css("background-color","#fed138");
				rewidth();
				lockColor=false;
				if(hovering) $("#submitbtn").mouseenter();
				$("#ss-form input, #ss-form textarea").val("");
				$("#ss-form input").get(0).focus();
				e.preventDefault();
				$("#submitbtn").off("click.resubmit");
			});
			rewidth();
		});
  });
});
