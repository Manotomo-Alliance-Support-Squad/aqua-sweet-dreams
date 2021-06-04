import { stringToLink, linkToString, ExternalLink } from "./url";

export interface Artwork {
    artworkID: number;
    artworkLink: ExternalLink;
    artistLink: ExternalLink;
    username: string;
    title: string;
}

export interface ArtworkJson {
    artworkID: number;
    artworkLink: string;
    artistLink: string;
    username: string;
    title: string;
}

export interface ArtworkMetadata {
    metadataID: number;
    setID: string;
    artistLink: ExternalLink;
    username: string;
    title: string;    
}

export interface ArtworkMetadataJson {
    metadataID: number;
    setID: string;
    artistLink: string;
    username: string;
    title: string;    
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
    const { artworkID, artworkLink, artistLink, username, title } = json;
    return {
        artworkID,
        artworkLink: stringToLink(artworkLink),
        artistLink: stringToLink(artistLink),
        username,
        title,
    }
}

export function artworkToJson(artwork: Artwork): ArtworkJson {
    const { artworkID, artworkLink, artistLink, username, title } = artwork;
    return {
        artworkID,
        artworkLink: linkToString(artworkLink),
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

// TODO: Does this need fixing...?
export function multiArtworkToJson(artwork: MultiArtwork): MultiArtworkJson {
    const { metadata, gallery } = artwork;
    return {
        metadata,
        gallery,
    }
}

