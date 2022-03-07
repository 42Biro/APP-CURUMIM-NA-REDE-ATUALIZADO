var pgAtual = "#inicio";

function mostraPagina(pg) {
    $(pgAtual).hide();
    $(pg).show();
    pgAtual = pg;

    
    $("#titulo").text($(pg).attr('titulo'));
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

var myCarousel = document.querySelector('#myCarousel')
var carousel = new bootstrap.Carousel(myCarousel)

function installApp() {
    pedidoInstalacao.prompt();
}
