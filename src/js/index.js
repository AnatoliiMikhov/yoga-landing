'use strict';
// require('es6-promise').polyfill();
require('nodelist-foreach-polyfill');
require('formdata-polyfill');

window.addEventListener('DOMContentLoaded', function () {

	const tabs = require('./parts/tabs'),
		timer = require('./parts/timer'),
		modal = require('./parts/modal'),
		form = require('./parts/form'),
		slider = require('./parts/slider'),
		calculator = require('./parts/calculator');

	// Tabs
	const parentTabSelector = ".info-header",
		tabSelector = ".info-header-tab",
		contentBlockSelector = ".info-tabcontent";

	tabs(parentTabSelector, tabSelector, contentBlockSelector);

	// Timer
	timer();

	// Modal window
	modal();

	// Send form
	const modalForm = document.querySelector('.main-form'),
		contactForm = document.querySelector('#form');

	form(modalForm);
	form(contactForm);

	// Slider
	slider();

	// Calculator
	calculator();

});