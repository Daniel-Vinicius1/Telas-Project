document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formularioCadastrar");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

       
        const tipoDispositivo = document.getElementById("input-dispositivo").value;
        const modelo = document.getElementById("input-modelo").value;
        const numeroSerie = document.getElementById("input-serie").value;
        const numeroTombamento = document.getElementById("input-tombamento").value;
        const local = document.getElementById("input-local").value;
        const dataInstalacao = document.getElementById("input-data-instalacao").value;
        const tecnicoResponsavel = document.getElementById("input-tecnico").value;

        
        const ativo = {
            tipoDispositivo,
            modelo,
            numeroSerie,
            numeroTombamento,
            local,
            dataInstalacao,
            tecnicoResponsavel
        };

        
        let ativos = JSON.parse(localStorage.getItem("ativos")) || [];
        ativos.push(ativo);
        localStorage.setItem("ativos", JSON.stringify(ativos));

    
        form.reset();

        
        alert("Ativo cadastrado com sucesso!");
    });
});
