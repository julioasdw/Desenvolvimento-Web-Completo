<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Senhas</title>
</head>
<body>
    <h1>Bem-vindo ao Sistema de Senhas</h1>
    <button id="btnGerarSenha">Gerar Senha</button>
    <div id="senhaGerada"></div>

    <script>
        document.getElementById('btnGerarSenha').addEventListener('click', function() {
            fetch('/gerarSenha')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('senhaGerada').textContent = `Sua senha é: ${data.senha}`;
                    window.print();
                });
        });
    </script>
</body>
</html>
