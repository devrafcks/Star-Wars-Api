const url = "https://swapi.dev/api/people/";
const filmCache = new Map();

// Função para obter os títulos dos filmes
const getFilmTitles = async (filmUrls) => {
    try {
        const filmPromises = filmUrls.map(async (filmUrl) => {
            // Verificar se o título do filme já está no cache
            if (filmCache.has(filmUrl)) {
                return filmCache.get(filmUrl);
            }

            const response = await fetch(filmUrl);
            const film = await response.json();
            filmCache.set(filmUrl, film.title); // Armazenar no cache
            return film.title;
        });

        const filmTitles = await Promise.all(filmPromises);
        return filmTitles;
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        return [];
    }
};

// Função para transformar os personagens em HTML
const personagensToHTML = (personagens) => {
    return personagens.map(personagem => {
        return `
            <li class="personagem">
                <span class="name">${personagem.name}</span>
                <div class="personagem-info">
                    <ol class="personagem-details">
                        <li class="detail">
                            <strong>Altura:</strong> <span class="height">${personagem.height} cm</span>
                        </li>
                        <li class="detail">
                            <strong>Ano de nascimento:</strong>
                            <span class="birth-year">${personagem.birth_year}</span>
                        </li>
                        <li class="detail">
                            <strong>Gênero:</strong> <span class="gender">${personagem.gender === "male" ? "Masculino" : "Feminino"}</span>
                        </li>
                        <li class="detail">
                            <strong>Filmes:</strong>
                            <ul class="films" data-films-url="${personagem.films.join(',')}">
                                <li class="film-item">Carregando filmes...</li>
                            </ul>
                        </li>
                    </ol>
                </div>
            </li>
        `;
    }).join("");
};

// Função para carregar os filmes de cada personagem
const carregarFilmes = async (elemento) => {
    if (!elemento) {
        console.error("Elemento não encontrado para carregar filmes.");
        return;
    }

    const filmUrls = elemento.getAttribute("data-films-url").split(',');
    const filmTitles = await getFilmTitles(filmUrls);

    // Atualizando os elementos de filmes
    const filmListElement = elemento.querySelector(".film-item");
    if (filmListElement) {
        filmListElement.innerHTML = filmTitles.map(title => `<li class="film-item">${title}</li>`).join("");
    }
};

// Função para listar todos os personagens
const listarPersonagens = async () => {
    try {
        const loadingMessage = document.querySelector("#loadingMessage");
        if (loadingMessage) loadingMessage.style.display = "block";

        let nextUrl = url;
        let allPersonagens = [];

        while (nextUrl) {
            const response = await fetch(nextUrl);
            const data = await response.json();

            if (data.results && data.results.length === 0) {
                console.error("Nenhum personagem encontrado na página:", nextUrl);
                break;
            }

            allPersonagens = [...allPersonagens, ...data.results];
            nextUrl = data.next;
        }

        const personagensListElement = document.querySelector(".personagens");
        if (!personagensListElement) {
            console.error("Elemento .personagens não encontrado.");
            return;
        }

        personagensListElement.innerHTML = personagensToHTML(allPersonagens);

        setTimeout(() => {
            const filmesElements = document.querySelectorAll(".personagem .films");
            filmesElements.forEach(filmesElement => carregarFilmes(filmesElement));

            if (loadingMessage) loadingMessage.style.display = "none";
        }, 100); // Pequeno delay para garantir a renderização
    } catch (error) {
        console.error("Erro ao buscar personagens:", error);
    }
};

document.addEventListener("DOMContentLoaded", listarPersonagens);
