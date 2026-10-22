// Script exécuté avant l'affichage (voir layout) : évite le flash de thème au chargement.
// Choix enregistré en priorité, sinon préférence système.
export const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`;
