import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import './tela-inicio.css';

class TelaInicio {
    formPrincipal: HTMLFormElement;
    txtPesquisa: HTMLInputElement;
    btnLimpar: HTMLButtonElement;
    telaPoke: HTMLImageElement;
    idPokemon: HTMLElement;
    lista: HTMLDivElement;

    pnlConteudo: HTMLDivElement;

    private pokemonService: PokemonService;


    constructor() {
        this.pokemonService = new PokemonService();

        this.registrarElementos();
        this.registrarEventos();

        this.pokemonService.pesquisarListaPokemons()
            .then(pokemons => this.gerarGridPokemons(pokemons))

    }
    private gerarGridPokemons(pokemons: Pokemon[]): any {
        const pnlGrid = document.createElement('div');
        pnlGrid.classList.add('grid-pokemons');

        for (let pokemon of pokemons) {
            const card = this.obterCard(pokemon);

            pnlGrid.appendChild(card);
        }

        this.lista.appendChild(pnlGrid);
    }

    private obterCard(pokemon: Pokemon): HTMLDivElement {
        // const id = document.createElement("p");
        const imagem = document.createElement("img");
        // const nomePokemon = document.createElement("p");

        // id.textContent = pokemon.id.toString();
        // nomePokemon.textContent = pokemon.nome;
        imagem.src = pokemon.spriteUrl

        const cardPokemon = document.createElement('div');
        cardPokemon.classList.add('card-pokemon');

        cardPokemon.addEventListener('click', () => this.redirecionarUsuario(pokemon.nome))

        // cardPokemon.appendChild(id);
        cardPokemon.appendChild(imagem);
        // cardPokemon.appendChild(nomePokemon);

        return cardPokemon;
    }



    registrarElementos(): void {
        this.formPrincipal = document.getElementById("formPrincipal") as HTMLFormElement;
        this.txtPesquisa = document.getElementById("txtPesquisa") as HTMLInputElement;
        this.btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;
        this.pnlConteudo = document.getElementById("pnlConteudo") as HTMLDivElement;
        this.telaPoke = document.getElementById("telaPoke") as HTMLImageElement;
        this.idPokemon = document.getElementById("idPokemon") as HTMLElement;
        this.lista = document.getElementById('lista') as HTMLDivElement;
    }

    registrarEventos(): void {
        this.formPrincipal.addEventListener("submit", (e) => this.buscar(e));
        this.btnLimpar.addEventListener('click', () => this.limparCard());
    }


    limparCard(): void {
        this.idPokemon.textContent = "";
        this.telaPoke.hidden = true;
        this.txtPesquisa.value = "";

    }


    buscar(sender: Event): any {
        sender.preventDefault();

        const nome = this.txtPesquisa.value;

        this.pesquisarPokemon(nome);

    }

    private pesquisarPokemon(nome: string) {

        this.pokemonService.pesquisarPokemon(nome)
            .then(poke => this.gerarCard(poke))
            .then(poke => this.redirecionarUsuario(nome))
            .catch(err => this.nomeInvalido());
    }
    redirecionarUsuario(nome: string): any {
        window.location.href = "pokemon-detalhes.html?nome=" + nome;
    }



    private gerarCard(pokemon: Pokemon): void {

        this.telaPoke.style.visibility = 'visible';

        this.telaPoke.hidden = false;
        this.idPokemon.textContent = pokemon.id.toString();
        this.telaPoke.src = pokemon.spriteUrl;
        this.txtPesquisa.value = pokemon.nome.toUpperCase();

    }

    private nomeInvalido(): void {
        this.txtPesquisa.value = "Não encontrado!"
    }

}

window.addEventListener('load', () => new TelaInicio())