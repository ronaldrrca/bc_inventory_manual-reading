const find_icon = document.getElementById("find_icon")
const tipo = document.getElementById("tipo")
const marca = document.getElementById("marca")
const modelo = document.getElementById("modelo")
const serial = document.getElementById("serial")
const estado = document.getElementById("estado")
const codigoBarras = document.getElementById("codigoBarras")
const noFound = document.getElementById("noFound")

    //Consulta al servidor
    fetch('./listarObjetosControl.php')
    .then(response => response.json())
    .then(data => {
        find_icon.addEventListener("click", ()=> {
            noFound.innerHTML = " "
            //Revisamos sí el valor ingresado coincide con alguno de los elementos devueltos en la consulta
            let code_input = document.getElementById("code_input").value
            let match = false
            data.forEach(element => {
                switch (code_input) {
                    case element['inventario_codigo_barras']:
                        tipo.value = element['inventario_tipo']
                        marca.value = element['inventario_marca']
                        modelo.value = element['inventario_modelo']
                        serial.value = element['inventario_serial']
                        estado.value = element['inventario_estado']
                        codigoBarras.value = element['inventario_codigo_barras']
                        noFound.innerHTML = ""
                        match = true
                        break;
                   }

                   switch (match) {
                       case false:
                            noFound.innerHTML = "**No se encontraron coincidencias**"
                            tipo.value = ""
                            marca.value = ""
                            modelo.value = ""
                            serial.value = ""
                            estado.value = ""
                            codigoBarras.value = ""
                        break;
                    }
            });//Cierre forEach
        })//Cierre del evento en find_icon
    })//Cierre del fetch
        

