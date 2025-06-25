


document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleDarkMode');

  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
  }

  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
});



let hospedes = 1;
let quartos = 1;
let criancas = 0;

function toggleDropdown() {
  document.getElementById("dropdownBox").classList.toggle("active");
}

function update(type, value) {
  if (type === "hospedes") {
    hospedes = Math.max(1, hospedes + value);
    document.getElementById("hospedesCount").innerText = hospedes;
  } else if (type === "quartos") {
    quartos = Math.max(1, quartos + value);
    document.getElementById("quartosCount").innerText = quartos;
  } else if (type === "criancas") {
    criancas = Math.max(0, criancas + value);
    document.getElementById("criancasCount").innerText = criancas;
  }
}

function aplicarSelecao() {
  const label = `${hospedes} ${hospedes === 1 ? "adulto" : "adulto"}${
    criancas > 0 ? `, ${criancas} criança${criancas > 1 ? "s" : ""}` : ""
  } · ${quartos} ${quartos === 1 ? "quarto" : "quartos"}`;
  document.getElementById("dropdownToggle").innerText = label;
  document.getElementById("dropdownBox").classList.remove("active");
}

function limparCampos() {
  hospedes = 1;
  criancas = 0;
  quartos = 1;
  document.getElementById("hospedesCount").innerText = hospedes;
  document.getElementById("criancasCount").innerText = criancas;
  document.getElementById("quartosCount").innerText = quartos;
  aplicarSelecao();
}

function handleSubmit(event) {
  event.preventDefault();
  const destino = document.getElementById("destino").value;
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;

  alert(
    `Destino: ${destino}\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nHóspedes: ${hospedes}\nCrianças: ${criancas}\nQuartos: ${quartos}`
  );
}

document.addEventListener("click", function (e) {
  const box = document.getElementById("dropdownBox");
  const toggle = document.getElementById("dropdownToggle");
  if (!box.contains(e.target) && !toggle.contains(e.target)) {
    box.classList.remove("active");
  }
});


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}


function toggleSenha(idCampo, icone){
  const campoSenha = document.getElementById(idCampo);

  if (campoSenha.type === "password") {
    campoSenha.type = "text"; // Mostra a senha
    icone.classList.remove('fa-eye');
    icone.classList.add('fa-eye-slash'); // Muda para olho cortado
  } else {
    campoSenha.type = "password"; // Oculta a senha
    icone.classList.remove('fa-eye-slash');
    icone.classList.add('fa-eye'); // Muda para olho normal
  }
}



