const productosDiv = document.getElementById("productos");
const buscador = document.getElementById("buscador");
const categoriasDiv = document.getElementById("categorias");
 
let productos = [];
 
// Cargar CSV
fetch("catalogo.csv")
.then(response => response.text())
.then(data => {
 
const filas = data.trim().split("\n");
filas.shift(); // elimina encabezado
 
productos = filas.map(fila => {
 
const datos = fila.split(";");
 
return {
id: datos[0],
nombre: datos[1],
categoria: datos[2],
precio: datos[3],
imagen: datos[4],
descripcion: datos[5],
stock: datos[6]
};
 
});
 
crearFiltros();
mostrarProductos(productos);
});
 
// Mostrar productos
function mostrarProductos(lista) {
 
productosDiv.innerHTML = "";
 
lista.forEach(producto => {
 
const imagenCorregida = producto.imagen
.replace("blob/main/", "main/")
.replace("?raw=true", "");
 
const whatsapp = `https://wa.me/5491133648009?text=Hola%20Karu%20Cerámica,%20me%20interesa%20el%20producto%20${encodeURIComponent(producto.nombre)}`;
 
productosDiv.innerHTML += `
<div class="card">
 
${imagenCorregida}
 
<div class="info">
 
<h3>${producto.nombre}</h3>
 
<p class="categoria">${producto.categoria}</p>
 
<p class="precio">$ ${producto.precio}</p>
 
<p>${producto.descripcion}</p>
 
<p class="stock">
Stock: ${producto.stock}
</p>
 
${whatsapp}
Consultar por WhatsApp
</a>
 
</div>
 
</div>
`;
});
 
}
 
// Crear filtros
function crearFiltros() {
 
const categorias = [
...new Set(productos.map(p => p.categoria))
];
 
categoriasDiv.innerHTML = `
<button class="filtro" onclick="mostrarProductos(productos)">
Todos
</button>
`;
 
categorias.forEach(categoria => {
 
categoriasDiv.innerHTML += `
<button class="filtro"
onclick="filtrarCategoria('${categoria}')">
${categoria}
</button>
`;
});
}
 
// Filtrar categoría
function filtrarCategoria(categoria) {
 
const filtrados = productos.filter(
producto => producto.categoria === categoria
);
 
mostrarProductos(filtrados);
}
 
// Buscador
buscador.addEventListener("keyup", () => {
 
const texto = buscador.value.toLowerCase();
 
const filtrados = productos.filter(producto =>
 
producto.nombre.toLowerCase().includes(texto) ||
producto.categoria.toLowerCase().includes(texto) ||
producto.descripcion.toLowerCase().includes(texto)
 
);
 
mostrarProductos(filtrados);
 
});
