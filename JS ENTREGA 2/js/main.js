const frutasyverduras = document.getElementById('frutasyverduras')
const carrito = document.getElementById('carrito')
const Carrito = JSON.parse(localStorage.getItem("carrito")) || []

const FrutasYVerduras = [
    {
        imagen:"https://mercadocentral.gob.ar/sites/default/files/images/palta.jpg",
        titulo: " - Paltas",
        precio: 700,
    },
    {
        imagen: "https://elpoderdelconsumidor.org/wp-content/uploads/2022/02/naranja-1.jpg",
        titulo: " - Naranjas", 
        precio: 550,
    },
    {
        imagen: "https://okdiario.com/img/2021/12/12/drahomir-posteby-mach-9jl9wk9juue-unsplash11.jpg",
        titulo: " - Manzanas", 
        precio: 520,
    }, 
    {
        imagen: "https://cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/TVKXPVGS7JJY7C5D76DLOLCHU4.jpg",
        titulo: " - Cebollas", 
        precio: 400,
    },
    {
        imagen: "https://i.blogs.es/e04f29/zanahorias-2/450_1000.jpg",
        titulo: " - Zanahorias", 
        precio: 375,
    },
    {
        imagen: "https://www.revistainternos.com.ar/v2/wp-content/uploads/2021/05/InterNos-Maqueta-Foto-Portada-Notas-tomates.jpg",
        titulo: " - Tomates", 
        precio: 425,
    }
];


const restaAlCarrito = (titulo) => {
    const frutasyverduras = Carrito.find(el => { 
          return el.titulo === titulo
    })
    if(frutasyverduras.cantidad <= 0){
        let arrayDetitulos = Carrito.map(el =>{
            return el.titulo
        })
        let index = arrayDetitulos.indexOf(titulo)
        Carrito.splice(index, 1)
    }else{
        frutasyverduras.cantidad -= 1
    }

     refreshcarrito()
}

const sumaAlCarrito = (titulo) => {
    const frutasyverduras = Carrito.find(el => { 
          return el.titulo === titulo
    })
    frutasyverduras.cantidad += 1

     refreshcarrito() 
}

const createBoxCarrito = (titulo, precio, cantidad) => {
    const contenedor = document.createElement ("div")
    const tituloDOM = document.createElement ("h3")
    const precioDOM = document.createElement ( "p")
    const contenedorCantidad = document.createElement ( "div")
    const cantidadDOM = document.createElement ( "p") 
    const botonADD =  document.createElement ( "button") 
    const botonOUT =  document.createElement ( "button") 


    contenedor.classList.add("contenedor")
    tituloDOM.classList.add("titulo")
    precioDOM.classList.add("precio")
    cantidadDOM.classList.add("cantidad")

    tituloDOM.innerText = titulo
    precioDOM.innerText = precio
    cantidadDOM.innerText = cantidad

    botonADD.innerText = "+"
    botonOUT.innerText = "-"

    botonADD.addEventListener("click", () => {
        sumaAlCarrito (titulo)
    })

    botonOUT.addEventListener("click", () => {
        restaAlCarrito (titulo)
    })


    contenedorCantidad.appendChild(botonOUT)
    contenedorCantidad.appendChild(cantidadDOM)
    contenedorCantidad.appendChild(botonADD)

    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(contenedorCantidad)

    return contenedor
    

}


const refreshcarrito = () => { 
    carrito.innerText = ""

    const totalDOM = document.createElement("h3")

    const total = Carrito.reduce((acc, el) =>{
        return acc + el.cantidad * el.precio
    },0)

    totalDOM.innerText = total

    Carrito.forEach(el =>{
        carrito.appendChild(createBoxCarrito(el.titulo, el.precio, el.cantidad))
        carrito.appendChild(totalDOM)
    })
    localStorage.setItem("carrito", JSON.stringify(Carrito))
}

const agregadorAlCarrito = (titulo, precio) => {
    const booleano = Carrito.some(el =>{
        return el.titulo === titulo
    })

    if(booleano){
        const frutasyverduras = Carrito.find(el => { 
            return el.titulo === titulo
        })
        frutasyverduras.cantidad += 1
    }else{
        Carrito.push({
            titulo,
            precio,
            cantidad: 1
    })
    }
        refreshcarrito() 
}


const box = (titulo, imagen, precio) => {
    const contenedor = document.createElement ("div")
    const tituloDOM = document.createElement ("h3")
    const imagenDOM = document.createElement ("img")
    const precioDOM = document.createElement ( "p")
    const botonDOM = document.createElement ("button")

    contenedor.classList.add("contenedor")
    tituloDOM.classList.add("titulo")
    imagenDOM.classList.add("imagen")
    precioDOM.classList.add("precio")
    botonDOM.classList.add("boton")

    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    botonDOM.innerText = "añadir"

    imagenDOM.src = imagen

    botonDOM.addEventListener("click",()=>{
        agregadorAlCarrito(titulo, precio)
    })


    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(imagenDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(botonDOM)

    return contenedor
}


    FrutasYVerduras.forEach(el => {
        const productosDOM = box(el.titulo, el.imagen, el.precio )

        frutasyverduras.appendChild(productosDOM)
    })

    document.addEventListener("DOMContentLoaded",() =>{
        refreshcarrito()
    })