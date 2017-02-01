$(document).ready(function() {

    var indicador = "";

    // Verificando se o browser dá suporte para localização
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            
            // Recebendo JSON da API
            $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&APPID=e0902187073afcf6d66c0807936aa1fa",function(json){
                
                // Convertendo JSON para string
                var jsonWeather = JSON.stringify(json);
                var jsonWeatherReady = JSON.parse(jsonWeather);

                // Main e descrição do tempo corrente
                var tempoCorrente = jsonWeatherReady.weather[0].main;
                var descripTempoCorrente = jsonWeatherReady.weather[0].description;
                var periodo = jsonWeatherReady.weather[0].icon;
                var currentPeriod = "";

                if (periodo.indexOf('n') >= 1) {
                    currentPeriod = "night";
                } else if (periodo.indexOf('n') < 1) {
                    currentPeriod = "day";
                }
               
                // Id e nome da cidade
                var idTempoCorrente = jsonWeatherReady.weather[0].id;
                var cidadeTempoCorrente = jsonWeatherReady.name;

                // Temperatura em Kelvin (padrão do OpenWeatherAPI) 
                var tempTempoCorrente = jsonWeatherReady.main.temp;

                // Convertendo Kelvin para Celsius e Fahrenheit e pegando
                // as duas primeiras casas da temperatura que está em float
                var tempTempoCorrenteCel = tempTempoCorrente - 273.15;
                tempTempoCorrenteCel = parseFloat(tempTempoCorrenteCel.toFixed(0));
                var tempTempoCorrenteFar = ((tempTempoCorrente * 9)/5) - 459.67;
                tempTempoCorrenteFar = parseFloat(tempTempoCorrenteFar.toFixed(0));

                // Criando um objeto com as informações da data
                var now = new Date;
                // Obtendo as informações da data em string, tendo como auxilio dois arrays
                var dayName = new Array ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"); 
                var monName = new Array ("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
                var dateCorrente = (monName[now.getMonth()] + " " + now.getDate() + ", " + dayName[now.getDay()] + ", " + now.getFullYear());

                // Jogando no html o nome da cidade, a data e a temperatura
                $("#city-name").html(cidadeTempoCorrente);
                $("#date").html(dateCorrente);
                $("#temperature").html(tempTempoCorrenteCel);

                // Indica qual o formato atual
                indicador = "cel";

                $(".weather").html(tempoCorrente+"</br>");
                $(".weather").append(descripTempoCorrente);

                $(".icon-tempo").addClass("wi wi-owm-"+currentPeriod+"-"+idTempoCorrente);

                // Background de acordo com o tempo
                switch(tempoCorrente){
                    case "Thunderstorm":
                        $("body").css("background-image","url(\"https://wallpaperscraft.com/image/lightning_elements_coast_night_stars_clouds_clearly_sky_48426_1920x1080.jpg\")");
                    break;
                    case "Drizzle":
                        $("body").css("background-image","url(\"https://www.walldevil.com/wallpapers/a78/spring-rain-background-desktop-wallpapers.jpg\")");
                    break;
                    case "Rain":
                        $("body").css("background-image","url(\"https://www.walldevil.com/wallpapers/a78/spring-rain-background-desktop-wallpapers.jpg\")");
                    break;
                    case "Snow":
                        $("body").css("background-image","url(\"http://www.wallpapers4u.org/wp-content/uploads/snow_surface_flakes_black_white_2897_1920x1080.jpg\")");
                    break;
                    case "Atmosphere":
                        $("body").css("background-image","url(\"http://wallpapercave.com/wp/KbL3AxO.jpg\")");
                    break;
                    case "Clear":
                        $("body").css("background-image","url(\"http://wallpapercave.com/wp/iv5DLYI.jpg\")");
                    break;
                    case "Clouds":
                        $("body").css("background-image","url(\"https://wallpaperscraft.com/image/clouds_volume_sky_26678_1920x1080.jpg\")");
                    break;
                }


                // Toggle entre fahrenheit e celsius
                $(".changer").on("click", function() {
                    $("#icon-tempo").toggleClass("wi-fahrenheit");
                    if (indicador == "cel") {
                        $("#temperature").html(tempTempoCorrenteFar);
                        indicador = "fah";
                    } else if (indicador == "fah") {
                        $("#temperature").html(tempTempoCorrenteCel);
                        indicador = "cel";
                    }
                });

            });
        });
    } 
});
