const find_icon = document.getElementById("find_icon")
const tipo = document.getElementById("tipo")
const marca = document.getElementById("marca")
const modelo = document.getElementById("modelo")
const serial = document.getElementById("serial")
const estado = document.getElementById("estado")
const codigoBarras = document.getElementById("codigoBarras")
const noFound = document.getElementById("noFound")
const textbox = document.getElementById("code_input");

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
                    case ""://En caso de que el input esté vacío
                        noFound.innerHTML = ""
                        match = true //En este punto match no es realmente TRUE, pero con esto evitamos que se ejecute la acción para cuando es FALSE
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
        
    
//Activando la tecla Enter para las búsquedas
textbox.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        find_icon.click();
    }
});
