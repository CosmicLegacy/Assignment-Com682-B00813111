UPT = "https://prod-42.eastus.logic.azure.com:443/workflows/04399aef60f3480b8461805cf481131d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Jct76s_RLhpkG7Z_sHciR7p-N4YhtyCfPE3U6H8bq04"
function getUrlParameter(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


$(document).ready(function () {
    // Obtaining Variables
    var filePath = getUrlParameter("filePath");
    var userName = getUrlParameter("userName");
    var userID = getUrlParameter("userID");
    var fileName = getUrlParameter("fileName");

    // Checking to ensure files have sucessfully been brought over
    console.log("FilePath Passed: " + filePath);
    console.log("UserName Passed: " + userName);
    console.log("UserID Passed: " + userID);
    console.log("FileName Passed: " + fileName);

    // Set values in the form
    $("#FileName").val(fileName || '');
    $("#UserID").val(userID || '');
    $("#UserName").val(userName || '');

    // Click handler for the Update Media button
    $("#UpdateMedia").click(function () {
        UpdateMedia(filePath,userName,userID,fileName);
    });

    $("#HomeButton").click(function () {
        console.log("Home Button Clicked");
        window.location.href = "Index.html";
    });
});

// Function to update media
function UpdateMedia(filePath,userName,userID,fileName) 
{

    var filePathAsString = String(filePath);
    // Construct the request payload as JSON
    var requestData = {
      filePath: filePath,
      userName: userName,
      userID: userID,
      fileName: fileName
    };
  
    $.ajax({
      type: "POST", 
      url: UPT,
      contentType: "application/json",
      data: JSON.stringify(requestData), // Send the request payload as JSON in the request body
      success: function (response) {
        console.log("Logic App triggered successfully");
          $("#statusMessage").text("File updates successfully!");
      },
      error: function (error) {
          console.error("Error updating file: " + JSON.stringify(error));

          $("#statusMessage").text("Error updating file. Please try again.");
      },
  });
  }

