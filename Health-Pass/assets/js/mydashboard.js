//checking if user is initialized and loading data
function InitCheck(){
  isInitialized(function(x){
    if(x){
      initializeUser();
      activateFeelSick();
      activateUserSearch();
      activateIsSick();
    } else {
      window.location.href = "./dashboard.html";
    }
  })
}

function activateFeelSick(){
  $("#submitFeel").click(function(x){
    feelSickStat = $("#healthy").val() == 2 ? true : false;
    setFeelsSick(feelSickStat);
    x.preventDefault();
    return false;
  });
}

function activateIsSick(){
  $("#submitSick").click(function(x){
    isSickStat = $("#category").val() == 2 ? true : false;
    var patientAddress = $('#patientName').val()
    console.log(patientAddress);
    setIsSick(isSickStat, patientAddress);
    x.preventDefault();
    return false;
  });
}

function activateUserSearch(){
  $('#patientName').on('keypress', function (e) {
         if(e.which === 13){

            //Disable textbox to prevent multiple submit
            $(this).attr("disabled", "disabled");
            var patientAddress = $('#patientName').val()
            //Do Stuff, submit, etc..
            getFeelsSickPatient(patientAddress, function(x){
              console.log(x);
              var feelingPat = x ? "Sick" : "Healthy";
              $("#feeling").text("Patient's feeling: " + feelingPat);
            });
            //Enable the textbox again if needed.
            $(this).removeAttr("disabled");
         }
   });
}

function activateDiagnosis(){
  $("#submitFeel").click(function(x){
    feelSickStat = $("#healthy").val() == 2 ? true : false;
    setFeelsSick(feelSickStat);
    x.preventDefault();
    return false;
  });
}

//loading the initialization function on page load
$(document).ready(function() {
initETH().then(InitCheck);
});
