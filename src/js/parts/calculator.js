'use strict';

function calculator() {
	const persons = document.querySelectorAll('.counter-block-input')[0],
		restDays = document.querySelectorAll('.counter-block-input')[1],
		place = document.getElementById('select'),
		totalValue = document.getElementById('total');

	let personsSum = 0,
		daysSum = 0,
		total = 0;

	totalValue.innerHTML = 0;

	persons.addEventListener('input', function () {
		personsSum = +this.value;
		total = (daysSum * personsSum) * 1000;

		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let t = total;
			totalValue.innerHTML = t * place.options[place.selectedIndex].value;
		}
	});

	restDays.addEventListener('input', function () {
		daysSum = +this.value;
		total = (daysSum * personsSum) * 1000;

		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let t = total;
			totalValue.innerHTML = t * place.options[place.selectedIndex].value;
		}
	});

	place.addEventListener('change', function () {
		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let t = total;
			totalValue.innerHTML = t * this.options[this.selectedIndex].value;
		}
	});
}

module.exports = calculator;