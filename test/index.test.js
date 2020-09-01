import api from "../index.js";
import chai from 'chai'
import { longVodka, longVodkaJson } from "./longVodka.js";

const expect = chai.expect

describe('API requests', function () {
    describe('searchCocktail', function () {
        it('should return drink list', function () {
            return api.searchCocktail('margarita').then(data => {
                expect(data).to.be.an('Array')
                expect(data.length).to.be.above(0)
            })
        });
        it('should return null when no drinks found', function () {
            return api.searchCocktail('test123123').then(data => {
                console.log(data)
                expect(data).to.be.an('null')
            })
        });
    });
    describe('lookupCocktail', function () {
        it('should return Long Vodka recipe', function () {
            return api.lookupCocktail(13196).then(data => {
                expect(data).to.deep.equal(longVodka)
            })
        });
        it('should return false when no cocktail found', function () {
            return api.lookupCocktail(13196).then(data => {
                expect(data).to.deep.equal(longVodka)
            })
        });
    });
});

describe('Drink parser', function () {
    it('should parse drink name', function () {
        expect(api.parseDrink(longVodkaJson).name).to.equal(longVodka.name)
    })
    it('should parse drink ingredients', function () {
        expect(api.parseDrink(longVodkaJson).ingredients).to.deep.equal(longVodka.ingredients)
    })
    it('should return false on empty JSON', function () {
        expect(api.parseDrink('')).to.be.false
    })
    it('should return false on number input', function () {
        expect(api.parseDrink('17')).to.be.false
    })
})
