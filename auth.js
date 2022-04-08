

function sha512(str) {
  return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
  return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
});
}

$(document).ready(function()
{

console.log("Document is ready Now");

$("#formsign").submit(function(){

    var email = $('#email').val();
    var name = $('#name').val();
    var password = $('#password').val();

    sha512(password).then((hashedPassword) =>
    {
        var user = {
            email: email,
            name: name,
            password: hashedPassword,
    };
    var json = JSON.stringify(user);
    localStorage.setItem(email, json);
    window.location.replace("Login.html");
    });
    
    
    


});

$("#formlogin").submit(function(){

    var email = $('#email').val();
    var password = $('#password').val();
    var user = localStorage.getItem(email);
    var data = JSON.parse(user);
    
    sha512(password).then((hashedPassword) => {
    if (user == null) {
            alert('wrong email');
        } else if (email == data.email && hashedPassword == data.password) {
            alert('Logged in');
        } else {
            alert('wrong password');
        }


    });




});




});


function myFunction() {
  var x = document.getElementById("password");
  var y = document.getElementById("hide-1");
  var z = document.getElementById("hide-2");

  if (x.type === "password") {
    x.type = "text";
    y.style.display = "block";
    z.style.display = "none";
  } else {
    x.type = "password";
    y.style.display = "none";
    z.style.display = "block";
  }
}
