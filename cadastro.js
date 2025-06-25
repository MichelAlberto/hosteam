// Funções para feedback de campo (div/span)
function showFieldFeedback(fieldId, message, type = 'error') {
    // Agora o fieldId é o ID real do input (ex: 'data_nasc', 'tel_celular')
    const errorSpan = document.getElementById(fieldId + '-error'); // Busca o span com ID 'data_nasc-error', etc.
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.add('show');
        errorSpan.style.display = 'block';
        errorSpan.style.color = (type === 'error') ? '#dc3545' : '#28a745';
    }
}

function hideFieldFeedback(fieldId) {
    const errorSpan = document.getElementById(fieldId + '-error');
    if (errorSpan) {
        errorSpan.textContent = '';
        errorSpan.classList.remove('show');
        errorSpan.style.display = 'none';
    }
}

// Funções para feedback geral do formulário (div)
function showFormFeedback(message, type = 'error') {
    const formFeedback = document.getElementById('form-feedback');
    if (formFeedback) {
        formFeedback.textContent = message;
        formFeedback.classList.remove('success', 'error');
        formFeedback.classList.add(type, 'show');
        formFeedback.style.display = 'block';
    }
}

function hideFormFeedback() {
    const formFeedback = document.getElementById('form-feedback');
    if (formFeedback) {
        formFeedback.textContent = '';
        formFeedback.classList.remove('success', 'error', 'show');
        formFeedback.style.display = 'none';
    }
}

// Função para exibir Toast
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast-message');
    toast.textContent = message;

    toast.classList.remove('success', 'error', 'info');
    toast.classList.add(type);

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Função para mostrar/ocultar senha
function toggleSenha(idCampo, icone){
    const campoSenha = document.getElementById(idCampo);

    if (campoSenha.type === "password") {
        campoSenha.type = "text";
        icone.classList.remove('fa-eye');
        icone.classList.add('fa-eye-slash');
    } else {
        campoSenha.type = "password";
        icone.classList.remove('fa-eye-slash');
        icone.classList.add('fa-eye');
    }
}

// --- Funções de Validação Específicas por Campo ---
function validateNomeCompleto() {
    const nomeCompleto = document.getElementById('nomeCompleto');
    if (nomeCompleto.value.trim().length < 15 || nomeCompleto.value.trim().length > 80) {
        showFieldFeedback('nomeCompleto', 'O nome deve ter entre 15 e 80 caracteres.');
        return false;
    } else {
        hideFieldFeedback('nomeCompleto');
        return true;
    }
}

function validateDataNascimento() {
    const dataNascimentoField = document.getElementById('data_nasc'); // ID do input é 'data_nasc'
    let dataCompleta = dataNascimentoField.value.trim(); // Pega o valor com a máscara (ex: "15/01/1990")

    if (!dataCompleta) {
        showFieldFeedback('data_nasc', 'Por favor, insira sua data de nascimento.'); // Passa o ID 'data_nasc'
        return false;
    }

    const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dataCompleta.match(regexData);

    if (!match) {
        showFieldFeedback('data_nasc', 'Formato de data inválido. Use DD/MM/AAAA.'); // Passa o ID 'data_nasc'
        return false;
    }

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10) - 1; // Mês é base 0 no JavaScript (0=Jan, 11=Dez)
    const ano = parseInt(match[3], 10);

    const dataObj = new Date(ano, mes, dia);

    if (dataObj.getFullYear() !== ano || dataObj.getMonth() !== mes || dataObj.getDate() !== dia) {
        showFieldFeedback('data_nasc', 'Data inválida. Verifique o dia e o mês.'); // Passa o ID 'data_nasc'
        return false;
    }

    const hoje = new Date();
    const idadeMinima = 18;
    const dataLimite = new Date(hoje.getFullYear() - idadeMinima, hoje.getMonth(), hoje.getDate());

    if (dataObj > dataLimite) {
        showFieldFeedback('data_nasc', 'Você deve ter pelo menos ' + idadeMinima + ' anos para se cadastrar.'); // Passa o ID 'data_nasc'
        return false;
    }

    hideFieldFeedback('data_nasc'); // Passa o ID 'data_nasc'
    return true;
}

