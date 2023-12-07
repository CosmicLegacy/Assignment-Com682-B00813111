//The URIs of the REST endpoint
IUPS ="https://prod-95.eastus.logic.azure.com:443/workflows/9d7fe45091554818adc5c053f38e4a0a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sL8aEiSqnffXCgpVk3TS7Qly_XYnp6mHJrtM1tbRI2I"
RAI ="https://prod-60.eastus.logic.azure.com:443/workflows/3176395685014449936d038cac3a52fa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AlCulFMSpU-u_3uGJ9JfQy0q5I-oPtFxAcN5Zkw5ibQ"
DIA ="https://prod-55.eastus.logic.azure.com:443/workflows/4707fa69f23249258ca5d9eb06cc5ccc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fG1H7NIYGGAv7pX8UYNj8R3Dq1e253mIuRRwNd5L1WE"
BLOB_ACCOUNT = 'https://b00813111assignmentblob.blob.core.windows.net'

//Handlers for button clicks
$(document).ready(function () {
    //Handler for the new asset submission button
    $("#ViewMedia").click(function () {
      //Execute the submit new asset function
      console.log("View Media Button Clicked")
      ViewMedia()
    })
    $("#HomeButton").click(function () {
        //Execute the submit new asset function
        console.log("Home Button Clicked")
        window.location.href = "Index.html"
      })
  })
  function ViewMedia() {  
    $.getJSON(RAI, function (data) {
      // Create an array to hold all the retrieved assets
      var items = [];
  
      // Iterate through the returned records and build HTML, incorporating the key values of the record in the data
      $.each(data, function (key, val) {
        items.push("<hr />");
  
        // Check if the URL indicates a video file (replace '.mp4' with the actual video file extension)
        if (atob(val["fileName"].$content).toLowerCase().endsWith(".mp4")) {
          items.push("<video width='400' controls>");
          items.push(
            "<source src='" +
              BLOB_ACCOUNT +
              val["filePath"] +
              "' type='video/mp4'>"
          );
          items.push("Your browser does not support the video tag.");
          items.push("</video> <br />");
        } else {
          items.push(
            "<img src='" +
              BLOB_ACCOUNT +
              val["filePath"] +
              "' width='400'/> <br />"
          );
  
        }
  
        items.push("File: " + atob(val["fileName"].$content) + "<br />");
        items.push(
          "Uploaded by: " +
            atob(val["userName"].$content) +
            " (user id: " +
            atob(val["userID"].$content) +
            ")<br />"
        );
        // Add a button for each image
        items.push(
          "<button class='custom-btn custom-btn-red delete-button' onclick='handleDeleteClick(\"" +
            val["filePath"] +
            "\", \"" +
            val["userName"].$content +
            "\", \"" +
            val["userID"].$content +
            "\")'>Delete Media</button>"
        );
        items.push("<hr />");
      });
  
      // Clear the assetlist div
      $("#MediaList").empty();
  
      // Append the contents of the items array to the ImageList Div
      $("<ul/>", {
        class: "my-new-list",
        html: items.join(""),
      }).appendTo("#MediaList");
    });
  }
  // Function to handle button click for delete
  function handleDeleteClick(filePath, userName, userID) {
    // Log the details to the console
    console.log("File Path: " + filePath);
    console.log("User Name: " + atob(userName));
    console.log("User ID: " + atob(userID));
  
    var filePathAsString = String(filePath);
    // Construct the request payload as JSON
    var requestData = {
      filePath: filePathAsString,
      userName: atob(userName),
      userID: atob(userID)
    };
  
 
    $.ajax({
      type: "POST", // Change the method to POST
      url: DIA,
      contentType: "application/json",
      data: JSON.stringify(requestData),
      success: function (response) {
        console.log("Logic App triggered successfully");
          // Display a status message to the user
          $("#statusMessage").text("File deleted successfully!");
      },
      error: function (error) {
          console.error("Error adding file: " + JSON.stringify(error));

          // Display an error message to the user
          $("#statusMessage").text("Error deleting file. Please try again.");
      },
  });
  }
  


 
  
  