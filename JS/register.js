$(document).ready(function () {
    $("#Register").click(function () 
    {
        // retrieving values from the form
        var username = $("#UserName").val();
        var password = $("#Password").val();

       

        
        $.ajax({
            type: "POST",
            url: "https://prod-83.eastus.logic.azure.com:443/workflows/5a7de4cecdc74ec5a1fca83067a0a4ea/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8Bc4x5s5SOv8t8WjHCQcVCnWiA-LeVsQlzkO304afv0",
            contentType: "application/json",
            data: JSON.stringify({ "Username": username, "Password": password }),
            success: function (data, textStatus, xhr) {
                console.log(xhr.status); // Logging the HTTP status code for debugging

                // Checking the HTTP status code
                if (xhr.status === 200) {
                    $("#statusMessage").text("Registration Successful").css("color", "green");
                    window.location.href = "Login.html";
                } else {
                    $("#statusMessage").text("Registration Failed").css("color", "red");
                }
            },
            error: function (error) {
                console.error("Error:", error);
                $("#statusMessage").text("Error during registration").css("color", "red");
            }
        });
    });
    $("#Back").click(function () 
    {

        window.location.href = "Login.html";

    })

});
