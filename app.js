const loadsArray = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200, 225, 250, 275, 300, 400, 500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 4000, 5000
];

const demandsArray = [
	3.0, 5.0, 6.5, 8.0, 9.4, 10.7, 11.8, 12.8, 13.7, 14.6, 15.4, 16.0, 16.5, 17.0, 17.5, 18.0, 18.4, 18.8, 19.2, 19.6, 21.5, 23.3, 24.9, 26.3, 27.7, 29.1, 32.0, 35.0, 38.0, 41.0, 43.5, 48.0, 52.5, 57.0, 61.0, 65.0, 70.0, 75.0, 80.0, 85.0, 105.0, 124.0, 170.0, 208.0, 239.0, 269.0, 297.0, 325.0, 380.0, 433.0, 535.0, 593.0
];



document.getElementById("form").addEventListener("submit", function(event) { 
	event.preventDefault();
	document.getElementById("error").innerHTML = "";
	var input = document.getElementById("load-input").value;
	var inputArray = input.split(" ");
	var floors = document.getElementById("floor-input").value;
	if(inputArray.length > floors.length) {
		document.getElementById("error").innerHTML = "Your amount of inputs is greater than your top floor. Please check.";
	} else {
		document.getElementById("error").innerHTML = "";
		showInput();
	}
}); 

document.getElementById("submit").addEventListener("click", function(event) {
	event.preventDefault();
	document.getElementById("error").innerHTML = "";
	if(document.getElementById("input__list").innerHTML != null) {
		document.getElementById("input__list").innerHTML = "0";
	}
	var input = document.getElementById("load-input").value;
	var inputArray = input.split(" ");
	var floors = document.getElementById("floor-input").value;
	if(inputArray.length > floors) {
		document.getElementById("error").innerHTML = "Your amount of inputs is greater than your top floor. Please check.";
		console.log("error");
		console.log("IA length: " + input.length);
	} else {
		document.getElementById("error").innerHTML = "";
		showInput();
	}
});

function showInput() {
	console.log("NEW CALCULATIONS");
	var input = document.getElementById("load-input").value;
	var floors = document.getElementById("floor-input").value;
	var inputArray = input.split(" ");
	var floorArray = [];
	var floorDisplay = [];
	for(var i = floors; i > 0; i--) {
		floorArray.push(i);
	}
	for(var j = inputArray.length; j > 0; j--) {
		floorDisplay.unshift(floorArray[j - 1]);
	}
	console.log("IA length: " + inputArray.length);
	console.log("FD: " + floorDisplay);
	var displayArray = createDisplay(floorDisplay, inputArray);
	// document.getElementById("display").innerHTML = displayArray;
	showDisplay(displayArray);
	var loadTotal = calcTotal(input, floors);
	var range = getDemandsIndex(loadTotal);
	var gpms = calcGPMS(range, loadTotal);
	var size = calcSize(gpms);
	document.getElementById("size").innerHTML = size;
}

function createDisplay(floors, input) {
	var display = [];
	for(var i = 0; i < input.length; i++) {
		display.push(floors[i] + ": " + input[i]);
	}
	return display;
}

function showDisplay(arr) {
	var list = document.getElementById("input__list");
	list.innerHTML = "";
	var style = 'style="display: inline-block; font-size: 24px; margin-right: 20px;"'
	for(var i = 0; i < arr.length; i++) {
		list.insertAdjacentHTML("beforeend", '<li ' + style + '><p>' + arr[i] + "</p></li>");
	}
}

function calcTotal(input, floors) {
	var inputArr = input.split(" ");
	var total = 0;
	for(var i = 0; i < inputArr.length; i++) {
		total += (parseFloat(inputArr[i]));
	}
	total = (total).toFixed(2);
	document.getElementById("total").innerHTML = total;

	return total;
}

function getDemandsIndex(loadTotal) {
	for(var j = 0; j < demandsArray.length; j++) {
		if(loadTotal > loadsArray[j] && loadTotal < loadsArray[j+1]) {
			console.log(j + " " + (j+1));
			return j + " " + (j+1);
		} else if(loadTotal == loadsArray[j]) {
			console.log("on the money " + j);
			return j;
		}
	}
}

function calcGPMS(range, loadTotal) {
	var lower;
	var upper;
	if(typeof(range) == "string") {
		console.log("string");
		var rangeArr = range.split(" ");
		lower = parseInt(rangeArr[0]);
		upper = parseInt(rangeArr[1]);
	} else if(typeof(range) == "number") {
		console.log("number");
		var upper = parseInt(range);
		var lower = 0;
	}
	var demandDifference = (demandsArray[upper] - demandsArray[lower]).toFixed(1);
	console.log("demandDiff: " +  demandsArray[upper] + " " + demandsArray[lower] + " " + demandDifference);
	var loadsDifference = (loadsArray[upper] - loadsArray[lower]).toFixed(1);
	console.log("loadDiff: " +  loadsArray[upper] + " " + loadsArray[lower] + " " + loadsDifference);
	var demPerLoad = demandDifference / loadsDifference;
	console.log(demPerLoad);
	var totalLowerDiff = (loadTotal - loadsArray[lower]).toFixed(2);
	console.log("totalLowerDiff: " + totalLowerDiff);
	var totalGPMS = (demPerLoad * totalLowerDiff) + demandsArray[lower];
	console.log(totalGPMS);
	document.getElementById("gpm").innerHTML = Math.ceil(totalGPMS);
	return Math.ceil(totalGPMS);
}

function calcSize(gpms) {
	if(gpms <= 12) {
		return "3/4\"";
	} else if(gpms < 22) {
		return "1\"";
	} else if(gpms < 33) {
		return "1 1/4\"";
	} else if(gpms < 70) {
		return "1 1/2\"";
	} else if(gpms < 105) {
		return "2";
	} else if(gpms < 150) {
		return "2 1/2\"";
	} else if(gpms < 300) {
		return "3\"";
	} else if(gpms >= 300) {
		return "4\"";
	}

}