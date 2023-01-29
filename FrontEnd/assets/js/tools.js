// Je ne sais pas ou placer cette function 

export function validateUrl(page){
    const url = location.pathname;
    const regex = new RegExp(`\\${page}.html$`);
    let validatedUrl = regex.test(url);
    
    if (!validatedUrl && page === 'index' ) {
        if (url.search('.html') === -1) {
            validatedUrl = true;
        }
    }
    
    return validatedUrl;
}