'use strict';

function tabs(parent, tabs, content) {
	let info = document.querySelector(parent),
		tab = document.querySelectorAll(tabs),
		tabContent = document.querySelectorAll(content);

	function hideTabContent(a) {

		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove("show");
			tabContent[i].classList.add("hide");
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains("hide")) {
			tabContent[b].classList.remove("hide");
			tabContent[b].classList.add("show");
		}
	}

	info.addEventListener("click", (event) => {
		let target = event.target;
		let classTab = tabs;

		if (tabs[0] == ".") {
			classTab = tabs.slice(1); // удаляем точку из tabs для возможности применения методов classList
		}

		if (target && target.classList.contains(classTab)) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});
}

module.exports = tabs;