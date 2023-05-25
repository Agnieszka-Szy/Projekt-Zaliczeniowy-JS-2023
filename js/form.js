// pobranie danych ze strony main.html
const urlParams = new URLSearchParams(window.location.search);
const car = urlParams.get('car');
const price = urlParams.get('price');
const imageUrl = urlParams.get('imageUrl');

const carField = document.querySelector('#car');
carField.textContent = car;

const carField2 = document.querySelector('#car2');
carField2.textContent = car;

const priceField = document.querySelector('#price');
priceField.textContent = price;

const totalPriceElement = document.getElementById('total-price');
totalPriceElement.textContent = price;

localStorage.setItem('totalPrice', price);

document.querySelector('#car-image').setAttribute('src', imageUrl);

// kalkulator akcesoriów
let accessories = {};

function addAccessory(id, name, price) {
	if (accessories[id]) {
		accessories[id].quantity += 1;
	} else {
		accessories[id] = {
			name: name,
			price: price,
			quantity: 1,
		};
	}
	updateAccessoryPrice(id);
	updateAccessoryQuantity(id);
	updateAccessoriesPrice();
	updateTotalPrice();
}

function removeAccessory(id) {
	if (accessories[id]) {
		if (accessories[id].quantity > 1) {
			accessories[id].quantity -= 1;
		} else {
			delete accessories[id];
		}
		updateAccessoryPrice(id);
		updateAccessoryQuantity(id);
		updateAccessoriesPrice();
		updateTotalPrice();
	}
}

// sumowanie cen akcesoriów
function updateAccessoryPrice(id) {
	const accessoryPrice = document.getElementById(`accessory-${id}-price`);
	const accessory = accessories[id];
	if (accessory) {
		accessoryPrice.textContent = accessory.price * accessory.quantity + ' PLN';
	} else {
		accessoryPrice.textContent = '0 PLN';
	}
}

// sumowanie cen i ilości
function updateAccessoryQuantity(id) {
	const accessoryQuantity = document.getElementById(`accessory-${id}-quantity`);
	const accessory = accessories[id];
	if (accessory) {
		accessoryQuantity.textContent = accessory.quantity;
	} else {
		accessoryQuantity.textContent = '0';
	}
}

function updateAccessoriesPrice() {
	let totalPrice = 0;
	for (const id in accessories) {
		const accessory = accessories[id];
		totalPrice += accessory.price * accessory.quantity;
	}
	const accessoriesPrice = document.getElementById('accessories-price');
	accessoriesPrice.textContent = totalPrice;
}

// suma total price
function updateTotalPrice() {
	const priceElement = document.getElementById('price');
	const accessoriesPriceElement = document.getElementById('accessories-price');
	const totalPriceElement = document.getElementById('total-price');

	const price = parseInt(priceElement.textContent.replace(/\s/g, ''));
	const accessoriesPrice = parseInt(
		accessoriesPriceElement.textContent.replace(/\s/g, '')
	);

	let totalPrice = price;
	if (accessoriesPrice > 0) {
		totalPrice += accessoriesPrice;
	}

	totalPriceElement.textContent = totalPrice.toLocaleString() + ' PLN';

	localStorage.setItem('totalPrice', totalPrice);
}

// kalendarz na 14 dni
let today = new Date();
let twoWeeks = new Date();
twoWeeks.setDate(today.getDate() + 14);
let todayStr = today.toISOString().slice(0, 10);
let twoWeeksStr = twoWeeks.toISOString().slice(0, 10);
let dateInput = document.getElementById('date');
dateInput.setAttribute('min', todayStr);
dateInput.setAttribute('max', twoWeeksStr);

// formularz danych
const form = document.querySelector('form');
const inputName = document.querySelector('#input-name');
const inputSurname = document.querySelector('#input-surname');
const inputEmail = document.querySelector('#input-email');
const inputPhone = document.querySelector('#input-phone');
const inputAddress = document.querySelector('#input-address');
const inputCity = document.querySelector('#input-city');
const inputZip = document.querySelector('#input-zip');
const inputDeliveryDate = document.querySelector('#date');
let inputFinanceType = document.querySelector('input[name="finance"]:checked');
const clearBtn = document.querySelector('.clear');