function validateSexo() {
    const sexo = document.getElementById('sexo');
    if (sexo.value === '' || sexo.value === 'Sexo') { // Adicionado 'Sexo' caso seja o valor default da opção
        showFieldFeedback('sexo', 'Por favor, selecione seu sexo.');
        return false;
    } else {
        hideFieldFeedback('sexo');
        return true;
    }
}

function validateNomeMaterno() {
    const nomeMaterno = document.getElementById('nomeMaterno');
    if (nomeMaterno.value.trim().length < 5) {
        showFieldFeedback('nomeMaterno', 'O nome materno deve ter pelo menos 5 caracteres.');
        return false;
    } else {
        hideFieldFeedback('nomeMaterno');
        return true;
    }
}

function validateCpf() {
    const cpfField = document.getElementById('cpf');
    let cpf = cpfField.value.trim().replace(/[^\d]+/g, '');

    if (cpf.length !== 11) {
        showFieldFeedback('cpf', 'CPF deve ter 11 dígitos.');
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        showFieldFeedback('cpf', 'CPF inválido (todos os dígitos são iguais).');
        return false;
    }

    // Validação de dígitos verificadores (Adicional, para CPF válido de verdade)
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
    remainder = (sum * 10) % 11;

    if ((remainder == 10) || (remainder == 11))  remainder = 0;
    if (remainder != parseInt(cpf.substring(9, 10)) ) {
        showFieldFeedback('cpf', 'CPF inválido.');
        return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
    remainder = (sum * 10) % 11;

    if ((remainder == 10) || (remainder == 11)) remainder = 0;
    if (remainder != parseInt(cpf.substring(10, 11) ) ) {
        showFieldFeedback('cpf', 'CPF inválido.');
        return false;
    }

    hideFieldFeedback('cpf');
    return true;
}

function validateEmail() {
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showFieldFeedback('email', 'Por favor, insira um e-mail válido.');
        return false;
    } else {
        hideFieldFeedback('email');
        return true;
    }
}

function validateTelefoneCelular() {
    const telefoneCelularField = document.getElementById('tel_celular');
    let telefoneLimpo = telefoneCelularField.value.trim().replace(/\D/g, '');

    // Com a máscara '+55 (00) 00000-0000', o telefoneLimpo terá 13 dígitos
    if (telefoneLimpo.length !== 13) {
        showFieldFeedback('tel_celular', 'Número de celular inválido. Formato esperado: +55 (DD) 9XXXX-XXXX.');
        return false;
    }
    hideFieldFeedback('tel_celular');
    return true;
}

function validateTelefoneFixo() {
    const telefoneFixoField = document.getElementById('tel_fixo');
    let telefoneFixo = telefoneFixoField.value.trim();
    const telefoneLimpo = telefoneFixo.replace(/\D/g, '');

    // Se o campo está vazio E não possui nenhum dígito (considerando a máscara inicial), é válido (campo opcional)
    if (telefoneLimpo === '') {
        hideFieldFeedback('tel_fixo');
        return true;
    }

    // Com a máscara '+55 (00) 0000-0000', o telefoneLimpo terá 12 dígitos
    if (telefoneLimpo.length !== 12) {
        showFieldFeedback('tel_fixo', 'Número de telefone fixo inválido. Formato esperado: +55 (DD) XXXX-XXXX.');
        return false;
    } else {
        hideFieldFeedback('tel_fixo');
        return true;
    }
}

// CONSOLIDANDO A LÓGICA DO VIACEP AQUI
async function buscarCep() {
    const cepField = document.getElementById('cep');
    const enderecoCompletoField = document.getElementById('enderecoCompleto');
    const ufField = document.getElementById('Uf');

    let cep = cepField.value.trim().replace(/\D/g, ''); // Pega o CEP limpo

    // Limpa os campos de endereço enquanto busca
    enderecoCompletoField.value = '';
    ufField.value = '';
    hideFieldFeedback('enderecoCompleto');
    hideFieldFeedback('Uf'); // Esconde erro anterior da UF

    if (cep.length !== 8) {
        showFieldFeedback('cep', 'CEP deve ter 8 dígitos.');
        return false;
    } else {
        hideFieldFeedback('cep');
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            showFieldFeedback('cep', 'CEP não encontrado.');
            return false;
        } else {
            // Preenche os campos se o CEP for encontrado
            enderecoCompletoField.value = data.logradouro || '';
            ufField.value = data.uf || '';
            // Dispara validação de endereço e UF imediatamente após preencher
            validateEnderecoCompleto();
            validateUf();
            hideFieldFeedback('cep'); // Garante que a mensagem de erro do CEP é escondida
            return true;
        }
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        showFieldFeedback('cep', 'Erro ao buscar CEP. Tente novamente.');
        return false;
    }
}

