import { Pokemon } from "../../models/pokemon";
import { PokemonService } from "../../services/pokemon.service";

import './pokemon-detalhes.css';

class PokemonDetalhes {
    formPrincipal: HTMLFormElement
    txtPesquisa: HTMLInputElement;
    btnLimpar: HTMLButtonElement;
    card: HTMLDivElement;
    cardContent: HTMLDivElement;
    foto: HTMLImageElement;
    info: HTMLDivElement;
    nome: HTMLDivElement;
    tipo: HTMLDivElement;
    numero: HTMLDivElement;
    btnVoltar: HTMLButtonElement;




    pnlConteudo: HTMLDivElement;

    private pokemonService: PokemonService;

    constructor() {
        this.pokemonService = new PokemonService();


        this.registrarElementos();
        this.registrarEventos();

        const url = new URLSearchParams(window.location.search);

        const nome = url.get('nome') as string;

        this.pesquisarPokemonPorNome(nome);

    }
    registrarElementos(): void {
        this.formPrincipal = document.getElementById("formPrincipal") as HTMLFormElement;
        this.txtPesquisa = document.getElementById("txtPesquisa") as HTMLInputElement;
        this.btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;
        this.pnlConteudo = document.getElementById("pnlConteudo") as HTMLDivElement;
        this.card = document.getElementById("card") as HTMLDivElement;
        this.cardContent = document.getElementById("card-content") as HTMLDivElement;
        this.foto = document.getElementById("foto") as HTMLImageElement;
        this.info = document.getElementById("info") as HTMLDivElement;
        this.nome = document.getElementById("nome") as HTMLDivElement;
        this.tipo = document.getElementById("tipo") as HTMLDivElement;
        this.numero = document.getElementById("numero") as HTMLDivElement;
        this.btnVoltar = document.getElementById("btnVoltar") as HTMLButtonElement;

    }


    registrarEventos(): void {
        //     this.formPrincipal
        //         .addEventListener('submit', (sender) => this.buscar(sender));

        this.btnVoltar
            .addEventListener('click', () => this.redirecionarUsuario());
    }

    redirecionarUsuario(): any {
        window.location.href = "index.html";
    }

    buscar(sender: Event): void {
        sender.preventDefault();

        if (!this.txtPesquisa.value) return;

        const nome = this.txtPesquisa.value;
        this.txtPesquisa.value = '';

        this.limparCard();
        this.pesquisarPokemonPorNome(nome);
    }

    limparCard(): void {
        this.pnlConteudo.querySelector('.card-pokemon')
            ?.remove();
    }

    private pesquisarPokemonPorNome(nome: string): void {
        this.pokemonService.pesquisarPokemonCard(nome)
            .then(poke => this.atualizarCard(poke));

    }

    private atualizarCard(pokemon: Pokemon): void {

        this.foto.src = pokemon.spriteUrl;
        const nome = this.PrimeiraLetraMaiscula(pokemon.nome);
        this.nome.textContent = nome;

        const numeroFormatado = this.formatNumberWithZeros(pokemon.id);

        this.numero.textContent = numeroFormatado;

        const tipo = this.PrimeiraLetraMaiscula(pokemon.tipo);
        this.tipo.textContent = tipo;

        const cor = this.verificarTipo(tipo);

        this.colorirCard(cor);


    }
    colorirCard(cor: string) {
        this.card.style.backgroundColor = cor;
        this.tipo.style.backgroundColor = cor;

    }
    verificarTipo(tipo: string): string {
        switch (tipo.toLowerCase()) {
            case "normal":
                return '#A8A878'; // Normal
            case "fire":
                return '#F08030'; // Fogo
            case "water":
                return '#6890F0'; // Água
            case "electric":
                return '#F8D030'; // Elétrico
            case "grass":
                return '#78C850'; // Grama
            case "ice":
                return '#98D8D8'; // Gelo
            case "fighting":
                return '#C03028'; // Lutador
            case "poison":
                return '#A040A0'; // Veneno
            case "ground":
                return '#E0C068'; // Terrestre
            case "flying":
                return '#A890F0'; // Voador
            case "psychic":
                return '#F85888'; // Psíquico
            case "bug":
                return '#A8B820'; // Inseto
            case "rock":
                return '#B8A038'; // Pedra
            case "ghost":
                return '#705898'; // Fantasma
            case "dark":
                return '#705848'; // Sombrio
            case "steel":
                return '#B8B8D0'; // Aço
            case "fairy":
                return '#EE99AC'; // Fada

            default:
                return 'gray';
        }
    }

    PrimeiraLetraMaiscula(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    formatNumberWithZeros(number: number) {
        const formattedNumber = `#${String(number).padStart(4, '0')}`;
        return formattedNumber;
    }




}



window.addEventListener('load', () => new PokemonDetalhes());