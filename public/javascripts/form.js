/**
 * @return {boolean}
 */
function ValidateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function getInputs() {
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  if (ValidateEmail(email) && message.length > 0) {
    return {
      name: document.getElementById("name").value,
      email: email,
      message: message,
    };
  } else if (message.length === 0) {
    showMessage("Message field cannot be empty");
    return false;
  } else {
    showMessage("Invalid email");
    return false;
  }
}

function showMessage(text) {
  alert(text);
}

function formatParams( params ){
  return "?" + Object
    .keys(params)
    .map(function(key){
      return key+"="+encodeURIComponent(params[key]);
    })
    .join("&");
}

function rewidth(){$("#submitbtn").width($("#submitbtn span").width());}

function submitSlackForm(){
  var body = getInputs();
  if (!body) return;
  $.ajax({
    type: "POST",
    url: "https://3k6mmv3x0a.execute-api.us-east-2.amazonaws.com/api/sendSlack",
    data: JSON.stringify(body),
    contentType: "application/json",
    success: function () {
      $("#submitbtn span").html("Thanks!");
      $("#submitbtn").css("background-color","green");
      $("#submitbtn").on("click.resubmit", function(e){
        $("#submitbtn span").html("Submit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class=\"material-icons\" style=\"vertical-align: top;display:inline;\">send</i>");
        $("#submitbtn").css("background-color","#fed138");
        rewidth();
        lockColor=false;
        if(hovering) {$("#submitbtn").mouseenter();}
        $("#ss-form input, #ss-form textarea").val("");
        $("#ss-form input").get(0).focus();
        e.preventDefault();
        $("#submitbtn").off("click.resubmit");
      });
      rewidth();
    }, error: function (err) {
      showMessage(err.message);
    }
  });
}

$(function(){
  var lockColor = false;
  var hovering = false;
  $("#submitbtn").mouseenter(function(){hovering = true; if(!lockColor){$(this).addClass("hovered");}});
  $("#submitbtn").mouseleave(function(){hovering = false; if(!lockColor){$(this).removeClass("hovered");}});
  $("#ss-form").on("submit", function (e) {
    e.preventDefault()
    $("#submitbtn span").html("Sending message...");
    $("#submitbtn").css({"background-color":"red","color":"white"});
    rewidth();
    lockColor=true;
    submitSlackForm();
  });
});