function validateUf() {
    const uf = document.getElementById('Uf');
    if (!/^[a-zA-Z]{2}$/.test(uf.value.trim())) {
        showFieldFeedback('Uf', 'UF inválida (Ex: SP).');
        return false;
    } else {
        hideFieldFeedback('Uf');
        return true;
    }
}

function validateEnderecoCompleto() {
    const enderecoCompleto = document.getElementById('enderecoCompleto');
    if (enderecoCompleto.value.trim().length < 5) {
        showFieldFeedback('enderecoCompleto', 'O endereço deve ter pelo menos 5 caracteres.');
        return false;
    } else {
        hideFieldFeedback('enderecoCompleto');
        return true;
    }
}

function validateNumero() {
    const numero = document.getElementById('numero');
    // Aceita apenas números ou a string vazia se for opcional, ou talvez 'S/N'
    // Se você quer apenas números, use /^\d+$/. Se aceita S/N, precisaria de uma regex mais complexa.
    // Considerando que é para número da casa, geralmente é numérico e obrigatório.
    if (!/^\d+$/.test(numero.value.trim()) || numero.value.trim().length === 0) {
        showFieldFeedback('numero', 'Por favor, insira um número válido (apenas dígitos).');
        return false;
    } else {
        hideFieldFeedback('numero');
        return true;
    }
}

function validateComplemento() {
    const complemento = document.getElementById('complemento');
    // Complemento geralmente é opcional, então apenas escondemos o feedback se houver.
    // Se você tiver uma regra específica, adicione aqui.
    hideFieldFeedback('complemento');
    return true;
}

function validateLogin() {
    const login = document.getElementById('login');
    if (!/^[a-zA-Z0-9]{5,20}$/.test(login.value.trim())) {
        showFieldFeedback('login', 'Login inválido (5-20 caracteres alfanuméricos).');
        return false;
    } else {
        hideFieldFeedback('login');
        return true;
    }
}

function validateSenha() {
    const senha = document.getElementById('senha');
    if (senha.value.length < 8 || senha.value.length > 12) {
        showFieldFeedback('senha', 'A senha deve ter entre 8 e 12 caracteres.');
        return false;
    } else {
        hideFieldFeedback('senha');
        return true;
    }
}

function validateConfirmarSenha() {
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha');
    if (confirmarSenha.value !== senha) {
        showFieldFeedback('confirmarSenha', 'As senhas não coincidem.');
        return false;
    } else {
        hideFieldFeedback('confirmarSenha');
        return true;
    }
}


