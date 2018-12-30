// const ga = `<!-- Global site tag (gtag.js) - Google Analytics -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=UA-131508355-1"></script>
// <script>
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
//
// gtag('config', 'UA-131508355-1');
// </script>`

export const src = 'https://www.googletagmanager.com/gtag/js?id=UA-131508355-1'
export const innerHtml = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-131508355-1');`
