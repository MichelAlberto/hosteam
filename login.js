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