// --- Lógica de Validação e Envio do Formulário ---
document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastroForm');

    // Adicionando listeners de 'blur' (ou 'change' para selects) para validação em tempo real
    document.getElementById('nomeCompleto').addEventListener('blur', validateNomeCompleto);
    document.getElementById('data_nasc').addEventListener('blur', validateDataNascimento);
    document.getElementById('sexo').addEventListener('change', validateSexo);
    document.getElementById('nomeMaterno').addEventListener('blur', validateNomeMaterno);
    document.getElementById('cpf').addEventListener('blur', validateCpf);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('tel_celular').addEventListener('blur', validateTelefoneCelular);
    document.getElementById('tel_fixo').addEventListener('blur', validateTelefoneFixo);     
    document.getElementById('cep').addEventListener('blur', buscarCep); // Chama buscarCep no blur do CEP
    document.getElementById('Uf').addEventListener('blur', validateUf);
    document.getElementById('enderecoCompleto').addEventListener('blur', validateEnderecoCompleto);
    document.getElementById('numero').addEventListener('blur', validateNumero);
    document.getElementById('complemento').addEventListener('blur', validateComplemento);
    document.getElementById('login').addEventListener('blur', validateLogin);
    document.getElementById('senha').addEventListener('blur', validateSenha);
    document.getElementById('confirmarSenha').addEventListener('blur', validateConfirmarSenha);


    cadastroForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        let formIsValid = true; // Começa como válido

        hideFormFeedback(); // Esconde o feedback geral
        document.querySelectorAll('.mensagem-error').forEach(span => {
            span.textContent = '';
            span.classList.remove('show');
            span.style.display = 'none';
        });

        // Executa todas as validações. A ordem é importante para 'formIsValid'
        // Use 'await' para funções assíncronas como 'buscarCep'
        formIsValid = validateNomeCompleto() && formIsValid;
        formIsValid = validateDataNascimento() && formIsValid;
        formIsValid = validateSexo() && formIsValid;
        formIsValid = validateNomeMaterno() && formIsValid;
        formIsValid = validateCpf() && formIsValid;
        formIsValid = validateEmail() && formIsValid;
        formIsValid = validateTelefoneCelular() && formIsValid;
        formIsValid = validateTelefoneFixo() && formIsValid;

        // A validação do CEP é assíncrona, então espere por ela.
        // Se ela falhar, `formIsValid` se tornará false.
        const cepValidoEEncontrado = await buscarCep();
        formIsValid = cepValidoEEncontrado && formIsValid;

        formIsValid = validateUf() && formIsValid;
        formIsValid = validateEnderecoCompleto() && formIsValid;
        formIsValid = validateNumero() && formIsValid;
        formIsValid = validateComplemento() && formIsValid;
        formIsValid = validateLogin() && formIsValid;
        formIsValid = validateSenha() && formIsValid;
        formIsValid = validateConfirmarSenha() && formIsValid;


        if (formIsValid) {
            showToast('Cadastro realizado com sucesso!', 'success');
            showFormFeedback('Seu cadastro foi enviado com sucesso!', 'success');
            // Após o sucesso, você pode querer redirecionar ou limpar o formulário.
            // cadastroForm.reset(); // Pode ser feito aqui se desejar
        } else {
            showToast('Por favor, corrija os erros no formulário.', 'error');
            showFormFeedback('Houve erros no preenchimento. Verifique os campos em vermelho.', 'error');
        }
    });

    window.limparFormulario = function() {
        cadastroForm.reset();
        // A máscara do IMask.js persistirá após o reset, o que é bom.
        // A limpeza dos spans de erro já é tratada abaixo.
        document.querySelectorAll('.mensagem-error').forEach(span => {
            span.textContent = '';
            span.classList.remove('show');
            span.style.display = 'none';
        });
        hideFormFeedback();
        showToast('');
    };
});
  // Funções para feedback de campo (div/span)
function showFieldFeedback(fieldId, message, type = 'error') {
    const errorSpan = document.getElementById(fieldId + '-error');
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.add('show');
        errorSpan.style.display = 'block';
        errorSpan.style.color = (type === 'error') ? '#dc3545' : '#28a745';
    }
}

function hideFieldFeedback(fieldId) {
    const errorSpan = document.getElementById(fieldId + '-error');
    if (errorSpan) {
        errorSpan.textContent = '';
        errorSpan.classList.remove('show');
        errorSpan.style.display = 'none';
    }
}

// Funções para feedback geral do formulário (div)
function showFormFeedback(message, type = 'error') {
    const formFeedback = document.getElementById('form-feedback');
    if (formFeedback) {
        formFeedback.textContent = message;
        formFeedback.classList.remove('success', 'error');
        formFeedback.classList.add(type, 'show');
        formFeedback.style.display = 'block';
    }
}

function hideFormFeedback() {
    const formFeedback = document.getElementById('form-feedback');
    if (formFeedback) {
        formFeedback.textContent = '';
        formFeedback.classList.remove('success', 'error', 'show');
        formFeedback.style.display = 'none';
    }
}

// Função para exibir Toast
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast-message');
    toast.textContent = message;

    toast.classList.remove('success', 'error', 'info');
    toast.classList.add(type);

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Função para mostrar/ocultar senha
function toggleSenha(idCampo, icone){
    const campoSenha = document.getElementById(idCampo);

    if (campoSenha.type === "password") {
        campoSenha.type = "text";
        icone.classList.remove('fa-eye');
        icone.classList.add('fa-eye-slash');
    } else {
        campoSenha.type = "password";
        icone.classList.remove('fa-eye-slash');
        icone.classList.add('fa-eye');
    }
}

