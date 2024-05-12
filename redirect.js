// Obtener la URL actual
var currentUrl = window.location.href;

// Dividir la URL por las barras para obtener las partes
var urlParts = currentUrl.split('/');

// Obtener el último segmento de la URL, que debería ser el código corto
var shortCode = urlParts[urlParts.length - 1];

// Verificar si el último segmento es un código corto válido (por ejemplo, 8 caracteres alfanuméricos)
var shortCodeRegex = /^[A-Za-z0-9]{8}$/;
if (shortCodeRegex.test(shortCode)) {
    // Si es un código corto válido, realizar la acción deseada
    console.log('Se detectó un código corto en la URL:', shortCode);

    // Realizar la solicitud AJAX al backend
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://back.corti.top/api/redirect/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Redirigir a la URL larga obtenida del backend
                var response = JSON.parse(xhr.responseText);
                var longUrl = response.long_url;
                window.location.href = longUrl;
            } else {
                // Mostrar mensaje de error si no se encuentra el código corto o hay un error en el servidor
                console.error('Error al redireccionar:', xhr.status);
                var loaderNotificacion = document.getElementById('loaderNotificacion');
                loaderNotificacion.textContent = 'Error al redireccionar: Código corto no encontrado.';
                loaderNotificacion.classList.add('vibrar');
                loaderNotificacion.classList.add('text-alert');
                var loader = document.querySelector('.cs-loader');
                loader.classList.add('d-none');
            }
        }
    };

    // Enviar el código corto al backend Laravel
    var data = JSON.stringify({ short_code: shortCode });
    xhr.send(data);

} else {
    // Si no es un código corto válido, hacer algo más o ignorarlo
    console.log('No se detectó un código corto válido en la URL');
    var loaderNotificacion = document.getElementById('loaderNotificacion');
    loaderNotificacion.textContent = 'No se detectó un código corto válido en la URL.';
    loaderNotificacion.classList.add('vibrar');
    loaderNotificacion.classList.add('text-alert');
    var loader = document.querySelector('.cs-loader');
    loader.classList.add('d-none');
}
