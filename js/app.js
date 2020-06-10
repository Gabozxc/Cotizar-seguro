// cotizador

const selectAnios = document.getElementById('anio')
const formulario = document.getElementById('cotizar-seguro')
const max = new Date().getFullYear()
const min = max - 20

// generar opciones del select
for (let i = max; i >= min; i--) {
    let option = document.createElement('option')
    option.value = i
    option.innerHTML = i
    selectAnios.appendChild(option)
}


// constructor para seguro
function Seguro(marca, ano, tipo) {

    this.marca = marca
    this.ano = ano
    this.tipo = tipo

}

Seguro.prototype.cotizarSeguro = function() {

    /*  
          1 = americano 1.15
          2 = asiatico 1.05
          3 = europeo 1.35
    */
    let cantidad;
    const base = 2000

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15
            break;
        case '2':
            cantidad = base * 1.05
            break;
        case '3':
            cantidad = base * 1.35
            break;


    }

    // Leer el a;o
    // cada anio el seguro baja un 3%


    const diferencia = new Date().getFullYear() - this.ano

    cantidad -= ((diferencia * 3) * cantidad) / 100



    /* 
    
    si el seguro es basico aumenta un 30% mas
    Si es uno completo aumenta un 50% mas

    */

    if (this.tipo === 'basico') {
        cantidad *= 1.30
    } else {
        cantidad *= 1.50
    }


    return cantidad



}

// Todo de la interfaz

function Interfaz() {}

// imprime el resultado de la cotizacion 

Interfaz.prototype.mostrarResultado = function(seguro, total) {
    const resultado = document.getElementById('resultado')
    let marca;
    switch (seguro.marca) {
        case '1':
            marca = 'americano'
            break;
        case '2':
            marca = 'asiatico'
            break;
        case '3':
            marca = 'europeo'
            break;
    }
    // crear div

    const div = document.createElement('div')
        //agregar informacion

    div.innerHTML = `<p class='header'>Tu resumen:</p>
   <p> Marca: ${marca}</p>
    <p>Año: ${seguro.ano}</p>
    <p>Tipo: ${seguro.tipo}</p>
    <p>Total: ${total}</p>
    `

    const spinner = document.querySelector('#cargando img')
    spinner.style.display = 'block'
    setTimeout(function() {
        spinner.style.display = 'none'
        resultado.appendChild(div)
    }, 3000)

}

// mensaje que se imprime en el html 

Interfaz.prototype.mostrarMensaje = function(mensaje, tipo) {
    const div = document.createElement('div')

    if (tipo === 'error') {

        div.classList.add('mensaje', 'error')

    } else {
        div.classList.add('mensaje', 'correcto')
    }
    div.innerHTML = `${mensaje}`
    formulario.insertBefore(div, document.querySelector('.form-group'))

    setTimeout(function() {
        document.querySelector('.mensaje').remove()
    }, 3000)
}

// Event listener 


formulario.addEventListener('submit', function(e) {

    e.preventDefault

    //Leer la marca seleccionada del select
    const marca = document.getElementById('marca')
    const marcaSeleccionada = marca.options[marca.selectedIndex].value

    //leer el a;o del select

    const anio = document.getElementById('anio')
    const anioSeleccionado = anio.options[anio.selectedIndex].value

    // Leer el valor del radio buttom

    const tipo = this.querySelector('input[name = "tipo"]:checked').value

    // Crear instancia de interfaz

    const interfaz = new Interfaz()

    // Revisando campos no esten vacios
    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {

        // por si dejan algun campo vacio
        interfaz.mostrarMensaje('faltan datos, revisa el formulario y prueba de nuevo', 'error');

    } else {
        // Limpiar resultados anteriores
        const resultados = this.querySelector('#resultado div')
        if (resultados != null) {
            resultados.remove()
        }

        // Instanciar seguro y mostrar interfaz 

        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo)

        //cotizar el seguro

        const cantidad = seguro.cotizarSeguro()
            // mostrar el reultado

        interfaz.mostrarResultado(seguro, cantidad)

        interfaz.mostrarMensaje('cotizando', 'correcto');

    }

})