// --- Funções de Validação Específicas por Campo ---
function validateNomeCompleto() {
    const nomeCompleto = document.getElementById('nomeCompleto');
    if (nomeCompleto.value.trim().length < 15 || nomeCompleto.value.trim().length > 80) {
        showFieldFeedback('nomeCompleto', 'O nome deve ter entre 15 e 80 caracteres.');
        return false;
    } else {
        hideFieldFeedback('nomeCompleto');
        return true;
    }
}

function validateDataNascimento() {
    const dataNascimentoField = document.getElementById('data_nasc'); // ID do input é 'data_nasc'
    const dataString = dataNascimentoField.value; // O valor será no formato "YYYY-MM-DD" se preenchido

    if (!dataString) { // Verifica se o campo está vazio
        showFieldFeedback('data_nasc', 'Por favor, selecione sua data de nascimento.'); // Passa o ID 'data_nasc'
        return false;
    }

    // Opcional: Adicionar validação de idade mínima, por exemplo (maior de 18 anos)
    const dataNasc = new Date(dataString + 'T00:00:00'); // Cria um objeto Date a partir da string YYYY-MM-DD
    const hoje = new Date();
    const idadeMinima = 18;
    const dataLimite = new Date(hoje.getFullYear() - idadeMinima, hoje.getMonth(), hoje.getDate());

    if (dataNasc > dataLimite) { // Se a data de nascimento for depois da data limite, a pessoa é muito jovem
        showFieldFeedback('data_nasc', 'Você deve ter pelo menos ' + idadeMinima + ' anos para se cadastrar.'); // Passa o ID 'data_nasc'
        return false;
    }
    // O navegador já garante que o ano terá 4 dígitos para input type="date"
    hideFieldFeedback('data_nasc');
    return true;
}

function validateSexo() {
    const sexo = document.getElementById('sexo');
    if (sexo.value === '' || sexo.value === 'Sexo') { // Adicionado 'Sexo' caso seja o valor default da opção
        showFieldFeedback('sexo', 'Por favor, selecione seu sexo.');
        return false;
    } else {
        hideFieldFeedback('sexo');
        return true;
    }
}

function validateNomeMaterno() {
    const nomeMaterno = document.getElementById('nomeMaterno');
    if (nomeMaterno.value.trim().length < 5) {
        showFieldFeedback('nomeMaterno', 'O nome materno deve ter pelo menos 5 caracteres.');
        return false;
    } else {
        hideFieldFeedback('nomeMaterno');
        return true;
    }
}

function validateCpf() {
    const cpfField = document.getElementById('cpf');
    let cpf = cpfField.value.trim().replace(/[^\d]+/g, '');

    if (cpf.length !== 11) {
        showFieldFeedback('cpf', 'CPF deve ter 11 dígitos.');
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        showFieldFeedback('cpf', 'CPF inválido (todos os dígitos são iguais).');
        return false;
    }

    hideFieldFeedback('cpf');
    return true;
}

function validateEmail() {
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showFieldFeedback('email', 'Por favor, insira um e-mail válido.');
        return false;
    } else {
        hideFieldFeedback('email');
        return true;
    }
}

function validateTelefoneCelular() {
    const telefoneCelularField = document.getElementById('tel_celular');
    let telefoneLimpo = telefoneCelularField.value.trim().replace(/\D/g, '');

    // Com a máscara '+55 (00) 00000-0000', o telefoneLimpo terá 13 dígitos
    if (telefoneLimpo.length !== 13) {
        showFieldFeedback('tel_celular', 'Número de celular inválido. Formato esperado: +55 (DD) 9XXXX-XXXX.');
        return false;
    }
    hideFieldFeedback('tel_celular');
    return true;
}

