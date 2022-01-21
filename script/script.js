//Exportar arreglo de objetos para realizar comparaciones

let registros = [];

function obtenerDatos() {

    let cargarSexo = document.getElementsByName('radiobutton');
    let edadPersona = document.getElementById('edad').value;
    let pesoPersona = document.getElementById('peso').value;
    let alturaPersona = document.getElementById('altura').value;
    let sexoPersona;
    let imc = 0;

    

    //Obtencion de los datos a comparar para obtener el Peso Ideal
    [dataH, dataM] = datosComparar()

    //Extraccion del valor del radio button mediante una iteracion con forEach

    cargarSexo.forEach(radio => {
        if (radio.checked) {
            sexoPersona = radio.value;
        }
    })

    //Validacion de los datos ingresados

    if (sexoPersona != "Hombre" && sexoPersona != "Mujer") {
        alert('Por favor seleccione el sexo de la persona');

    }

    if (edadPersona === "" || pesoPersona === "" || alturaPersona === "" ||
        isNaN(edadPersona) || isNaN(pesoPersona) || isNaN(alturaPersona) ||
        edadPersona <= 0 || pesoPersona <= 0 || alturaPersona <= 0) {
        alert('Por favor introduzca un valor númerico válido');
    }
    else {

        imc = calcularIMC(pesoPersona, alturaPersona);
        mostrarIMC(imc);
        mostrarPesoIdeal(sexoPersona, alturaPersona, dataH, dataM)
        cargarLS(sexoPersona, edadPersona, pesoPersona, alturaPersona, imc);
        crearObjetoJSON();

    }

    //Funcion que recibe como parametros el peso y la altura y calcula el IMC de una persona
    function calcularIMC(peso, altura) {
        if (altura > 100) {
            altura = altura / 100;
        }
        return peso / Math.pow(altura, 2);

    }

    //Validacion del IMC para determinar la medicion nutricional del usuario
    function mostrarIMC(indice) {

        resultado = document.getElementById("resultado")

        if (indice > 0 && indice < 18.5) {
            resultado.setAttribute("style", "color: rgb(118, 188, 209)");
        }
        else if (indice >= 18.5 && indice < 24.9) {
            resultado.setAttribute("style", "color: rgb(48, 107, 48)");
        }
        else if (indice >= 25.0 && indice < 29.9) {
            resultado.setAttribute("style", "color: rgb(221, 221, 26)");
        }
        else if (indice >= 30 && indice < 39.9) {
            resultado.setAttribute("style", "color: rgb(221, 152, 24)");
        }
        else if (indice >= 40) {
            resultado.setAttribute("style", "color: rgb(202, 30, 30)");
        }

        document.getElementById("resultado").value = indice.toFixed(2);
        document.getElementById("resultadoRango").value = indice;

    }

    //Funcion que compara diferentes alturas y muestra un rango del peso recomendado de una persona
    function mostrarPesoIdeal(sexo, a, dH, dM) {

        let pesoA = 0,
            pesoB = 0,
            altura = parseFloat(a);

        if (altura < 100) {
            altura = altura * 100;
        }

        if (sexo === "Hombre") {
            dH.forEach(dato => {
                const { altura_minima, altura_maxima, peso_minimo, peso_maximo } = dato;
                if (altura >= altura_minima && altura <= altura_maxima) {
                    pesoA = peso_minimo;
                    pesoB = peso_maximo;
                }
            })
        }
        else if (sexo === "Mujer") {
            dM.forEach(dato => {
                const { altura_minima, altura_maxima, peso_minimo, peso_maximo } = dato;
                if (altura >= altura_minima && altura <= altura_maxima) {
                    pesoA = peso_minimo;
                    pesoB = peso_maximo;
                }
            })
        }

        document.getElementById("rangoPesoIdeal").value = `Peso Ideal: ${pesoA} - ${pesoB} Kg`;
    }


    //Funcion que almacena en el Local Storage del Navegador la informacion proporcionada por el usuario y el IMC
    function cargarLS(sexo, edad, peso, altura) {

        localStorage.setItem("Sexo", sexo);
        localStorage.setItem("Edad", edad);
        localStorage.setItem("Peso", peso);
        localStorage.setItem("Altura", altura);
        localStorage.setItem("IMC", imc)
    }

    //Funcion que permite crear un objeto JSON de los datos ingresados por el usuario
    function crearObjetoJSON() {

        const objeto = {

            sexo: localStorage.getItem("Sexo"),
            edad: localStorage.getItem("Edad"),
            peso: localStorage.getItem("Peso"),
            altura: localStorage.getItem("Altura"),
            imc: localStorage.getItem("IMC")

        }

        localStorage.setItem("Personas", JSON.stringify(objeto));
        registros.push(objeto);
        localStorage.setItem('Registros', JSON.stringify(registros));
    }

}
