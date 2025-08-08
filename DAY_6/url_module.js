// const {URL} = require('url')
// const adr = new URL('https://example.org:8080/p/a/t/h?query=string#hash');
// console.log(adr.hostname);
// console.log(adr.pathname);
// console.log(adr.searchParams.get('query'));





// URLSearchParams API

// const{URL, URLSearchParams} = require('url')

// const myURL = new URL('https://example.com/?name=Kai&age=30')
// const params = new URLSearchParams(myURL.search);

// console.log(params.get('name'))

// console.log('city','Ahmedabad');
// params.delete('age');
// console.log(params.toString())


// Constructing URLs with the URL Module

const url = require('url')

const urlObject = {
    protocol:'http',
    hostname : 'localhost',
    port : 3000,
    pathname : '/pathname',
    query : {search : 'test'},
    hash : '#hash'
};

const myURL = url.format(urlObject);
console.log(myURL)

