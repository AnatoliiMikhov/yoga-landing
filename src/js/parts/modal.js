'use strict';

function modal(){
	const btnOpenModal = document.querySelectorAll('.description-btn'),
		moreBtn = document.querySelector(".more"),
		overlay = document.querySelector(".overlay"),
		closeBtn = document.querySelector(".popup-close");

	function openModal() {
		overlay.style.display = "block";
		document.body.style.overflow = "hidden";
	}

	function closeModal() {
		overlay.style.display = "none";
		document.body.style.overflow = "";
	}

	btnOpenModal.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	moreBtn.addEventListener("click", function () {
		openModal();
		this.classList.add("more-splash");
	});

	closeBtn.addEventListener("click", () => {
		closeModal();
		moreBtn.classList.remove("more-splash");
	});
}

module.exports = modal;