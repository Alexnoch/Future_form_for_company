let xhr = new XMLHttpRequest();
let sendComment ={
    comment:'',
    submit:document.getElementById('send'),
    commentsContainer:document.getElementById('comments-container'),
    //Сначала проверяет новый комментарий. Потом отображает и Отсылает в базу данных
    send:function(){
        let name = document.getElementById('name').value;
        let message = document.getElementById('message').value;
        let date = new Date().toLocaleDateString();
        let time =  new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
        let router = 'save';
        if(name.length < 30 && message.length < 255 && name.length > 2 && message.length > 2 ){
            this.sendToServer(name,message,date,time,router);
            this.render(name,message,date,time);
        }else{
            console.log('Ваш комментарий или имя слишком большое!Либо вы ничего не ввели!')
        };  
    },
    sendToServer:function(name,message,date,time,router){
        let body = "name="+name + "&message="+message+"&date="+date+"&time="+time+"&router="+router;
        xhr.open('POST','comments.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function(){console.log('Комментарий успешно отправлен на сервер!')};
        xhr.send(body);
    },
    //Запрашивает с сервера, последние 3 комментария
    queryToServer:function(){
            let body = "router=get";
            xhr.open('POST', 'comments.php');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                let newComments = JSON.parse(xhr.responseText);
                sendComment.firstRendering(newComments);
            }else{
                console.log('Сервер не предоставил комментариев!');
                }
            }
            xhr.send(body);
    },
    firstRendering:function(newComments){
        for(var x = 0; x<newComments.length; x++){
             this.render(name=newComments[x].name,message=newComments[x].message,date=newComments[x].date,time=newComments[x].time);
        }
    },
    render:function(name,message,date,time){
            this.comment += '<div class="comment-container">';
            this.comment += '<div class="comment-header">';
            this.comment += '<p class="name margin-right">'+name+'</p>';
            this.comment += '<p class="time margin-right2">'+time+'</p>';
            this.comment += '<p class="date">'+date+'</p>';
            this.comment += '</div>';
            this.comment += '<p class="message">'+message+'</p>';
            this.comment += '</div>';
            this.commentsContainer.innerHTML = this.comment;
            //Стираем сообщение
            document.getElementById('name').value = "";
            document.getElementById('message').value = "";
    }
}
document.addEventListener("DOMContentLoaded", function(){
    //Загружает первые комменты из БД
    sendComment.queryToServer()
    //Обработчик для кнопки отправки комментария в БД
    sendComment.submit.onclick = function(){
        sendComment.send()
    };
});



// ----------------------============--------------Изначальная версия была в процедурном стиле-------------------===========-----------

// let submit = document.getElementById('send');
// let commentsEl = document.getElementById('comments-container');
// let xhr = new XMLHttpRequest();
// let comment = '';
// //По кнопке "Отправить" получаем имя, комментарий, дату. Показываем новое сообщение + сохраняем его в БД.
// submit.onclick = function(){
//     let name = document.getElementById('name').value;
//     let message = document.getElementById('message').value;
//     let date = new Date().toLocaleDateString();
//     let time =  new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
//     let router = 'save';
//     if(name.length < 30 && message.length < 255 && name.length > 2 && message.length > 2 ){
//         sendToServer(name,message,date,time,router);
//         comments(name,message,date,time);
//     }else{
//         console.log('Ваш комментарий или имя слишком большое!Либо вы ничего не ввели!')
//     };  
// };
// // Добавление комментария на страницу
// function comments(name,message,date,time){
//     comment += '<div class="comment-container">';
//     comment += '<div class="comment-header">';
//     comment += '<p class="name margin-right">'+name+'</p>';
//     comment += '<p class="time margin-right2">'+time+'</p>';
//     comment += '<p class="date">'+date+'</p>';
//     comment += '</div>';
//     comment += '<p class="message">'+message+'</p>';
//     comment += '</div>';
//     commentsEl.innerHTML = comment;
//     //Стираем сообщение
//     document.getElementById('name').value = "";
//     document.getElementById('message').value = "";
// }
// // Отправляем комментарий на сервер
// function sendToServer(name,message,date,time,router){
//     let body = "name="+name + "&message="+message+"&date="+date+"&time="+time+"&router="+router;
//     xhr.open('POST','comments.php');
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.onreadystatechange = function(){console.log('Комментарий успешно отправлен на сервер!')};
//     xhr.send(body);
// }
// //----------------------------------------------------------ЗАГРУЗКА ПОСЛЕДНИХ ТРЕХ КОММЕНТАРИЕВ--------------------------------------
// // Запрос последних трёх комментариев
// function ready(){
//     let body = "router=get";
//     xhr.open('POST', 'comments.php');
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.onreadystatechange = function(){
//         if(xhr.readyState == 4 && xhr.status == 200){
//             let newComments = JSON.parse(xhr.responseText);
//             firstRendering(newComments);
//         }else{
//             console.log('Сервер не предоставил комментариев!');
//         }
//     };
//     xhr.send(body);
// }
// //Рендерим последние 3 комментария
// function firstRendering(newComments){
//     for(var x = 0; x<newComments.length; x++){
//         comments(name=newComments[x].name,message=newComments[x].message,date=newComments[x].date,time=newComments[x].time);
//     } 
// };
// document.addEventListener("DOMContentLoaded", ready);