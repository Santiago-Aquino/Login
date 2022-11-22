const inputUser = document.getElementById('user'),
    inputPass = document.getElementById('pass'),
    button = document.getElementById('button'),
    recordar = document.getElementById('recordar'),
    formulario = document.querySelector('.formulario'),
    container = document.getElementById('container');

const usuariosDB = [{
    name: 'santiagoaquino',
    pass: '123abc',
},
{
    name: 'lucasaquino',
    pass: '123'
},
{
    name: 'benjaminaquino',
    pass: 'abc'
}
]

function guardarDatos(usuario) {
    let parce = JSON.stringify(usuario);
    if(recordar.checked){
        localStorage.setItem('usuario', parce);
    } else{
        localStorage.clear();
    }
}

function mostrarDatos(usuario) {
    formulario.classList.add('borrar');
    container.innerHTML = '';
    container.innerHTML = `<div class="contenedor">
                                <h1 class="tituloAfter">Bienvenido/a ${usuario.name}</h1>
                                <div class="card m-2" style="width: 18rem;">
                                    <img src="./img/Kaka.jpg" class="card-img-top" alt="Imagen de jugador Kaka">
                                    <div class="card-body">
                                        <p class="card-text">Este jugador historico llamado Kaka se destaco por su forma de juego que impacto al mundo.</p>
                                    </div>
                                </div>
                                <button class="buttonAfter"> Atras</button>    
                            </div>`;
    buttonAfter = document.querySelector('.buttonAfter');
    buttonAfter.addEventListener(('click'), () => {
        container.innerHTML = '';
        container.innerHTML = `<form class="formulario">
                                    <h1 id="titulo">Login</h1>
                                    <div id="label">
                                        <label for="usuario">
                                            <i class="fa-solid fa-user"></i>
                                            <input type="text" name="usuario" id="user" placeholder="usuario">
                                        </label>
                                        <label for="contrasenia">
                                            <i class="fa-solid fa-lock"></i>
                                            <input type="password" name="contrasenia" id="pass" placeholder="password">
                                        </label>
                                    </div>
                                    <div id="confirmacion">
                                        <div id="contenedorRecordar">
                                            <input type="checkbox" id="recordar">
                                            <label for="recordar">Recordarme</label>
                                        </div>
                                        <button id="button">Ingresar</button>
                                    </div>
                                </form>`;
    })
}

function validarUsuario(usuario, password) {
    let objUser = usuariosDB.find((el) => el.name == usuario);
    if (typeof objUser == 'undefined') {
        return false;
    } else
        if (objUser.pass != password) {
            return false;
        } else {
            return objUser;
        }
}

button.addEventListener(('click'), (e) => {
    e.preventDefault();
    if (!inputUser.value || !inputPass.value) {
        Swal.fire({
            title: 'Error',
            text: 'Ingrese todos los datos',
            icon: 'error',
            timer: 4000,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#ce1d61'
        })
    } else {
        let dato = validarUsuario(inputUser.value, inputPass.value);

        if (!dato) {
            Swal.fire({
                title: 'Error',
                text: 'El usuario o la password son incorrectas',
                icon: 'error',
                timer: 4000,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#ce1d61'
            })
        } else {
            Swal.fire({
                title: `Bienvenido/a ${dato.name}`,
                icon: 'succes',
                timer: 4000,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#ce1d61'
            })
            mostrarDatos(dato);
            guardarDatos(dato);
        }
    }
})