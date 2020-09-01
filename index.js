import fetch from 'isomorphic-unfetch';

class CocktailAPI {
    constructor() {
        this.basePath = "https://www.thecocktaildb.com/api/json/v1/1/"
    }

    request(endpoint = "", options = {}) {
        let url = this.basePath + endpoint
        let headers = {
            'Content-type': 'application/json'
        }
        let config = {
            ...options,
            ...headers
        }
        return fetch(url, config).then(r => {
            if (r.ok) {
                return r.json()
            }
            throw new Error(r)
        })
    }

    search(name) {
        let url = `search.php?s=${name}`
        const config = {
            method: 'GET'
        }
        return this.request(url, config)
    }
}

const api = new CocktailAPI()
api.search('margarita').then(data => console.log(data.drinks.map(drink => drink.strDrink)))
