let submit = document.getElementById('send');
let commentsEl = document.getElementById('comments-container');
//По кнопке "Отправить" получаем имя и комментарий
submit.onclick = function(){
    let name = document.getElementById('name').value;
    let message = document.getElementById('message').value;
    comments(name,message);
};

//Добавить в HTML-документ, можно 2 способами. В УЖЕ готовый html подставить текст 
//  или СГЕНЕРИРОВАТЬ Html разметку в самом JS и выгрузить на страницу
var comment = '';
function comments(name,message){
    comment += '<div class="comment-container">';
    comment += '<div class="comment-header">';
    comment += '<p class="name margin-right">'+name+'</p>';
    comment += '<p class="time margin-right2">18:05</p>';
    comment += '<p class="date">07.02.2014</p>';
    comment += '</div>';
    comment += '<p class="message">'+message+'</p>';
    comment += '</div>';
    commentsEl.innerHTML = comment;
}

// Тестовое задание -_- 
// Проект без проверок 

