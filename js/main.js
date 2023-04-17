// wyszukiwarka
const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-button')
const cars = document.querySelectorAll('.cars-wrap .col-md-6')
const noResults = document.querySelector('#no-results')

function searchCars() {
	const searchTerm = searchInput.value.toLowerCase()
	let visibleCars = 0

	if (searchTerm === '') {
		cars.forEach(car => {
			car.style.display = 'block'
			visibleCars++
		})
	} else {
		cars.forEach(car => {
			const carName = car.querySelector('li').textContent.toLowerCase()

			if (carName.includes(searchTerm)) {
				car.style.display = 'block'
				visibleCars++
			} else {
				car.style.display = 'none'
			}
		})
	}
	if (visibleCars === 0) {
		noResults.style.display = 'block'
	} else {
		noResults.style.display = 'none'
	}
}
searchInput.addEventListener('input', searchCars)
searchButton.addEventListener('click', searchCars)
searchInput.addEventListener('keydown', event => {
	if (event.key === 'Enter') {
		event.preventDefault()
		searchCars()
	}
})

// ściąganie danych 
function submitForm(car, price, imageUrl) {
    window.location.href =
        'form.html?car=' +
        encodeURIComponent(car) +
        '&price=' +
        encodeURIComponent(price) +
        '&imageUrl=' +
        encodeURIComponent(imageUrl);
}

const buttons = document.querySelectorAll('.cars-wrap button');

buttons.forEach(button => {
    const car = button.parentNode.querySelector('li').textContent.trim();
    const price = button.parentNode.querySelector('.price-tag').textContent.trim();
    const imageUrl = button.parentNode.querySelector('img').getAttribute('src');
    button.setAttribute('onclick', `submitForm('${car}', '${price}', '${imageUrl}')`);
});

