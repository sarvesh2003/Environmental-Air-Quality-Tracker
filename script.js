const splash = document.querySelector('.intro');

document.addEventListener('DOMContentLoaded', (e)=> {
	setTimeout(()=>{
		splash.classList.add('display-none');
	}, 5000);
})

const tip1 = document.querySelector(".tip1")
const tip2 = document.querySelector(".tip2")
const tip3 = document.querySelector(".tip3")

const errorLabel = document.querySelector("label[for='error-msg']")
const latInp = document.querySelector("#latitude") // Latitude input
const lonInp = document.querySelector("#longitude") // Longitude input
const airQuality = document.querySelector(".air-quality") // Get air quality
const airQualityStat = document.querySelector(".air-quality-status") // Get air quality status
const srchBtn = document.querySelector(".search-btn") // Get search button
const componentsEle = document.querySelectorAll(".component-val") // Get all component elements

const appId = "73277aae1b7b208cba5c856d22c0f4e1" // Get your own API Key from https://home.openweathermap.org/api_keys
const link = "https://api.openweathermap.org/data/2.5/air_pollution"	// API end point

// GETTING USER LOCATION AND MAKING VARIABLES READY


const getUserLocation = () => {
	// Get user Location
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onPositionGathered, onPositionGatherError) // working, error
	} else {
		onPositionGatherError({ message: "Can't Access your location. Please enter your co-ordinates" })
	}
}

const onPositionGathered = (pos) => {
	let lat = pos.coords.latitude.toFixed(4), lon = pos.coords.longitude.toFixed(4)

	// Set values of Input for user to know
	latInp.value = lat
	lonInp.value = lon

	// Get Air data from weather API
	getAirQuality(lat, lon)
}

const onPositionGatherError = e => {
	errorLabel.innerText = e.message
}



// 



const getAirQuality = async (lat, lon) => {
	// Get data from api
	const rawData = await fetch(`${link}?lat=${lat}&lon=${lon}&appid=${appId}`).catch(err => {
		onPositionGatherError({ message: "Something went wrong. Check your internet conection." })
		console.log(err)
	})
	console.log(rawData);
	const airData = await rawData.json() // convert rawdata to json
	setValuesOfAir(airData) // for "1--> good"
	setComponentsOfAir(airData) // 
}

const setValuesOfAir = airData => { 
	const aqi = airData.list[0].main.aqi
	let airStat = "", color = ""

	// Set Air Quality Index
	airQuality.innerText = aqi

	// Set status of air quality

	switch (aqi) {
		case 1:
			airStat = "Good"
			color = "rgb(19, 201, 28)"
			tip_1 = "Keep trash covered to avoid attracting pests."
			tip_2 = "Remove shoes at the door."
			tip_3 = "Fix water leaks."
			break
		case 2:
			airStat = "Fair"
			color = "rgb(15, 134, 25)"
			tip_1 = "Remove carpeting if possible."
			tip_2 = "Minimize air freshener use."
			tip_3 = "Dust surfaces and vacuum frequently."
			break
		case 3:
			airStat = "Moderate"
			color = "rgb(201, 204, 13)"
			tip_1 = "Use craft supplies in well-ventilated areas."
			tip_2 = "Use carbon monoxide detectors."
			tip_3 = "Make sure exhaust fans are functioning in your bathrooms and kitchen"
			break
		case 4:
			airStat = "Poor"
			color = "rgb(204, 83, 13)"
			tip_1 = "Avoid smoking indoors (but quitting smoking is the best answer for overall health)."
			tip_2 = "Make sure your gas stove is well-ventilated."
			tip_3 = "Try an Air Purifier"
			break
		case 5:
			airStat = "Very Poor"
			color = "rgb(204, 13, 13)"
			tip_1 = "Move out of that area if possible."
			tip_2 = "Use Air purifiers."
			tip_3 = "Regularly wash your beddings and dust off your surfaces."
			break
		default:
			airStat = "Unknown"
	}

	airQualityStat.innerText = airStat
	airQualityStat.style.color = color
	tip1.innerText = tip_1
	tip2.innerText = tip_2
	tip3.innerText = tip_3


}

const setComponentsOfAir = airData => {
	let components = {...airData.list[0].components} // object disstructuring?
	componentsEle.forEach(ele => {
		const attr = ele.getAttribute('data-comp')
		ele.innerText = components[attr] += " μg/m³"
	})
}


// If user enters another location or uses search bar, then search button is invoked
srchBtn.addEventListener("click", () => {
	getAirQuality(parseFloat(latInp.value).toFixed(4), parseFloat(lonInp.value).toFixed(4)) // string to float of 4 points
})


getUserLocation()