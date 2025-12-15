function adicionarLinha() {
    const lista = document.getElementById("listaItens");

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><input placeholder="Nome"></td>
        <td><input placeholder="Tam"></td>
        <td><input placeholder="Nº"></td>
        <td><input type="number" min="1" placeholder="Qtd"></td>
        <td><button onclick="this.closest('tr').remove()">❌</button></td>
    `;

    lista.appendChild(tr);
}

// cria uma linha inicial
adicionarLinha();

/* ================================
   GERAR ARQUIVO GTB
================================ */
function gerarArquivo() {
    let conteudo = "";

    conteudo += "DADOS DO CLIENTE;\n";

    const nome = document.getElementById("clienteNome").value || "";
    const tel = document.getElementById("clienteTelefone").value || "";

    conteudo += `NOME;${nome}\n`;
    conteudo += `TELEFONE;${tel}\n`;
    conteudo += ";\n";
    conteudo += "ITEM;TAMANHO;NÚMERO;QUANTIDADE\n";

    const linhas = document.querySelectorAll("#listaItens tr");
    let temItem = false;

    linhas.forEach(linha => {
        const inputs = linha.querySelectorAll("input");

        const item = inputs[0].value || "";
        const tam = inputs[1].value || "";
        const num = inputs[2].value || "";
        const qtd = inputs[3].value || "";

        if (item || tam || num || qtd) {
            temItem = true;
            conteudo += `${item};${tam};${num};${qtd}\n`;
        }
    });

    if (!temItem) {
        alert("Preencha pelo menos um item.");
        return;
    }

    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "GTBOT_DADOS_PACOTE.gtb";
    a.click();
}

/* ================================
   COMPARTILHAR WHATSAPP
================================ */
function compartilharPedido() {
    let texto = "DADOS DO CLIENTE;\n";

    const nome = document.getElementById("clienteNome").value || "";
    const tel = document.getElementById("clienteTelefone").value || "";

    texto += `NOME;${nome}\n`;
    texto += `TELEFONE;${tel}\n`;
    texto += ";\n";
    texto += "ITEM;TAMANHO;NÚMERO;QUANTIDADE\n";

    const linhas = document.querySelectorAll("#listaItens tr");
    let temItem = false;

    linhas.forEach(linha => {
        const inputs = linha.querySelectorAll("input");

        const item = inputs[0].value || "";
        const tam = inputs[1].value || "";
        const num = inputs[2].value || "";
        const qtd = inputs[3].value || "";

        if (item || tam || num || qtd) {
            temItem = true;
            texto += `${item};${tam};${num};${qtd}\n`;
        }
    });

    if (!temItem) {
        alert("Preencha pelo menos um item.");
        return;
    }

    if (navigator.share) {
        navigator.share({
            title: "Pedido GTBOT",
            text: texto
        });
    } else {
        alert("Seu celular não suporta compartilhamento direto.");
    }
}




