// redirectToRegister = () => {
//     window.location.href = "http://localhost:8080/register"; 
// }

// redirectToLogin = () => {
//     window.location.href = "http://localhost:8080/login"; 
// }

var form = document.getElementById('form-filtrar-categoria');
var select = document.getElementById('select-categoria');

form.addEventListener('submit', function(event) {
    var categoriaSeleccionada = select.value;
    if (categoriaSeleccionada === '') {
      event.preventDefault();
      alert('Debe seleccionar una categoría antes de enviar el formulario.');
    }
  });

select.addEventListener('change', function() {
  var categoriaSeleccionada = select.value;
  if (categoriaSeleccionada !== '') {
    var urlDestino = '/productos/categoria/' + categoriaSeleccionada;
    form.method = 'get'
    form.action = urlDestino;
  }
});