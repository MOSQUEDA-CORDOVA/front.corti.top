<p align="center"><a href="https://corti.top" target="_blank"><h1>Corti.top</h1></a></p>

## Resumen

Este es un front sencillo con html, css y js puro que consume los servicios de https://back.corti.top/ para acortar URLs.

### Instalación y Configuración Local:

1. Clona este repositorio.
2. Reemplaza las solicitudes de la api por la dirección donde alojaste el backend, o usa la de ejemplo: https://dev.corti.top/api
3. Abre el archivo `index.html` en tu navegador web.
4. Para el despliegue en producción sube los archivos HTML, CSS y JavaScript a tu servidor o servicio de alojamiento, puedes usar firebase por ejemplo.

## Despliegue

🚨 El servidor https://back.corti.top/ no puede ser consultado a menos que la consulta provenga del dominio https://corti.top/ sin embargo he creado una version de desarrollo que si puede ser consultada: https://dev.corti.top/ donde también alojé la documentación de la api en https://dev.corti.top/api/documentation

## 💡 CI/CD 
Para efectos de la prueba, cualquier comit que se realice en la rama main, se integrará de forma automática en https://corti.top/ ya que usé la herramienta forge laravel