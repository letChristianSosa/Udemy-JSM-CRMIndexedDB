import {conectarDB, imprimirAlerta, DB} from './funciones.js'

(function(){
     // let DB;
     const formulario = document.querySelector('#formulario');

     document.addEventListener('DOMContentLoaded', () => {

          conectarDB();

          formulario.addEventListener('submit', validarCliente);
     })     

     function validarCliente(e){
          e.preventDefault();

          const nombre = document.querySelector('#nombre').value;
          const email = document.querySelector('#email').value;
          const telefono = document.querySelector('#telefono').value;
          const empresa = document.querySelector('#empresa').value;

          if(nombre === '' || email === '' || telefono === '' || empresa === ''){
               imprimirAlerta('Todos los campos son obligatorios', 'error');
               return;
          }

          // Crear un objeto con la informacion

          const cliente = {
               nombre,
               email,
               telefono,
               empresa,
               id: Date.now()
          }

          crearNuevoCliente(cliente);
     };

     function crearNuevoCliente(cliente){
          const transaction = DB.transaction(['crm'], 'readwrite');

          //Agregar un cliente a la BD
          const objectStore = transaction.objectStore('crm');
          objectStore.add(cliente);

          transaction.onerror = function(){
               imprimirAlerta('El correo ya esta registrado', 'error');
          };

          transaction.oncomplete = function(){
               imprimirAlerta('Cliente agregado correctamente');

               setTimeout(()=>{
                    // Redirige a index.html despues de 3 segundos
                    window.location.href = 'index.html';
               }, 2500);
          };
     }
})();