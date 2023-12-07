$(document).ready(function () {
    $("#Login").click(function () {
        console.log("Button Clicked")
        var username = $("#UserName").val();
        var password = $("#Password").val();

       
        $.ajax({
            type: "POST",
            url: "https://prod-43.eastus.logic.azure.com:443/workflows/c3fda4d2775447fa92bf2a6b4efaceea/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vrORl7m8oGWACnsWvOf-6nIQrHLrltGip9RM_sGW_AM",
            contentType: "application/json",
            data: JSON.stringify({ "Username": username, "Password": password }),
            success: function (response) {
                console.log(response); // Log the response for debugging

                // Check if "ResultSets" and "Table1" exist
                if (response.ResultSets && response.ResultSets.Table1 && response.ResultSets.Table1.length > 0) {
                    var resultValue = response.ResultSets.Table1[0].Result;

                    if (resultValue === "Username Exists") {
                        $("#statusMessage").text("Login Successful").css("color", "green");
                        window.location.href = "Index.html"
                    } else {
                        $("#statusMessage").text("Login Failed").css("color", "red");
                    }
                } else {
                    $("#statusMessage").text("Invalid response structure").css("color", "red");
                }
            },
            error: function (error) {
                console.error("Error:", error);
                $("#statusMessage").text("Error during login").css("color", "red");
            }
        });
    });

    //Button click event for Register
    $("#Register").click(function () {
        window.location.href = "Register.html"
    });
});
