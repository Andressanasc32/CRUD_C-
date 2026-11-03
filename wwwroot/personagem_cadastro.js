//Cadastro do Personagem
const form = document.getElementById('personagem_form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome_pers = document.getElementById('nome').value;
    const tipo_pers = document.getElementById('tipo').value;

    const dados_pers = {
        nome: nome_pers,
        tipo: tipo_pers
    };

    try {
        const resposta = await fetch(`http://localhost:5185/Personagens`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados_pers)
        });

        if (resposta.ok) {
            alert('Personagem cadastrado com sucesso!');
            form.reset();
        } else {
            console.error('Erro ao cadastrar personagem:', resposta.status, resposta.statusText);
            form.reset();
        }

    } catch (erro) {
        console.error('Erro ao cadastrar personagem:', erro);
    }
});