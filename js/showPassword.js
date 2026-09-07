console.log("Arquivo showPassword.js foi carregado com sucesso!");

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-password');
    const inputSenha = document.getElementById('password');

    console.log("Elemento do olho encontrado:", toggleBtn);
    console.log("Elemento do input encontrado:", inputSenha);

    if (!toggleBtn) {
        alert("ERRO: O elemento com id='toggle-password' não foi encontrado no HTML!");
        return;
    }

    if (!inputSenha) {
        alert("ERRO: O input com id='password' não foi encontrado no HTML!");
        return;
    }

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (inputSenha.type === 'password') {
            inputSenha.type = 'text';
            toggleBtn.className = 'fa-solid fa-eye-slash';
        } else {
            inputSenha.type = 'password';
            toggleBtn.className = 'fa-solid fa-eye';
        }
    });
});