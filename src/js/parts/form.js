'use strict';

function sendForm(form) {

	let message = {
		loading: 'Идёт загрузка...',
		success: 'Спасибо! Мы скоро свяжемся с вами...',
		failure: 'Произошла ошибка...'
	};

	const input = document.querySelectorAll('input');

	let statusMessage = document.createElement('div');
	statusMessage.classList.add('status');

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		this.appendChild(statusMessage);

		let formData = new FormData(this);

		function postData() {
			return new Promise(function (resolve, reject) {
				let request = new XMLHttpRequest();
				request.open('POST', 'server.php');
				request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

				request.onreadystatechange = function () {
					if (request.readyState < 4) {
						resolve();
					} else if (request.readyState === 4) {
						if (request.status == 200 && request.status < 300) {
							resolve();
						} else {
							reject();
						}
					}
				};

				let obj = {};
				formData.forEach(function (value, key) {
					obj[key] = value;
				});
				let json = JSON.stringify(obj);
				request.send(json);

			});
		}

		function clearInput() {
			for (let i = 0; i < input.length; i++) {
				input[i].value = "";
			}
		}

		postData(formData)
			.then(() => statusMessage.innerHTML = message.loading)
			.then(() => statusMessage.innerHTML = message.success)
			.catch(() => statusMessage.innerHTML = message.failure)
			.finally(clearInput);
	});
}

module.exports = sendForm;
