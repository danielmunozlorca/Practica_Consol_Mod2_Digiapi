let selectDigimones = document.getElementById("digimon");

async function getDigimones() {
  try {
    let urlBase = "https://digimon-api.vercel.app/api/digimon";
    let response =await fetch(urlBase);
    let digimones = await response.json();
    
    let acumulador = "<option value='0'>Elige un Digimon</option>";
    digimones.forEach((digimon) => {
        acumulador += `<option value = "${digimon.name}">${digimon.name.toUpperCase()} </option>`;
    });
    selectDigimones.innerHTML = acumulador;
  } catch (error) {
    console.log(error)
    alert("Ha ocurrido un error al consultar los digimones");
  }
}

function getDigimon(nombre) {
    let url = "https://digimon-api.vercel.app/api/digimon/name/"+nombre;
    fetch(url)
        .then(response => response.json())
        .then(digimon => {
            mostrarModal(digimon[0]);
        })
        .catch((error) => {
            alert("Ha ocurrido un error al consultar el digimon");
        });
}

function main () {
    getDigimones();
}

main();

selectDigimones.addEventListener ("change", function () {
    getDigimon(selectDigimones.value)
});

function mostrarModal(digimon) {
  const myModal = new bootstrap.Modal("#digiModal");

  document.getElementById("nombreDigimon").innerText = digimon.name;

  let imagenModal = document.querySelector("#digiModal img"); 
  imagenModal.setAttribute("src",digimon.img);
  imagenModal.setAttribute("alt",digimon.name);

  let nivelDigimon = document.getElementById("nivelDigimon");
  nivelDigimon.innerText = digimon.level;
  nivelDigimon.classList.add("shine");

  imagenModal.classList.add('tilt');
  imagenModal.classList.add('wave'); // Agregar clase "wave" a la imagen

  console.log(imagenModal);
  //mostrar modal una vez que tenga todos los datos
  myModal.show();

  setTimeout(() => {
    imagenModal.classList.remove('tilt');
    imagenModal.classList.remove('wave'); // Remover clase "wave" de la imagen
  }, 10000);


  myModal._element.addEventListener('hidden.bs.modal', function () {
    selectDigimones.value = "0";
  })
  
}


//CARD////////////////////////////////////////////////////////////////

const main2 = document.querySelector('main')

async function getData () {  /* esta funcion trae la data */
    const res = await fetch ("https://digimon-api.vercel.app/api/digimon")/*  entrega respuesta de servidor, además se tarda por lo que se pone un await y arriba un async */
    const data = await res.json() /* la respuesta de arriba se transforma a json para entenderla */
    data.forEach(p => { /* aquí con el foreach recorro todo el arreglo, y toda la data llega al p o a lo que defina */
        
        /* Código para crear la tarjeta */
        const card = document.createElement('div') /* lo primero que necesito es el div para mi card y lo guardo en la constante de nombre card*/
        card.className = "card"

        const img = document.createElement('img')
        img.src = p.img
        
        const nombre = document.createElement('h5')
        nombre.textContent = p.name

        const nivel = document.createElement('p')
        nivel.textContent = p.level
               
        
        card.append(img,nombre,nivel)  /* le agrego hijos a card que es el div, es decir los meto dentro del div */
        main2.append(card) /* y a main le agrego el card (div) similar a lo anterior */
       
    });

}


getData()