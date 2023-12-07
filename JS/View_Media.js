//The URLs of the REST endpoint
IUPS ="https://prod-95.eastus.logic.azure.com:443/workflows/9d7fe45091554818adc5c053f38e4a0a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sL8aEiSqnffXCgpVk3TS7Qly_XYnp6mHJrtM1tbRI2I"
RAI ="https://prod-60.eastus.logic.azure.com:443/workflows/3176395685014449936d038cac3a52fa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AlCulFMSpU-u_3uGJ9JfQy0q5I-oPtFxAcN5Zkw5ibQ"
DIA ="https://prod-55.eastus.logic.azure.com:443/workflows/4707fa69f23249258ca5d9eb06cc5ccc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fG1H7NIYGGAv7pX8UYNj8R3Dq1e253mIuRRwNd5L1WE"
BLOB_ACCOUNT = 'https://b00813111assignmentblob.blob.core.windows.net'

$(document).ready(function () {
    $("#ViewMedia").click(function () {
      console.log("View Media Button Clicked")
      ViewMedia()
    })
    $("#HomeButton").click(function () {
        console.log("Home Button Clicked")
        window.location.href = "Index.html"
      })
  })
  function ViewMedia() {  
    $.getJSON(RAI, function (data) {
        var items = [];

        $.each(data, function (key, val) {
            items.push("<hr />");
  
        // Check if the URL contains a video file
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
        var decodedUserName = atob(val["userName"].$content);
        var decodedUserID = atob(val["userID"].$content);
        var decodedFileName = atob(val["fileName"].$content);
        items.push("File: " + atob(val["fileName"].$content) + "<br />");
        items.push("Uploaded by: " + decodedUserName + " (user id: " + decodedUserID + ")<br />");

        items.push("<button class='custom-btn custom-btn-blue update-button' onclick='handleupdateClick(\"" + val["filePath"] + "\", \"" + decodedUserName + "\", \"" + decodedUserID + "\", \"" + decodedFileName + "\")'>Update Media</button>");
        items.push("<hr />");
    });
  
      $("#MediaList").empty();
  
      $("<ul/>", {
        class: "my-new-list",
        html: items.join(""),
      }).appendTo("#MediaList");
    });
  }
  function handleupdateClick(filePath, userName, userID, fileName) {
    var url = "Update.html" +
        "?filePath=" + encodeURIComponent(filePath) +
        "&userName=" + encodeURIComponent(userName) +
        "&userID=" + encodeURIComponent(userID) +
        "&fileName=" + encodeURIComponent(fileName);

    // Redirect to update page
    window.location.href = url;
}


  


 
  
  