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
        return this.request(url, config).then(result => result.drinks && result.drinks.map(this.parseDrink))
    }

    lookupCocktail(id) {
        let url = `lookup.php?i=${id}`
        const config = {
            method: 'GET'
        }
        return this.request(url, config).then(result => result.drinks && this.parseDrink(result.drinks[0]))
    }

    searchIngredient(name) {
        let url = `search.php?i=${name}`
        const config = {
            method: 'GET'
        }
        return this.request(url, config).then(result => result.ingredients && result.ingredients.map(this.parseIngredient))
    }

    lookupIngredient(id) {
        let url = `search.php?iid=${id}`
        const config = {
            method: 'GET'
        }
        return this.request(url, config).then(result => result.ingredients && this.parseIngredient(result.ingredients[0]))
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
            id: drinkJson.idDrink,
            name: drinkJson.strDrink,
            thumbnail: drinkJson.strDrinkThumb,
            instructions: drinkJson.strInstructions,
            ingredients
        }
    }

    parseIngredient(ingredientJson) {
        if(!ingredientJson || !ingredientJson.strIngredient) {
            return false
        }
        return {
            id: ingredientJson.idIngredient,
            name: ingredientJson.strIngredient,
            description: ingredientJson.strDescription,
            abv: ingredientJson.strABV
        }
    }
}

const api = new CocktailAPI()
export default api

