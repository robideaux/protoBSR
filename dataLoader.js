var locationsUrl = "https://script.google.com/macros/s/AKfycbxIw-74yPSw2whrwVLfcZrMz-isu2a0jWArhpvBzShjsRmgPGjB4OqrGnPCFPbA4XKk/exec"

async function fetchDataAsync(magic, callback) {
    var path = locationsUrl + "?magic=" + magic
    var response = await fetch(path)

    if (!response.ok) {
        console.log("Error: " + err)
        callback(null)
    }

    var data = await response.json()
    console.log(data)
    callback(data)
}
