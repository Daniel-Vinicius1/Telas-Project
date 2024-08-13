
function togglePage(event, page) {
    event.preventDefault();

   
    document.querySelectorAll('.page').forEach((el) => {
        el.classList.remove('active');
    });

   
    document.getElementById(page).classList.add('active');
}


function togglePasswordVisibility(fieldId) {
    var field = document.getElementById(fieldId);
    var icon = field.nextElementSibling;

    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}


document.querySelector('.form-recuperar-senha').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.querySelector('#email').value;

    fetch('/recuperar-senha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Erro:', error));
});

document.querySelector('.form-resetar-senha').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.querySelector('#new-password').value;
    const token = new URLSearchParams(window.location.search).get('token');

    fetch(`/resetar-senha/${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: password })
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Erro:', error));
});

document.querySelector('.form-cadastro').addEventListener('submit', function(event) {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    var errorMessage = document.getElementById('confirm-password-error');

    if (password !== confirmPassword) {
        event.preventDefault();
        errorMessage.textContent = 'As senhas não coincidem.';
        errorMessage.style.display = 'block';
        document.getElementById('confirm').classList.add('error');
    } else {
        errorMessage.style.display = 'none';
        document.getElementById('confirm').classList.remove('error');
    }
});


document.querySelector('.form-login').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email-login').value;
    var password = document.getElementById('password-login').value;
    var errorMessage = document.getElementById('login-error');

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
         
            window.location.href = '/principal';
        } else {
            errorMessage.textContent = 'Email ou senha incorretos.';
            errorMessage.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    
    const formRecuperarSenha = document.getElementById('form-recuperar-senha');
    if (formRecuperarSenha) {
        formRecuperarSenha.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email-recuperar').value;

            fetch('/recuperar-senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            .then(response => response.json())
            .then(data => {
                const mensagem = document.getElementById('mensagem-recuperar-senha');
                if (data.success) {
                    mensagem.style.color = 'green';
                    mensagem.textContent = 'Email de redefinição de senha enviado com sucesso.';
                } else {
                    mensagem.style.color = 'red';
                    mensagem.textContent = data.message;
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
        });
    }

    
    const formRedefinirSenha = document.getElementById('form-redefinir-senha');
    if (formRedefinirSenha) {
        formRedefinirSenha.addEventListener('submit', function(event) {
            event.preventDefault();

            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');
            const newPassword = document.getElementById('nova-senha').value;

            fetch('/redefinir-senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, newPassword })
            })
            .then(response => response.json())
            .then(data => {
                const mensagem = document.getElementById('mensagem-redefinir-senha');
                if (data.success) {
                    mensagem.style.color = 'green';
                    mensagem.textContent = 'Senha redefinida com sucesso.';
                } else {
                    mensagem.style.color = 'red';
                    mensagem.textContent = data.message;
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
        });
    }

   
    const togglePasswordVisibility = (toggleButton, passwordField) => {
        toggleButton.addEventListener('click', () => {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            toggleButton.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
        });
    };

    const passwordField = document.getElementById('senha');
    const togglePasswordButton = document.getElementById('toggle-password');
    if (passwordField && togglePasswordButton) {
        togglePasswordVisibility(togglePasswordButton, passwordField);
    }

    const confirmPasswordField = document.getElementById('confirmar-senha');
    const toggleConfirmPasswordButton = document.getElementById('toggle-confirm-password');
    if (confirmPasswordField && toggleConfirmPasswordButton) {
        togglePasswordVisibility(toggleConfirmPasswordButton, confirmPasswordField);
    }

    
    const verificarSenhasCoincidem = () => {
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;
        const mensagem = document.getElementById('mensagem-confirmar-senha');

        if (password !== confirmPassword) {
            mensagem.textContent = 'As senhas não coincidem.';
            mensagem.style.color = 'red';
            confirmPasswordField.style.borderColor = 'red';
        } else {
            mensagem.textContent = '';
            confirmPasswordField.style.borderColor = '';
        }
    };

    if (passwordField && confirmPasswordField) {
        passwordField.addEventListener('input', verificarSenhasCoincidem);
        confirmPasswordField.addEventListener('input', verificarSenhasCoincidem);
    }

    
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email-login').value;
            const senha = document.getElementById('senha-login').value;

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            })
            .then(response => response.json())
            .then(data => {
                const mensagem = document.getElementById('mensagem-login');
                if (data.success) {
                    mensagem.style.color = 'green';
                    mensagem.textContent = 'Login bem-sucedido.';
                  
                } else {
                    mensagem.style.color = 'red';
                    mensagem.textContent = 'Email ou senha incorretos.';
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
        });
    }
});
