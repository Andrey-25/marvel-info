import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {error, loading, request, clearError} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=0c9c31bc57ae4831d45e5890e616fefb';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComic(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
			description: comic.description || "There is no description",
			pageCount: comic.pageCount
				? `${comic.pageCount} pages`
				: "No information about the number of pages",
			thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
			language: comic.textObjects[0]?.language || "en-us",
			price: comic.prices[0].price
				? `${comic.prices[0].price}$`
				: "not available",
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getComic, getAllComics, clearError};
}

export default useMarvelService;