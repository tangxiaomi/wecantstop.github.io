<?php 


header('Content-Type:application/json');

//火热作者介绍
$hotUrl = 'https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

//推荐作者介绍
$recUrl = 'https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=20&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

$hotData = file_get_contents($hotUrl);
$recData = file_get_contents($recUrl);

//将对象转换成数组
$hotData = json_decode($hotData,true);

$recData = json_decode($recData,true);

//二维数组
$result = json_encode(array("hot" => $hotData, "rec" => $recData));

echo $result;

