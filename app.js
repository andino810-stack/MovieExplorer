const API_KEY = "TU_API_KEY";

const contenedor = document.getElementById("peliculas");
const buscar = document.getElementById("buscar");

// Películas populares al abrir la app
async function cargarPopulares() {

    const url =
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;

    const res = await fetch(url);
const data = await res.json();


// Buscar mientras escribís
buscar.addEventListener("input", async () => {

    const texto = buscar.value.trim();

    if (texto === "") {
        cargarPopulares();
        return;
    }

    const url =
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(texto)}`;

    const res = await fetch(url);
    const data = await res.json();

    mostrar(data.results);
});

function mostrar(lista) {

    contenedor.innerHTML = "";

    lista.forEach(p => {

        const poster = p.poster_path
            ? "https://image.tmdb.org/t/p/w500" + p.poster_path
            : "https://via.placeholder.com/500x750?text=Sin+Imagen";

        contenedor.innerHTML += `
<div class="card" onclick="location.href='detalle.html?id=${p.id}'">
    <img src="${poster}" alt="${p.title}">
    <h3>${p.title}</h3>
    <p>${p.release_date ? p.release_date.substring(0,4) : "Sin fecha"}</p>
</div>
`;
    });

}

cargarPopulares();
