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

    // Aquí puedes realizar la acción que desees, como consultar tu servicio de backend
} else {
    // Si no es un código corto válido, hacer algo más o ignorarlo
    console.log('No se detectó un código corto válido en la URL');
}
