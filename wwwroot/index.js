async function montarTabela(personagens) {
    const tbody = document.getElementById('body_table');
    tbody.innerHTML = " ";

    personagens.forEach(personagem => {

        const linha = `
        <tr id="linha-${personagem.id}">
                 <td class="id-celula">${personagem.id}</td>
                 <td class="nome-celula">${personagem.nome}</td>
                 <td class="tipo-celula">${personagem.tipo}</td>
          <td class="d-flex justify-content-center gap-3">       
    <button type="button" 
            class="btn btn-link text-secondary p-0 border-0 fs-4" 
            onclick="entrarEmModoEdicao(${personagem.id})">
        <ion-icon name="pencil-outline"></ion-icon>
    </button>
    
    <button type="button" 
            class="btn btn-link text-danger p-0 border-0 fs-4" 
            onclick="deletarAtividade(${personagem.id})">
        <ion-icon name="trash-outline"></ion-icon> 
    </button>
  </td>
 </tr>
    `;
        tbody.innerHTML += linha;
    });
  

}

async function BuscarPersonagens() {

    try {
        const resposta = await fetch(`http://localhost:5185/Personagens`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (resposta.ok) {
            const personagens = await resposta.json();
            montarTabela(personagens);
        }
        else {
            console.error('Erro ao buscar personagens:', resposta.status, resposta.statusText);
        }
    } catch (erro) {
        console.error('Erro ao buscar personagens:', erro);
    }
}
document.addEventListener("DOMContentLoaded", async function () {
    await BuscarPersonagens();
});

async function deletarAtividade(id) {
    const confirmar = confirm('Tem certeza que deseja deletar este personagem?');
    if (!confirmar) {
        return;
    }
    try {
        const resposta = await fetch(`http://localhost:5185/Personagens/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resposta.ok) {

            alert('Personagem deletado com sucesso!');
            window.location.reload();
        }
        else {
            console.error('Erro ao deletar personagem:', resposta.status, resposta.statusText);
        }
    } catch (erro) {
        console.error('Erro ao deletar personagem:', erro);
    }
}
function entrarEmModoEdicao(id) {

    const linha = document.getElementById(`linha-${id}`);

    const nomeCelula = linha.querySelector('.nome-celula');
    const tipoCelula = linha.querySelector('.tipo-celula');

    const nomeAtual = nomeCelula.innerText;
    const tipoAtual = tipoCelula.innerText;

    nomeCelula.innerHTML = `<input type="text" id="nome-${id}" class="form-control form-control-sm" value="${nomeAtual}">`;
    tipoCelula.innerHTML = `<input type="text" id="tipo-${id}" class="form-control form-control-sm" value="${tipoAtual}">`;


    // Troca os botões: Caneta vira DISQUETE, Lixeira vira CANCELAR (X)
    const celulaBotoes = linha.lastElementChild;
    celulaBotoes.innerHTML = `
        <button type="button" class="btn btn-link text-success p-0 border-0 fs-4" onclick="salvarAtualizacao(${id})">
            <ion-icon name="save-outline"></ion-icon>
        </button>
        <button type="button" class="btn btn-link text-muted p-0 border-0 fs-4" onclick="window.location.reload()">
            <ion-icon name="close-outline"></ion-icon>
        </button>
    `;
}

async function salvarAtualizacao(id) {
    const confirmar = confirm("Tem certeza que quer atualizar essa atividade?");
    if (!confirmar) return;

    try {
        const nomeInput = document.getElementById(`nome-${id}`).value;
        const tipoInput = document.getElementById(`tipo-${id}`).value;

        const personagemAtualizado = {
            id: id,
            nome: nomeInput,
            tipo: tipoInput

        };
        const resposta = await fetch(`http://localhost:5185/Personagens/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personagemAtualizado)
        });
        if (resposta.ok) {
            alert('Personagem atualizado com sucesso!');
            window.location.reload();
        }
        else {
            console.error('Erro ao atualizar personagem:', resposta.status, resposta.statusText);
        }
    } catch (erro) {
        console.error('Erro ao atualizar personagem:', erro);
    }
}