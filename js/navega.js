document.addEventListener("DOMContentLoaded", function() {
    const secoes = {
        ativoOpcao: { url: "Tela_ativos/Projeto_Total/ativo.html", css: "Tela_ativos/Projeto_Total/ativo.css" },
        departamentoOpcao: { url: "Tela_Departamentos/Projeto_Total/Departamento.html", css: "Tela_Departamentos/Projeto_Total/departamento.css" },
        localizacaoOpcao: { url: "Tela_Localização/Projeto_Total/Localização.html", css: "Tela_Localização/Projeto_Total/localizacao.css" },
        tecnicoOpcao: { url: "Tela_Técnico/Projeto_Total/Técnico.html", css: "Tela_Técnico/Projeto_Total/tecnico.css" },
        relatorioGeralOpcao: { url: "Relátorio_Geral/Projeto_Total/Rgeral.html", css: "Relátorio_Geral/Projeto_Total/rgeral.css" },
        relatorioAtivosOpcao: { url: "Relátorio_Ativos/Projeto_Total/Rativo.html", css: "Relátorio_Ativos/Projeto_Total/ratvios.css" },
        relatorioDepartamentosOpcao: { url: "Relátorio_Departamentos/Projeto_Total/Rdepartamento.html", css: "Relátorio_Departamentos/Projeto_Total/rdepartamento.css" },
        relatorioLocaisOpcao: { url: "Relátorio_Locais/Projeto_Total/Rlocais.html", css: "Relátorio_Locais/Projeto_Total/rlocais.css" },
        relatorioTecnicosOpcao: { url: "Relátorio_Técnicos/Projeto_Total/Rtécnicos.html", css: "Relátorio_Técnicos/Projeto_Total/rtecnicos.css" }
    };

    const conteudoDiv = document.getElementById("conteudo");
    const linkCss = document.getElementById("pagina-css");

    function carregarPagina(url, css) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                conteudoDiv.innerHTML = html;
                const scriptElements = conteudoDiv.getElementsByTagName('script');
                for (let i = 0; i < scriptElements.length; i++) {
                    const scriptElement = document.createElement('script');
                    scriptElement.src = scriptElements[i].src;
                    document.head.appendChild(scriptElement);
                }
                
                linkCss.href = css;
            })
            .catch(err => console.error('Erro ao carregar página:', err));
    }

    function destacarBotao(id) {
        document.querySelectorAll('.opcao').forEach(opcao => {
            opcao.classList.remove('opcao-selecionada');
        });
       
        document.getElementById(id).classList.add('opcao-selecionada');
    }

    for (const [opcao, { url, css }] of Object.entries(secoes)) {
        document.addEventListener("click", function(event) {
            if (event.target && event.target.id === opcao) {
                carregarPagina(url, css);
                destacarBotao(opcao);
            }
        });
    }

 
    const inicial = secoes.ativoOpcao;
    carregarPagina(inicial.url, inicial.css);
    destacarBotao('ativoOpcao');
});
