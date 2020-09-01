import fetch from 'isomorphic-unfetch'

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

    searchCocktail(name) {
        let url = `search.php?s=${name}`
        const config = {
            method: 'GET'
        }
        return this.request(url, config)
    }

    lookupCocktail(id) {
        let url = `lookup.php?i=${id}`
        const config = {
            method: 'GET'
        }
        return this.request(url, config)
    }

    searchIngredient(name) {
        let url = `search.php?i=${name}`
        const config = {
            method: 'GET'
        }
        return this.request(url, config)
    }

    lookupIngredient(id) {
        let url = `search.php?iid=${id}`
        const config = {
            method: 'GET'
        }
        return this.request(url, config)
    }

    parseDrink(drinkJson) {
        let ingredients = []
        if(!drinkJson || !drinkJson.strDrink){
            return false
        }
        for(let n = 1; n<=15; n++) {
            if(drinkJson[`strIngredient${n}`]){
                ingredients.push({
                    name: drinkJson[`strIngredient${n}`],
                    measure: drinkJson[`strMeasure${n}`],
                })
            }
        }
        return {
            name: drinkJson.strDrink,
            ingredients
        }
    }
}

const api = new CocktailAPI()
export default api

