<?php
//Подключение к БД
define("LOCALHOST", "localhost");
define("USERNAME","root");
define("PASSWORD","");
define("DATABASE","future");
$conn = mysqli_connect(LOCALHOST,USERNAME,PASSWORD,DATABASE);
if(!$conn){
    die("Нет подключения к базе данных!");
}; 
$router = $_POST['router'];
//Маршруты
if($router === 'get'){
    getComments($conn);
}else if($router = $_POST['router'] === 'save'){
    $name = $_POST['name'];
    $message = $_POST['message'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    saveComment($name,$message,$date,$time,$conn);
}else{
    echo 'Ошибка маршуртов!';
};
// Сохраняем комментарий в базу данных
function saveComment($name,$message,$date,$time,$conn){
    $query = "INSERT INTO `comments_table` (`id`, `name`, `message`, `date`, `time`) VALUES (NULL, '$name','$message','$date','$time')";
    mysqli_set_charset($conn, "utf8mb4");
    $result = mysqli_query($conn,$query);
    if($result == true){
        echo 'Ваш комментарий успешно добавлен!';
    }
};
//Запрос трёх последних комментариев из БД и отправка их на клиента
function getComments($conn){
    $test = [];
    $query = "SELECT * FROM `comments_table` ORDER BY id DESC LIMIT 0,3";
    mysqli_set_charset($conn, "utf8mb4");
    $result = mysqli_query($conn,$query);
    while($row = mysqli_fetch_assoc($result)){
        array_push($test,$row);
    };
    header('Content-type: application/json');
    echo json_encode($test);
};
?>