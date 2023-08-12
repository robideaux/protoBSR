// const execLocationUrl = "https://script.google.com/macros/s/AKfycbxIw-74yPSw2whrwVLfcZrMz-isu2a0jWArhpvBzShjsRmgPGjB4OqrGnPCFPbA4XKk/exec"
// const devLocationUrl = "https://script.google.com/macros/s/AKfycbyzd82_Ynp_xdyQTdjOK3a6Z-HJ1vkVpNTAXsoeHrg/dev"
const refreshInterval = 60
var magicWord
var secondsUntilRefresh = refreshInterval
var isFetching = false
var runnerDictionary = {}
// var locationUrl = ""

var divPrompt = document.getElementById("prompt")
var divContent = document.getElementById("content")
var btnPrompt = document.getElementById("btnPrompt").addEventListener("click", onMagic)

function onMagic() {
    var txtPrompt = document.getElementById("txtPrompt")
    magicWord = txtPrompt.value
    // locationUrl = execLocationUrl + "/" + magicWord
    onFetch()
}

function onData(data) {
	secondsUntilRefresh = refreshInterval
    if (data.result != null) {
		isFetching = false
        divPrompt.hidden = false
        divContent.hidden = true
        return
    }
    
    divPrompt.hidden = true
    divContent.hidden = false
	try {
		updateStats(data)
		populateTable(runnerDictionary)
		populateMap(runnerDictionary)
	}
	catch (err) {
		console.error(err)
	}
	finally{
		isFetching = false
	}
}

function updateStats(data) {
    if (data) {
        var runners = Object.keys(data)
		if (runners.length > 0) {
			runners.forEach(function(runner) {
				var stats = data[runner]
				var cache = runnerDictionary[runner]
				if (cache == null)
				{
					cache = stats
					cache.updateTime = Date.now()
					runnerDictionary[runner] = cache
				}
				else if (cache.capturedTime != stats.capturedTime) {
					cache = stats
					cache.updateTime = Date.now()
					runnerDictionary[runner] = cache
				}
		  })
		}
	}

	if (runnerDictionary) {
        var runners = Object.keys(runnerDictionary)
		runners.forEach(function(runner) {
			var cache = runnerDictionary[runner]
			cache.age = (Date.now() - cache.updateTime) / 1000.0
		})
	}
}

function onFetch() {
	if (isFetching == false) {
        isFetching = true
        fetchData(magicWord, onData)
	}
}

// Refresh countdown display
var interval = setInterval(function() {
	if (secondsUntilRefresh <= 0){
		onFetch()
		return
	}
	var percent = (secondsUntilRefresh / refreshInterval) * 100.0;
	var barHeight = 5;
	var roundedSec = Math.round(secondsUntilRefresh);
	var message = "Map refreshes in " + roundedSec + " seconds.";
	if (roundedSec == 1){
        var message = "Map refreshes in " + roundedSec + " second.";
	}
	document.getElementById("divRefreshNote").innerHTML =
"<p><small style=\"padding:10px;\">" + message + "</small></p><div style=\"height:" + barHeight + "px; border-radius:10px; background-color:lightgreen; width:" + percent + "%;\"></div>";
	secondsUntilRefresh = secondsUntilRefresh - 0.1;
}, 100);
  
document.getElementById("btnRefresh").addEventListener("click", onFetch);