function validateTelefoneFixo() {
    const telefoneFixoField = document.getElementById('tel_fixo');
    let telefoneFixo = telefoneFixoField.value.trim();
    const telefoneLimpo = telefoneFixo.replace(/\D/g, '');

    // Se o campo está vazio (ou apenas com a máscara '+55 () ') é válido (campo opcional)
    // A condição de vazio deve ser cuidadosa para não falhar se a pessoa só digitou o '+55 ()'
    if (telefoneLimpo.length === 0 || telefoneLimpo === '55') { // Permite vazio ou apenas o DDI
        hideFieldFeedback('tel_fixo');
        return true;
    }

    // Com a máscara '+55 (00) 0000-0000', o telefoneLimpo terá 12 dígitos
    if (telefoneLimpo.length !== 12) {
        showFieldFeedback('tel_fixo', 'Número de telefone fixo inválido. Formato esperado: +55 (DD) XXXX-XXXX.');
        return false;
    } else {
        hideFieldFeedback('tel_fixo');
        return true;
    }
}

// CONSOLIDANDO A LÓGICA DO VIACEP AQUI
async function buscarCep() {
    const cepField = document.getElementById('cep');
    const enderecoCompletoField = document.getElementById('enderecoCompleto');
    const ufField = document.getElementById('Uf');

    let cep = cepField.value.trim().replace(/\D/g, ''); // Pega o CEP limpo

    // Limpa os campos de endereço enquanto busca
    enderecoCompletoField.value = '';
    ufField.value = '';
    hideFieldFeedback('enderecoCompleto');
    hideFieldFeedback('Uf'); // Esconde erro anterior da UF

    if (cep.length !== 8) {
        showFieldFeedback('cep', 'CEP deve ter 8 dígitos.');
        return false;
    } else {
        hideFieldFeedback('cep');
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            showFieldFeedback('cep', 'CEP não encontrado.');
            return false;
        } else {
            // Preenche os campos se o CEP for encontrado
            enderecoCompletoField.value = data.logradouro || '';
            ufField.value = data.uf || '';
            // Dispara validação de endereço e UF imediatamente após preencher
            validateEnderecoCompleto();
            validateUf();
            hideFieldFeedback('cep'); // Garante que a mensagem de erro do CEP é escondida
            return true;
        }
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        showFieldFeedback('cep', 'Erro ao buscar CEP. Tente novamente.');
        return false;
    }
}

function validateUf() {
    const uf = document.getElementById('Uf');
    if (!/^[a-zA-Z]{2}$/.test(uf.value.trim())) {
        showFieldFeedback('Uf', 'UF inválida (Ex: RJ).');
        return false;
    } else {
        hideFieldFeedback('Uf');
        return true;
    }
}

function validateEnderecoCompleto() {
    const enderecoCompleto = document.getElementById('enderecoCompleto');
    if (enderecoCompleto.value.trim().length < 5) {
        showFieldFeedback('enderecoCompleto', 'O endereço deve ter pelo menos 5 caracteres.');
        return false;
    } else {
        hideFieldFeedback('enderecoCompleto');
        return true;
    }
}

function validateNumero() {
    const numero = document.getElementById('numero');
    // Aceita apenas números
    if (!/^\d+$/.test(numero.value.trim()) || numero.value.trim().length === 0) {
        showFieldFeedback('numero', 'Por favor, insira um número válido (apenas dígitos).');
        return false;
    } else {
        hideFieldFeedback('numero');
        return true;
    }
}

function validateComplemento() {
    const complemento = document.getElementById('complemento');
    // Complemento é geralmente opcional. Se for vazio, é válido.
    // Se você tiver uma regra específica (ex: máximo de caracteres), adicione aqui.
    hideFieldFeedback('complemento'); // Sempre esconde se a função for chamada
    return true; // Sempre retorna true, a menos que adicione uma regra de obrigatoriedade
}


function validateLogin() {
    const login = document.getElementById('login');
    if (!/^[a-zA-Z0-9]{5,20}$/.test(login.value.trim())) {
        showFieldFeedback('login', 'Login inválido (5-20 caracteres alfanuméricos).');
        return false;
    } else {
        hideFieldFeedback('login');
        return true;
    }
}

function validateSenha() {
    const senha = document.getElementById('senha');
    if (senha.value.length < 8 || senha.value.length > 12) {
        showFieldFeedback('senha', 'A senha deve ter entre 8 e 12 caracteres.');
        return false;
    } else {
        hideFieldFeedback('senha');
        return true;
    }
}

