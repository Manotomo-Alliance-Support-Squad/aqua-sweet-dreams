import { stringToLink, ExternalLink, linkToString } from "./url";

export interface Game {
    gameID: number;
    title: string;
    thumbnail: string;
    blurhash: string;
    description: string;
    gitLink: ExternalLink;
    gameLink: ExternalLink;
}

export interface GameJson {
    gameID: number;
    title: string;
    thumbnail: string;
    blurhash: string;
    description: string;
    gitLink: string;
    gameLink: string;
}

export function gameFromJson(json: GameJson): Game {
    const { gameID, title, thumbnail, blurhash, description, gitLink, gameLink } = json;
    return {
        gameID,
        title,
        thumbnail,
        blurhash,
        description,
        gitLink: stringToLink(gitLink),
        gameLink: stringToLink(gameLink),
    }
}

export function gameToJson(game: Game): GameJson {
    const { gameID, title, thumbnail, blurhash, description, gitLink, gameLink } = game;
    return {
        gameID,
        title,
        thumbnail,
        blurhash,
        description,
        gitLink: linkToString(gitLink),
        gameLink: linkToString(gameLink),
    }
}
