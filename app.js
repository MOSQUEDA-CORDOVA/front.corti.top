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

document.addEventListener("DOMContentLoaded", function() {

    cargarUrlsAnteriores();
    // Agregar un listener de clic al contenedor principal y delegar los eventos
    document.querySelector('#urls-table').addEventListener('click', function(event) {
        // Verificar si el clic ocurrió en un enlace con la clase btn-delete
        if (event.target.classList.contains('btn-delete')) {
            event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            var row = event.target.closest('tr'); // Obtener la fila que contiene el botón
            var id = row.querySelector('td:first-child').textContent; // Obtener el texto del primer td (ID)
            // Realizar la solicitud para eliminar la URL
            eliminarUrl(id, function(success) {
                if (success) {
                    row.remove(); // Eliminar la fila del front-end si la eliminación fue exitosa
                } else {
                    var notificacionFlotante = document.querySelector('.notificacion-flotante-error');
                    notificacionFlotante.classList.add('active');
                    setTimeout(function() {
                        notificacionFlotante.classList.remove("active");
                    }, 3000);
                }
            });
        }
    });
});

function cargarUrlsAnteriores() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://back.corti.top/api/urls', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            mostrarUrls(data);
        } else {
            console.error('Error al cargar las URLs anteriores');
        }
    };

    request.onerror = function() {
        console.error('Error de conexión');
    };

    request.send();
}

function mostrarUrls(urls) {
    var table = document.getElementById('urls-table');
    var tbody = document.createElement('tbody');

    urls.forEach(function(url) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${url.id}</td>
            <td><a href="https://corti.top/${url.short_code}" target="_blank" class="short-code-items">${url.short_code}</a></td>
            <td><div class="original-url">${url.long_url}</div></td>
            <td class="text-center">
                <a href="https://corti.top/${url.short_code}" target="_blank"><i class="ti ti-link me-8"></i></a>
                <i class="ti ti-trash btn-delete"></i>
            </td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
}

function eliminarUrl(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'https://back.corti.top/api/urls/' + id, true);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            callback(true); // Llamar al callback con true si la eliminación fue exitosa
        } else {
            console.error('Error al eliminar la URL:', xhr.status);
            callback(false); // Llamar al callback con false si la eliminación falla
        }
    };

    xhr.onerror = function() {
        console.error('Error de conexión');
        callback(false); // Llamar al callback con false si hay un error de conexión
    };

    xhr.send();
}