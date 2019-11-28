window.addEventListener("load", () =>{
	
		

	
	/*const searchElement=document.querySelector('.searchPlace');
	const searchBox = new google.maps.places.SearchBox(searchElement);
	searchBox.addListener('places_changed', () => {

	
			

	});
	*/
	let lat;
	let long;
	let windspeedValue = document.querySelector('[data-wind-speed]');
	let temperatureValue = document.querySelector('[data-temperature]');
	let humidityValue = document.querySelector('[data-humidity]');
	let descriptionValue = document.querySelector('.current-weather-condition');
	let location = document.querySelector('#place');
	let convertTemperature = document.querySelector('.change-btn');
	let temperatureUnit = document.querySelector('.details span');


	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {

		long = position.coords.longitude;
		lat = position.coords.latitude;

	const proxy = "https://cors-anywhere.herokuapp.com/";
	const api =`${proxy}https://api.darksky.net/forecast/df4cb10663cf97a076b545b6781f17a4/${lat},${long}`;

		

		// const place = searchBox.getPlaces()[0];
		// if (place == null) return;
		// let lat = place.geometry.location.lat();
		// let lng = place.geometry.location.lng();

	console.log(lat)

		fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data =>{
				console.log(data);
				const {temperature, humidity, windSpeed, summary, icon} = data.currently;
				windspeedValue.textContent = windSpeed;
				temperatureValue.textContent = temperature;
				humidityValue.textContent = humidity;
				descriptionValue.textContent = summary;
				location.textContent = data.timezone;

				//calculating Celcius
				let celcius = (temperature - 32) * (5 / 9);
				let fareinheit = temperature;
				//Setting the Icon
				setIcon(icon, document.querySelector('#icon'));

				// Temperature Conversion
				convertTemperature.addEventListener("click", () =>{
					if (temperatureUnit.textContent === "F"){
						temperatureUnit.textContent = "C";
						temperatureValue.innerHtml = Math.floor(celcius) + "&deg;";
					}else{
						temperatureUnit.textContent = "F";
						temperatureUnit.innerHtml = temperature + "&deg;";
					}
				})
			})
		})

	

}
function setIcon(icon, iconID){
	const skycons = new Skycons({color:"white"});
	const currentIcon = icon.replace(/-/g, "_").toUpperCase();
	skycons.play();
	return skycons.set(iconID, Skycons[currentIcon])
}
})