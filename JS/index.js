//The URLs of the REST endpoints
IUPS ='https://prod-47.eastus.log https://prod-95.eastus.logic.azure.com:443/workflows/9d7fe45091554818adc5c053f38e4a0a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sL8aEiSqnffXCgpVk3TS7Qly_XYnp6mHJrtM1tbRI2Iic.azure.com:443/workflows/5edcec59b6f24afe8822ece56551d52d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2iIogOlmIJhj5y-3IloFnx41fEnbjyzaMNGwTnl5Hls'
RAI ='https://prod-60.eastus.logic.azure.com:443/workflows/3176395685014449936d038cac3a52fa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AlCulFMSpU-u_3uGJ9JfQy0q5I-oPtFxAcN5Zkw5ibQ'
BLOB_ACCOUNT = "https://b00813111assignmentblob.blob.core.windows.net"


$(document).ready(function () 
{
    //Button for going to Add media page
    $("#Add_Media").click(function () 
    {
    
        window.location.href = "Add_Media.html"
    
    })
    //Button for going to update media page
    $("#Update_Media").click(function () 
    {
    
        window.location.href = "View_Media.html"
    
    })
    //Button for going to delete media page
    $("#Delete_Media").click(function () 
    {
    
        window.location.href = "Delete_Media.html"
    
    })
})
