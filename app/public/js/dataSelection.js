// eslint-disable-next-line
function openPage(tabName, element) {

	const tabcontent = document.getElementsByClassName('tabcontent');
	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}

	const tablinks = document.getElementsByClassName('tablink');
	for (let i = 0; i < tablinks.length; i++) {
		tablinks[i].style.backgroundColor = '';
	}

	document.getElementById(tabName).style.display = 'block';

	element.style.backgroundColor = '#E91E63';
}

document.getElementById('defaultOpen').click();