// czyszczenie formularza
clearBtn.addEventListener('click', (e) => {
	e.preventDefault();
	[
		inputName,
		inputSurname,
		inputEmail,
		inputPhone,
		inputAddress,
		inputCity,
		inputZip,
		inputDeliveryDate,
		inputFinanceType,
	].forEach((el) => {
		el.value = ' ';
	});
});

// załaduj dane z local storage do pól formularza
const savedData = JSON.parse(localStorage.getItem('form'));
if (savedData) {
	inputName.value = savedData.name;
	inputSurname.value = savedData.surname;
	inputEmail.value = savedData.email;
	inputPhone.value = savedData.phone;
	inputAddress.value = savedData.address;
	inputCity.value = savedData.city;
	inputZip.value = savedData.zip;
	inputDeliveryDate.value = savedData.deliveryDate;

	// wybrany typ finansowania
	const financeType = savedData.financeType;
	inputFinanceType = document.querySelector(
		`input[name="finance"][value="${financeType}"]`
	);
	if (inputFinanceType) {
		inputFinanceType.checked = true;
	}
}

// zapisz dane do local storage po każdej zmianie w formularzu
form.addEventListener('input', () => {
	inputFinanceType = document.querySelector('input[name="finance"]:checked');

	const data = {
		name: inputName.value,
		surname: inputSurname.value,
		email: inputEmail.value,
		phone: inputPhone.value,
		address: inputAddress.value,
		city: inputCity.value,
		zip: inputZip.value,
		deliveryDate: inputDeliveryDate.value,
		financeType: inputFinanceType ? inputFinanceType.value : null,
	};

	localStorage.setItem('form', JSON.stringify(data));
});

// cofnięcie się do strony main.html
function submitFormBack() {
	localStorage.removeItem('form');
	localStorage.removeItem('totalPrice');
	window.location.href = 'main.html';
}

// walidacja formularza
function validateForm() {
	const name = inputName.value.trim();
	const surname = inputSurname.value.trim();
	const email = inputEmail.value.trim();
	const phone = inputPhone.value.trim();
	const address = inputAddress.value.trim();
	const city = inputCity.value.trim();
	const zip = inputZip.value.trim();
	const deliveryDate = inputDeliveryDate.value.trim();

	if (
		name === '' ||
		surname === '' ||
		email === '' ||
		phone === '' ||
		address === '' ||
		city === '' ||
		zip === '' ||
		deliveryDate === ''
	) {
		alert('Wypełnij wszystkie pola formularza');
		return false;
	}
	return true;
}

function submitFormOrder() {
	const car = document.querySelector('#car2').value;
	const inputName = document.querySelector('#input-name').value;
	const inputSurname = document.querySelector('#input-surname').value;
	const inputAddress = document.querySelector('#input-address').value;
	const inputZip = document.querySelector('#input-zip').value;
	const inputCity = document.querySelector('#input-city').value;
	const date = document.querySelector('#date').value;

	if (!validateForm()) {
		return;
	}

	//   popup
	showOrderPanel(
		car,
		inputName,
		inputSurname,
		inputAddress,
		inputZip,
		inputCity,
		date
	);
}

function showOrderPanel(
	car,
	inputName,
	inputSurname,
	inputAddress,
	inputZip,
	inputCity,
	date
) {
	document.querySelector('#car2').value = car;
	document.querySelector('#input-name2').value = inputName;
	document.querySelector('#input-surname2').value = inputSurname;
	document.querySelector('#input-address2').value = inputAddress;
	document.querySelector('#input-zip2').value = inputZip;
	document.querySelector('#input-city2').value = inputCity;
	document.querySelector('#date2').textContent = date;

	// czyszczenie pól w formularzu po pokazaniu się popupa
	document.querySelector('#order-panel').style.display = 'block';
	document.querySelector('#input-name').value = '';
	document.querySelector('#input-surname').value = '';
	document.querySelector('#input-email').value = '';
	document.querySelector('#input-phone').value = '';
	document.querySelector('#input-address').value = '';
	document.querySelector('#input-zip').value = '';
	document.querySelector('#input-city').value = '';
	document.querySelector('#date').value = '';

	// Usunięcie danych z local storage
	localStorage.removeItem('form');
	localStorage.removeItem('totalPrice');
}

//   zamknięcie popupa
function closeOrderPanel() {
	document.querySelector('#order-panel').style.display = 'none';
}
