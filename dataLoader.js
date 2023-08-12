function fetchData(path, callback) {
    fetch(path)
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
