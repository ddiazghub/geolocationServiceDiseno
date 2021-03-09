<?php

    $file = "loadData.txt";
    $f = fopen($file, "r");
    $current_contents = file_get_contents($file); 

    if (checkForChange($file)) {
        $f = fopen($file, "r");
    }

    $current_contents = explode(" ", $current_contents);
    
    echo "<div id=latitude_label>Latitud: </div>";

    echo "<div id=latitude>$current_contents[0]</div>";
    
    echo "<div id=longitude_label>Longitud: </div>";
    echo "<div id=longitude>$current_contents[1]</div>";
    
    echo "<div id=date_label>Fecha: </div>";
    echo "<div id=date>$current_contents[2]</div>";
    
    echo "<div id=time_label>Hora: </div>";
    echo "<div id=time>$current_contents[3]</div>";

    function checkForChange($filepath) {
        global $current_contents;

        $new_contents = file_get_contents($filepath);
        if ($new_contents != $current_contents) {
            $current_contents = $new_contents;
            return true;
        }
        else {
            return false;
        }
    }
?>