(function(){

/*
	Форма с програссивным улучшением на чистом JS
	Если отрабатывает ajax, то она отправляется в файл, указанный в переменной url, если не отрабатывет, то в файл укзанный в самой форме
	Ожидаемый ответ от сервера - JSON
		{
			"result":"ok",
			"message":"confirmation is completed, check your email"
		}
	В данном коде мы проверяем только заполненность полей, стандартным атрибутом required, другие валидации не происходят

*/

	let form = document.querySelectorAll('.wed-form'); 
	let url = 'http://git-test/form/response.json'; // где обрбатывается форма
	let answer; // ответ который отдаст сервер


	for (var i = form.length - 1; i >= 0; i--) {
		form[i].addEventListener('submit', function(e){
				validateForm(e, this);
			});
	}

	/* Проверка валидации формы */
	function validateForm(e, form) {
		let flag = true;

	/* Validation code: prohibited names */

	/* Если валидация прошла успешно, то отправляем ajax запрос и предоствращаем действие по умолчанию */
	  if (flag){
	   	e.preventDefault();
	   	sendAjaxForm(form);
	  }
	}

	/*Отправка формы методом Ajax*/
	function sendAjaxForm(form){

		var req = new XMLHttpRequest();
		req.open('POST', url, true);
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

		req.send(null);

		req.onreadystatechange = function(){
			
			if (req.readyState == 4){
				answer = JSON.parse(req.responseText);
				showAnswer(answer, form);
			}
		}
	}

	/* Показываем ответ в форме */
	function showAnswer(answer, form){
		let result = form.querySelector('.form-result');

		if(answer.result == 'error'){
			result.classList.add('form-result--isBad');
			result.classList.remove('form-result--isOk');
			resultText = '<p class="form-result--isBad--title"> Ошибка </p>';
		}else{
			result.classList.remove('form-result--isBad');
			result.classList.add('form-result--isOk');
			resultText = '<p class="form-result--isOk--title"> Успех </p>';	
		}
 
		resultText = resultText + '<p>' + answer.message + '</p>';
		result.innerHTML = resultText;
	}

})();




