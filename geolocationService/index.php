<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<title>Page Title</title>
<script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
<!--
<script type="text/javascript">

        function Ajax()
        {
            var
                $latitude,
                $longitude,
                $date,
                $time,
                $self = arguments.callee;

            if (window.XMLHttpRequest) {
                $latitude = new XMLHttpRequest();
                $longitude = new XMLHttpRequest();
                $date = new XMLHttpRequest();
                $time = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                try {
                    $latitude = new ActiveXObject('Msxml2.XMLHTTP');
                    $longitude = new ActiveXObject('Msxml2.XMLHTTP');
                    $date = new ActiveXObject('Msxml2.XMLHTTP');
                    $time = new ActiveXObject('Msxml2.XMLHTTP');
                } catch(e) {
                    $latitude = new ActiveXObject('Microsoft.XMLHTTP');
                    $longitude = new ActiveXObject('Microsoft.XMLHTTP');
                    $date = new ActiveXObject('Microsoft.XMLHTTP');
                    $time = new ActiveXObject('Microsoft.XMLHTTP');
                }
            }

            if ($latitude) {
                $latitude.onreadystatechange = function()
                {
                    if (/4|^complete$/.test($latitude.readyState)) {
                        document.getElementById('latitude').innerHTML = $latitude.responseText;
                        setTimeout(function(){$self();}, 1000);
                    }
                };
                $latitude.open('GET', 'loadlatitude.php' + '?' + new Date().getTime(), true);
                $latitude.send(null);
            }

            if ($longitude) {
                $longitude.onreadystatechange = function()
                {
                    if (/4|^complete$/.test($longitude.readyState)) {
                        document.getElementById('longitude').innerHTML = $longitude.responseText;
                        setTimeout(function(){$self();}, 1000);
                    }
                };
                $longitude.open('GET', 'loadlongitude.php' + '?' + new Date().getTime(), true);
                $longitude.send(null);
            }

            if ($date) {
                $date.onreadystatechange = function()
                {
                    if (/4|^complete$/.test($date.readyState)) {
                        document.getElementById('date').innerHTML = $date.responseText;
                        setTimeout(function(){$self();}, 1000);
                    }
                };
                $date.open('GET', 'loaddate.php' + '?' + new Date().getTime(), true);
                $date.send(null);
            }

            if ($time) {
                $time.onreadystatechange = function()
                {
                    if (/4|^complete$/.test($time.readyState)) {
                        document.getElementById('time').innerHTML = $time.responseText;
                        setTimeout(function(){$self();}, 1000);
                    }
                };
                $time.open('GET', 'loadtime.php' + '?' + new Date().getTime(), true);
                $time.send(null);
            }

        }

</script>
    -->

<body>

<?php
echo "<h1>Servicio de Geolocalización Movil<h1>";
echo "<hr>";

?>


<div id="block"></div>

<!--<script type="text/javascript">
    setTimeout(function() {Ajax();}, 1000);
</script>
    -->


<script type="text/javascript">
    $(document).ready(function(){
      refreshValues();
    });

    function refreshValues(){
        $('#block').load('loadData.php', function(){
           setTimeout(refreshValues, 1000);
        });;
    }
</script>

</body>
</html>