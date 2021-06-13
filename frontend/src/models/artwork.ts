import { stringToLink, linkToString, ExternalLink } from "./url";

export interface Artwork {
    artworkID: number;
    artworkLink: ExternalLink;
    blurhash: string;
    artistLink: ExternalLink;
    username: string;
    title: string;
}

export interface ArtworkJson {
    artworkID: number;
    artworkLink: string;
    blurhash: string;
    artistLink: string;
    username: string;
    title: string;
}

export interface ArtworkMetadata {
    metadataID: number;
    setID: string;
    artistLink: ExternalLink;
    username: string;
    message: string;    
}

export interface ArtworkMetadataJson {
    metadataID: number;
    setID: string;
    artistLink: string;
    username: string;
    message: string;    
}

export interface MultiArtwork {
    metadata: ArtworkMetadata;
    gallery: Array<string>;
}

export interface MultiArtworkJson {
    metadata: ArtworkMetadata;
    gallery: Array<string>;
}

export function artworkFromJson(json: ArtworkJson): Artwork {
    const { artworkID, artworkLink, blurhash, artistLink, username, title } = json;
    return {
        artworkID,
        artworkLink: stringToLink(artworkLink),
        blurhash,
        artistLink: stringToLink(artistLink),
        username,
        title,
    }
}

export function artworkToJson(artwork: Artwork): ArtworkJson {
    const { artworkID, artworkLink, blurhash, artistLink, username, title } = artwork;
    return {
        artworkID,
        artworkLink: linkToString(artworkLink),
        blurhash,
        artistLink: linkToString(artistLink),
        username,
        title,
    }
}

export function multiArtworkFromJson(json: MultiArtworkJson): MultiArtwork {
    const { metadata, gallery } = json;
    return {
        metadata,
        gallery,
    }
}

export function multiArtworkToJson(artwork: MultiArtwork): MultiArtworkJson {
    const { metadata, gallery } = artwork;
    return {
        metadata,
        gallery,
    }
}

