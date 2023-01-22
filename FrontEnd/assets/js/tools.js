// Je ne sais pas ou placer cette function 

export function validateUrl(page){
    const url = document.location.pathname;
    const regex = new RegExp(`\\${page}.html$`);
    const validatedUrl = regex.test(url);

    return validatedUrl;
}