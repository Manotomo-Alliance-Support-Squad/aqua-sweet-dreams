import {MessageJson} from "./message";
import {ArtworkJson, MultiArtworkJson} from "./artwork";
import {ArchiveJson} from "./archive";
import {AnnouncementJson} from "./announcement";
import {VideoJson} from "./video";
import { GameJson } from "./game";

interface BaseResponse {
    status: string;
}

export interface MessageResponse extends BaseResponse {
    messages: MessageJson[];
}

export interface GalleryResponse extends BaseResponse {
    gallery: ArtworkJson[];
}

export interface MultiGalleryResponse extends BaseResponse {
    multigallery: MultiArtworkJson[];
}

export interface VideoResponse extends BaseResponse {
    videos: VideoJson[];
}

export interface GameResponse extends BaseResponse {
    games: GameJson[];
}

export interface ArchiveResponse extends BaseResponse {
    archives: ArchiveJson[];
}

export interface CountResponse extends BaseResponse {
    count: number;
}

export interface AnnouncementResponse extends BaseResponse {
    announcements: AnnouncementJson[];
}
