var pgAtual = "#inicio";

function mostraPagina(pg) {
    $(pgAtual).hide();
    $(pg).show();
    pgAtual = pg;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
}

var pedidoInstalacao; window.addEventListener('beforeinstallprompt', function(installPrompt)
{
    if(installPrompt) {
        $("#installAppBt").show();
        pedidoInstalacao = installPrompt;
    }
});

function installApp() {
    pedidoInstalacao.prompt();
}