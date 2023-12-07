
IUPS ="https://prod-95.eastus.logic.azure.com:443/workflows/9d7fe45091554818adc5c053f38e4a0a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sL8aEiSqnffXCgpVk3TS7Qly_XYnp6mHJrtM1tbRI2I"
RAI ="https://prod-60.eastus.logic.azure.com:443/workflows/3176395685014449936d038cac3a52fa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AlCulFMSpU-u_3uGJ9JfQy0q5I-oPtFxAcN5Zkw5ibQ"
BLOB_ACCOUNT = 'https://b00813111assignmentblob.blob.core.windows.net'



$(document).ready(function () {
 
  $("#SubmitMedia").click(function () {
    
    console.log("Submit Media Button Clicked")
    SubmitNewMedia()
  })
  $("#HomeButton").click(function () {
      
      console.log("Home Button Clicked")
      window.location.href = "Index.html"
  })
})

//Submit media function
function SubmitNewMedia() {
  // Clear any previous messages
  $("#statusMessage").text("");

  submitData = new FormData();

  submitData.append("FileName", $("#FileName").val());
  submitData.append("UserID", $("#UserID").val());
  submitData.append("UserName", $("#UserName").val());
  submitData.append("File", $("#UploadFile")[0].files[0]);

 
  $.ajax({
      url: IUPS,
      data: submitData,
      cache: false,
      enctype: "multipart/form-data",
      contentType: false,
      processData: false,
      type: "POST",
      success: function (data) {
          console.log(data);

          // Display a status message to the user
          $("#statusMessage").text("File added successfully!");
      },
      error: function (error) {
          console.error("Error adding file: " + JSON.stringify(error));

          // Display an error message to the user
          $("#statusMessage").text("Error adding file. Please try again.");
      },
  });
}
