window.addEventListener('load', () => {
	/**
	 * TODO : Create your 5 variables to get elements
	 * based on the classes you created in the `index.html`.
	 *
	 * Define your variables below this comment.
	 */
	const location = document.getElementsByClassName('location')
	const degree = document.getElementsByClassName('degree')
	console.log(degree)
	const icon = document.getElementsByClassName('icon')
	const description = document.getElementsByClassName('description')
	const units = document.getElementsByClassName('units')
	const secret = 'c5ead6f62ca7e3a053d111bd7b314851'

const updateDOM = (data) =>{
	console.log(data)
	let str = data.timezone
	str = str.replace('/[^a-zA-Z0-9]/gm'," ")
	location[0].innerHTML = `<h1>Current Location: ${str}</h1>`
	description[0].innerHTML = `<h2>${data.minutely.summary}</h2>`
	degree[0].innerHTML = `Temperature: ${data.currently.temperature.toFixed(0)}`
	toggleTemp(data.currently.temperature)
	setIcons(icon[0], data.currently.icon)
}

const toggleTemp = (temperature) =>{
	let toggle = true
	let celsius = (temperature - 32) * (5 / 9)
	units[0].addEventListener('click',()=>{
		if(toggle){
			toggle = false
			units[0].innerHTML = "C*"
			degree[0].innerHTML = `Temperature: ${celsius.toFixed(0)}`
		}else{
			toggle = true
			units[0].innerHTML = "F*"
			degree[0].innerHTML = `Temperature: ${temperature.toFixed(0)}`
		}


	})
}

const makeRequest = (key,lat,long) => {
	const proxy= "https://cors-anywhere.herokuapp.com/";
	return fetch( proxy + `https://api.darksky.net/forecast/${key}/${lat},${long}`)
		.then(response => {
			console.log('This is the response object:', response);
			return response.json();
		})
		.then(data => {
			return updateDOM(data)
		})
		.catch(error => console.log(`There is an error: ${error}`));
};


	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			console.log('My General Position:', position);
			const long = position.coords.longitude;
			const lat = position.coords.latitude;
			console.log(long)
			console.log(lat)

			/* TODO: Continue your fetch request to set the DOM Elements for
			 * temperature, description/summary, and timezone.
			 * Make sure to include error handling.
			 */
			 makeRequest(secret,lat,long)
			/*TODO: Set the weather icon */

			/**TODO: Add an event listener that toggles between Fahrenheit and Celcius
			 * when a user clicks on the current temperature section.
			 */
		});
	}

	/**
	 * TODO: Code out the remainder of `setIcons`function.
	 */
	const setIcons = (icon, iconID) => {
	  const skycons = new Skycons({ color: "white" });
	  skycons.set(icon, iconID);
	  skycons.play();
	};
});
