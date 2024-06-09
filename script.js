const birthDay = document.querySelector('#day'),
	birthMonth = document.querySelector('#month'),
	birthYear = document.querySelector('#year'),
	btn = document.querySelector('.btn'),
	inputs = document.querySelectorAll('input'),
	formHead = document.querySelector('.form-head'),
	displays = document.querySelectorAll('span');

let birthDate,
	birthDayVal,
	birthMonthVal,
	birthYearVal,
	todayDate,
	daysInMonth,
	input,
	d1,
	d2,
	d3,
	m1,
	m2,
	m3,
	y1,
	y2,
	y3,
	calc;

// | Fnxs
const displayAge = () => {
		calcAge();

		if (calc) {
			for (let i = 0; i < displays.length; i++) {
				displays[i].classList.add('calc');
			}

			setTimeout(() => {
				displays[0].textContent = y3;
				displays[1].textContent = m3;
				displays[2].textContent = d3;
			}, 2000);
		}
	},
	calcAge = () => {
		getBirthDate();
		checkError();
		d2 = todayDate.getDate();
		m2 = todayDate.getMonth() + 1;
		y2 = todayDate.getFullYear();

		d2 >= d1 ? (d3 = d2 - d1) : (m2--, (d3 = getDaysInMonth() + d2 - d1));

		m2 >= m1 ? (m3 = m2 - m1) : (y2--, (m3 = 12 + m2 - m1));

		y3 = y2 - y1;
	},
	checkError = () => {
		getBirthDate();

		todayDate = new Date();

		d1 = birthDayVal;
		m1 = birthDate.getMonth() + 1;
		y1 = birthYearVal;

		daysInMonth = getDaysInMonth();

		Date.now() > birthDate.getTime() && birthYearVal <= todayDate.getFullYear()
			? ((birthYear.nextElementSibling.textContent = ` `),
			  birthYear.parentElement.parentElement.classList.remove('error'),
			  (calcYear = true))
			: birthYearVal == ''
			? ((birthYear.nextElementSibling.textContent = `This field is required`),
			  birthYear.parentElement.parentElement.classList.add('error'),
			  (calcYear = false))
			: Date.now() < birthDate.getTime() ||
			  birthYearVal > todayDate.getFullYear()
			? ((birthYear.nextElementSibling.textContent = `Must be in tne past`),
			  birthYear.parentElement.parentElement.classList.add('error'),
			  (calcYear = false))
			: '';

		birthMonthVal < 13 && 0 < birthMonthVal
			? ((birthMonth.nextElementSibling.textContent = ` `),
			  birthMonth.parentElement.parentElement.classList.remove('error'),
			  (calcMonth = true))
			: birthMonthVal == ''
			? ((birthMonth.nextElementSibling.textContent = `This field is required`),
			  birthMonth.parentElement.parentElement.classList.add('error'),
			  (calcMonth = false))
			: birthMonthVal > 12
			? ((birthMonth.nextElementSibling.textContent = `Must be a valid month`),
			  birthMonth.parentElement.parentElement.classList.add('error'),
			  (calcMonth = false))
			: '';

		d1 <= daysInMonth && m1 == birthMonthVal
			? ((birthDay.nextElementSibling.textContent = ` `),
			  birthDay.parentElement.parentElement.classList.remove('error'),
			  (calcDay = true))
			: birthDayVal == ''
			? ((birthDay.nextElementSibling.textContent = `This field is required`),
			  birthDay.parentElement.parentElement.classList.add('error'),
			  (calcDay = false))
			: d1 > daysInMonth || m1 != birthMonthVal
			? ((birthDay.nextElementSibling.textContent = `Must be a valid day`),
			  birthDay.parentElement.parentElement.classList.add('error'),
			  (calcDay = false))
			: '';

		calcYear && calcMonth && calcDay ? (calc = true) : (calc = false);
	},
	getDaysInMonth = () => {
		return new Date(birthYear.value, birthMonth.value, 0).getDate();
	},
	getBirthDate = () => {
		birthDayVal = birthDay.value;
		birthMonthVal = birthMonth.value;
		birthYearVal = birthYear.value;

		birthDate = new Date(
			birthMonthVal + '-' + birthDayVal + '-' + birthYearVal
		);
	};

// | Event Listener
btn.addEventListener('click', displayAge);

inputs.forEach(e => {
	e.addEventListener('input', () => {
		// To remove Alphabets and special numbers
		removeChar = e.value.replace(/[^0-9\.]/g, '');

		// To remove dots
		removeDot = removeChar.replace(/\./g, '');

		e.value = removeDot;
	});

	e.addEventListener('click', e => {
		e.target.value = ``;
		e.target.nextElementSibling.textContent = ` `;
		e.target.parentElement.parentElement.classList.remove('error');
	});
});
