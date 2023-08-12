var myUrl = "https://script.google.com/macros/s/AKfycbxIw-74yPSw2whrwVLfcZrMz-isu2a0jWArhpvBzShjsRmgPGjB4OqrGnPCFPbA4XKk/exec"

function fetchData(path, callback) {
    fetch(myUrl)
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
