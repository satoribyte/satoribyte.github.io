<?php
$directory = $_GET['dir'];

$files = scandir($directory);
$result = array();

foreach ($files as $file) {
  if ($file !== '.' && $file !== '..') {
    $path = $directory . '/' . $file;

    if (is_dir($path)) {
      $result[] = array(
        'name' => $file,
        'type' => 'directory'
      );
    } else {
      $result[] = array(
        'name' => $file,
        'type' => 'file'
      );
    }
  }
}

echo json_encode($result);
?>
