import { Pokemon } from "../models/pokemon";


export class PokemonService {
    pesquisarPokemon(nome: string): Promise<Pokemon> {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + nome;

        return fetch(url)
            .then(res => res.json())
            .then((obj: any): Pokemon => this.mapearPokemon(obj));
    }

    pesquisarPokemonCard(nome: string): Promise<Pokemon> {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + nome;

        return fetch(url)
            .then(res => res.json())
            .then((obj: any): Pokemon => this.mapearPokemonCard(obj));
    }

    pesquisarListaPokemons(): Promise<Pokemon[]> {
        const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';

        return fetch(url)
            .then(res => res.json())
            .then((obj: any): Promise<Pokemon[]> => this.mapearListaPokemons(obj.results));
    }

    private mapearListaPokemons(objetos: any[]): any {
        const pokemons = objetos.map(obj => this.pesquisarPokemon(obj.name))

        return Promise.all(pokemons);

    }

    private mapearPokemonCard(obj: any): Pokemon {

        console.log(obj)
        return {
            id: obj.id,
            nome: obj.name,
            tipo: obj.types[0].type.name,
            spriteUrl: obj['sprites']['other']['official-artwork']['front_default'],

        }

    }

    private mapearPokemon(obj: any): Pokemon {

        if (obj.id < 650) {
            return {
                id: obj.id,
                nome: obj.name,
                tipo: obj.type,
                spriteUrl: obj['sprites']['versions']['generation-v']['black-white']['animated']['front_default'],

            }
        }

        else {
            return {
                id: obj.id,
                nome: obj.name,
                tipo: obj.type,
                spriteUrl: obj.sprites.other.home.front_default,

            }
        }

    }
}