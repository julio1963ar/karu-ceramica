const productosDiv = document.getElementById("productos");
const buscador = document.getElementById("buscador");
const categoriasDiv = document.getElementById("categorias");
 
let productos = [];
 
fetch("catalogo.csv")
.then(res => res.text())
.then(data => {
 
const filas = data.trim().split("\n");
 
filas.shift();
 
productos = filas.map(fila => {
 
const d = fila.split(";");
 
return {
id: d[0],
nombre: d[1],
categoria: d[2],
precio: d[3],
imagen: d[4],
descripcion: d[5],
stock: d[6]
};
 
});
 
crearFiltros();
mostrarProductos(productos);
 
});
 
function mostrarProductos(lista){
 
productosDiv.innerHTML = "";
 
lista.forEach(prod => {
 
productosDiv.innerHTML += `
<div class="card">
 
${prod.imagen}
 
<div class="info">
 
<h3>${prod.nombre}</h3>
 
<p class="categoria">${prod.categoria}</p>
 
<p class="precio">$ ${prod.precio}</p>
 
<p>${prod.descripcion}</p>
 
<p class="stock">
Stock: ${prod.stock}
</p>
 
">
 
Consultar por WhatsApp
 
</a>
 
</div>
 
</div>
`;
});
 
}
 
function crearFiltros(){
 
const categorias = [...new Set(productos.map(p => p.categoria))];
 
categoriasDiv.innerHTML =
'<button class="filtro" onclick="mostrarProductos(productos)">Todos</button>';
 
categorias.forEach(cat => {
 
categoriasDiv.innerHTML += `
<button class="filtro"
onclick="filtrarCategoria('${cat}')">
${cat}
</button>
`;
});
 
}
 
function filtrarCategoria(cat){
 
const filtrados =
productos.filter(p => p.categoria === cat);
 
mostrarProductos(filtrados);
 
}
 
buscador.addEventListener("keyup", () => {
 
const texto = buscador.value.toLowerCase();
 
const filtrados = productos.filter(p =>
p.nombre.toLowerCase().includes(texto) ||
p.categoria.toLowerCase().includes(texto) ||
p.descripcion.toLowerCase().includes(texto)
);
 
mostrarProductos(filtrados);
 
});
