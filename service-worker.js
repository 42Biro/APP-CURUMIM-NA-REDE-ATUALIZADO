/**
 * Versão do cache, é importante mudar o valor da variável 'version'
 * toda vez que algum dos arquivos em no array 'arquivos' for modificado
 * isso garante que a aplicação será atualizada nos clientes onde já exista
 * um cache salvo
 */
 const version = 5
 const cachename = 'app-cache-v'+version
 
 /**
  * Arquivos que serão salvos no cache para uso offline
  * O caminho para os arquivos deve ser completo e sem o dominio
  * Ex: arquivo logo.png
  *      URL: https://bpvifsc.github.io/template-app-pwa/imagens/logo.png
  *      Caminho: /template-app-pwa/imagens/logo.png
  * Ou utilizar caminhos relativos ao arquivo html aberto
  * Ex: arquivo aberto index.html (utilizar em PWA)
  *      URL: https://bpvifsc.github.io/template-app-pwa/index.html
  *      Caminho: ./imagens/logo.png
  */
 const arquivos = [
     "./",
     "./index.html",
     "./main.js",
     "./service-worker.js",
     "./manifest.json",
     "./estilos.css",
     "./imagens/bootstrap.jpg",
     "./imagens/ig-logo.svg",
     "./imagens/linus-torvalds.jpg",
     "./imagens/logo.png",
     "./imagens/mail.svg",
     "./imagens/tim-berners-lee.jpg",
     "./imagens/wpp-logo.svg",
     "./imagens/icone192.png",
     "./imagens/icone512.png"
   ]
 
   /**
    * Cria o cache dos arquivos
    */
   self.addEventListener('install', function(event) {
     event.waitUntil(
       caches.open(cachename).then(function(cache) {
         return cache.addAll(arquivos);
       })
     );
   });
   
   /**
    * Verifica se existe uma versão em cache das páginas
    * Caso não seja possivel retorna o match(index) da catch
    * Está página pode ser tratada e retornar uma mensagem de erro/offline
    */
   self.addEventListener('fetch', function(event) {
     event.respondWith(caches.match(event.request).then(function(response) {
       if (response !== undefined) {
         return response;
       } else {
         return fetch(event.request).then(function (response) {
           let responseClone = response.clone();
           
           caches.open(cachename).then(function (cache) {
             cache.put(event.request, responseClone);
           });
           return response;
         }).catch(function () {
           return caches.match('./index.html');
         });
       }
     }));
   });