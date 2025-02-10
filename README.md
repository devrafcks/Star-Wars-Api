# Star Wars API - Listagem de Personagens e Filmes

## Acesse o Projeto

Você pode acessar o projeto clicando no link abaixo:

[**Star Wars API - Visualização do Projeto**](https://devrafcks.github.io/Star-Wars-Api/)

### Visualização do Projeto:

![Star Wars API](https://github.com/user-attachments/assets/de3ae772-a935-4e11-8c1c-1064d670dd4b)

Este projeto utiliza a [Star Wars API](https://swapi.dev/) para listar os personagens do universo de Star Wars e os filmes nos quais eles apareceram. O objetivo é fornecer uma interface simples que exibe informações sobre os personagens, como altura, ano de nascimento, gênero e filmes.

## Funcionalidades

- Carrega e exibe os personagens de Star Wars.
- Exibe detalhes como altura, ano de nascimento e gênero dos personagens.
- Lista os filmes em que os personagens apareceram, com cache para otimizar as requisições.
- Cache de títulos de filmes para evitar novas requisições para o mesmo filme.

## Tecnologias Utilizadas

- **HTML**: Estrutura da página.
- **CSS**: Estilos para a apresentação da interface.
- **Normalize.css**: Biblioteca que ajuda a garantir uma aparência consistente em diferentes navegadores, corrigindo inconsistências no estilo padrão de elementos HTML.
- **JavaScript**: Lógica de carregamento dos dados da API e manipulação do DOM.
- **Fetch API**: Realiza as requisições para obter os dados da API.


## Como Funciona

### 1. Carregamento dos Personagens
A função `listarPersonagens` busca os dados dos personagens através da API da Star Wars. Ela percorre todas as páginas de resultados (caso haja mais de uma) e monta a lista com todos os personagens.

### 2. Detalhamento de Filmes
Ao clicar em um personagem, os filmes em que ele aparece são carregados dinamicamente. A função `carregarFilmes` é responsável por buscar os títulos dos filmes a partir das URLs fornecidas na resposta da API. Os títulos são armazenados em cache para melhorar a performance.

### 3. Cache de Filmes
Para evitar requisições repetidas para os mesmos filmes, um cache (`filmCache`) é utilizado. Quando o título de um filme já foi carregado uma vez, ele é armazenado e reutilizado em chamadas subsequentes.