function validateConfirmarSenha() {
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha');
    if (confirmarSenha.value !== senha) {
        showFieldFeedback('confirmarSenha', 'As senhas não coincidem.');
        return false;
    } else {
        hideFieldFeedback('confirmarSenha');
        return true;
    }
}


// --- Lógica de Validação e Envio do Formulário ---
document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastroForm');

    // Adicionando listeners de 'blur' (ou 'change' para selects) para validação em tempo real
    document.getElementById('nomeCompleto').addEventListener('blur', validateNomeCompleto);
    document.getElementById('data_nasc').addEventListener('blur', validateDataNascimento);
    document.getElementById('sexo').addEventListener('change', validateSexo);
    document.getElementById('nomeMaterno').addEventListener('blur', validateNomeMaterno);
    document.getElementById('cpf').addEventListener('blur', validateCpf);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('tel_celular').addEventListener('blur', validateTelefoneCelular);
    document.getElementById('tel_fixo').addEventListener('blur', validateTelefoneFixo);     
    document.getElementById('cep').addEventListener('blur', buscarCep); // Chama buscarCep no blur do CEP
    document.getElementById('Uf').addEventListener('blur', validateUf);
    document.getElementById('enderecoCompleto').addEventListener('blur', validateEnderecoCompleto);
    document.getElementById('numero').addEventListener('blur', validateNumero);
    document.getElementById('complemento').addEventListener('blur', validateComplemento);
    document.getElementById('login').addEventListener('blur', validateLogin);
    document.getElementById('senha').addEventListener('blur', validateSenha);
    document.getElementById('confirmarSenha').addEventListener('blur', validateConfirmarSenha);


    cadastroForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        let formIsValid = true; // Começa como válido

        hideFormFeedback(); // Esconde o feedback geral
        document.querySelectorAll('.mensagem-error').forEach(span => {
            span.textContent = '';
            span.classList.remove('show');
            span.style.display = 'none';
        });

        // Executa todas as validações. A ordem é importante para 'formIsValid'
        // Use 'await' para funções assíncronas como 'buscarCep'
        formIsValid = validateNomeCompleto() && formIsValid;
        formIsValid = validateDataNascimento() && formIsValid;
        formIsValid = validateSexo() && formIsValid;
        formIsValid = validateNomeMaterno() && formIsValid;
        formIsValid = validateCpf() && formIsValid;
        formIsValid = validateEmail() && formIsValid;
        formIsValid = validateTelefoneCelular() && formIsValid;
        formIsValid = validateTelefoneFixo() && formIsValid;

        // A validação do CEP é assíncrona, então espere por ela.
        // Se ela falhar, `formIsValid` se tornará false.
        const cepValidoEEncontrado = await buscarCep();
        formIsValid = cepValidoEEncontrado && formIsValid;

        formIsValid = validateUf() && formIsValid;
        formIsValid = validateEnderecoCompleto() && formIsValid;
        formIsValid = validateNumero() && formIsValid;
        formIsValid = validateComplemento() && formIsValid;
        formIsValid = validateLogin() && formIsValid;
        formIsValid = validateSenha() && formIsValid;
        formIsValid = validateConfirmarSenha() && formIsValid;


        if (formIsValid) {
            showToast('Cadastro realizado com sucesso!', 'success');
            showFormFeedback('Seu cadastro foi enviado com sucesso!', 'success');
            
            
            cadastroForm.reset(); // Limpa todos os campos do formulário

            // Opcional: Se você quiser redirecionar o usuário após a limpeza e um pequeno delay:
            // setTimeout(() => {
            //     window.location.href = "login.html"; // Redireciona para a página de login
            // }, 2000); // Redireciona após 2 segundos
            
        } else {
            showToast('Por favor, corrija os erros no formulário.', 'error');
            showFormFeedback('Houve erros no preenchimento. Verifique os campos em vermelho.', 'error');
        }
    });

    window.limparFormulario = function() {
        cadastroForm.reset();
        // A máscara do IMask.js persistirá após o reset, o que é bom.
        // A limpeza dos spans de erro já é tratada abaixo.
        document.querySelectorAll('.mensagem-error').forEach(span => {
            span.textContent = '';
            span.classList.remove('show');
            span.style.display = 'none';
        });
        hideFormFeedback();
        showToast('');
    };
});
  