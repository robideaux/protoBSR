var execLocationsUrl = "https://script.google.com/macros/s/AKfycbxIw-74yPSw2whrwVLfcZrMz-isu2a0jWArhpvBzShjsRmgPGjB4OqrGnPCFPbA4XKk/exec"
var devLocationUrl = "https://script.google.com/macros/s/AKfycbyzd82_Ynp_xdyQTdjOK3a6Z-HJ1vkVpNTAXsoeHrg/dev"
var locationUrl = ""

var divPrompt = document.getElementById("prompt")
var btnPrompt = document.getElementById("btnPrompt").addEventListener("click", onMagic)

function onMagic() {
  var txtPrompt = document.getElementById("txtPrompt")
  var magicWord = txtPrompt.value
  locationUrl = execLocationUrl + "/" + magicWord 
}
