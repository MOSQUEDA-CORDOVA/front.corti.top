document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var longUrl = document.getElementById('longUrl').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://back.corti.top/api/shorten', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                var response = JSON.parse(xhr.responseText);
                var shortUrl = response.short_url;
                var message = response.msj;
                console.log(shortUrl);
                // Actualizar la interfaz de usuario con la URL corta generada
                var containerShortUrlResult = document.querySelector('.containerShortUrlResult');
                containerShortUrlResult.classList.add('active');

                var shortUrlResult = document.getElementById('shortUrlResult');
                // Obtener la URL base de la página actual
                var baseUrl = window.location.origin;
                // Concatenar la URL base con el código corto devuelto por el servicio
                var fullShortUrl = baseUrl + '/' + shortUrl;    
                // Actualizar el contenido del elemento con la URL completa
                shortUrlResult.textContent = fullShortUrl;

                // Mostrar mensaje de alerta
                if (message) {
                    var simpleAlert = document.querySelector('.simpleAlert');
                    simpleAlert.classList.add('active');
                    simpleAlert.textContent = message;
                    containerShortUrlResult.classList.add('text-alert');
                    containerShortUrlResult.classList.add('border-alert');

                    containerShortUrlResult.classList.add('vibrar');
                    // Remover la clase "vibrar" después de la animación
                    setTimeout(function() {
                        containerShortUrlResult.classList.remove("vibrar");
                    }, 300);
                }else{
                    var simpleAlert = document.querySelector('.simpleAlert');
                    simpleAlert.classList.remove('active');
                    simpleAlert.textContent = "";
                    containerShortUrlResult.classList.remove('text-alert');
                    containerShortUrlResult.classList.remove('border-alert');
                    containerShortUrlResult.classList.add('vibrar');
                    // Remover la clase "vibrar" después de la animación
                    setTimeout(function() {
                        containerShortUrlResult.classList.remove("vibrar");
                    }, 300);
                }

            } else {
                console.error('Error al acortar la URL:', xhr.status);
                var simpleAlert = document.querySelector('.simpleAlert');
                simpleAlert.classList.add('active');
                simpleAlert.textContent = 'Error al acortar la URL';
            }
        }
    };

    var data = JSON.stringify({ long_url: longUrl });
    xhr.send(data);
});

function copiarAlPortapapeles(elemento) {
    // Obtener el contenido del elemento itemShortUrl
    var contenido = elemento.querySelector('.itemShortUrl').innerText;

    // Crear un elemento de texto temporal para copiar al portapapeles
    var tempInput = document.createElement("textarea");
    tempInput.value = contenido;
    document.body.appendChild(tempInput);

    // Seleccionar y copiar el contenido al portapapeles
    tempInput.select();
    document.execCommand("copy");

    // Remover el elemento temporal
    document.body.removeChild(tempInput);

    // Mostrar una notificación o realizar alguna acción adicional si lo deseas
    var notificacionFlotante = document.querySelector('.notificacion-flotante');
    notificacionFlotante.classList.add('active');
    setTimeout(function() {
        notificacionFlotante.classList.remove("active");
    }, 2000);
}
