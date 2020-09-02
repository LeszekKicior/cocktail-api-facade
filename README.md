# cocktail-api-facade
A simple JS facade for https://www.thecocktaildb.com API.

Features 4 separate functions for displaying API data:
* `searchDrink(string)` - returns a promise that resolves to an array of drinks that match given string
* `lookupDrink(id)` - returns a promise that resolves to details of a specific drink
* `searchIngredient(string)` - returns a promise that resolves to an array of ingredients that match given string
* `lookupIngredient(id)` - returns a promise that resolves to details of a specific cocktail ingredient

### Requirements
* A version of Node.js high enough to support module syntax

### Download & installation
```
npm install cocktail-api-facade
```
Then, import in your `.js` file:
```js
import cocktailApi from 'cocktail-api-facade'
```

#Usage

```js
import cocktailApi from 'cocktail-api-facade'

cocktailApi.searchDrink('martini').then(drinks => doStuffWithDrinks())
cocktailApi.lookupIngredient('12').then(ingredient => doStuffWithIngredient())
```
