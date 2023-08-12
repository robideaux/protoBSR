// https://script.google.com/macros/s/AKfycbxIw-74yPSw2whrwVLfcZrMz-isu2a0jWArhpvBzShjsRmgPGjB4OqrGnPCFPbA4XKk/exec
// https://script.google.com/macros/s/AKfycbyzd82_Ynp_xdyQTdjOK3a6Z-HJ1vkVpNTAXsoeHrg/dev
var locationsUrl = "https://script.google.com/macros/s/AKfycbxIw-74yPSw2whrwVLfcZrMz-isu2a0jWArhpvBzShjsRmgPGjB4OqrGnPCFPbA4XKk/exec"

function fetchData(callback) {
    fetch(locationsUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            callback(data)
        })
        .catch(err => {
            console.log("Error: " + err)
            callback(null)
        })
}
