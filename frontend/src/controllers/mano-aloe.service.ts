import {Message, messageFromJson} from "../models/message";
import {CountResponse, GalleryResponse, MultiGalleryResponse, MessageResponse, ArchiveResponse, AnnouncementResponse, VideoResponse} from "../models/response";
import {Artwork, MultiArtwork, artworkFromJson, multiArtworkFromJson} from "../models/artwork";
import {Archive, archiveFromJson} from "../models/archive";
import {Announcement, announcementFromJson} from "../models/announcement";
import {Video, videoFromJson} from "../models/video";


export default class ManoAloeService {
    private readonly apiURL: string;

    constructor() {
        this.apiURL = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'http://localhost:5000/api/';
    }

    private getCount(functionality: string): Promise<number> {
        return fetch(this.apiURL + functionality + '/count')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: CountResponse) => {
                return apiResponse.count;
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getMessage(messageID: number): Promise<Message> {
        return fetch(this.apiURL + 'messages/' + messageID)
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: MessageResponse) => {
                return messageFromJson(apiResponse.messages[0]);
            })
            .catch((error: Error) => {
                throw error;
            });
    }

    public getAllMessages(): Promise<Message[]> {
        return fetch(this.apiURL + 'messages')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: MessageResponse) => {
                return apiResponse.messages.map(messageFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getMessages(from: number, to: number): Promise<Message[]> {
        return fetch(this.apiURL + 'messages/range/' + from + '/' + to)
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: MessageResponse) => {
                return apiResponse.messages.map(messageFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getMessageCount(): Promise<number> {
        return this.getCount('messages');
    }

    public getGallery(): Promise<Artwork[]> {
        return fetch(this.apiURL + 'gallery')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: GalleryResponse) => {
                return apiResponse.gallery.map(artworkFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getGalleryCount(): Promise<number> {
        return this.getCount('gallery');
    }

    public getMultiGallery(): Promise<MultiArtwork[]> {
        return fetch(this.apiURL + 'multigallery')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: MultiGalleryResponse) => {
                return apiResponse.multigallery.map(multiArtworkFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getVideo(): Promise<Video[]> {
        return fetch(this.apiURL + 'videos')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: VideoResponse) => {
                return apiResponse.videos.map(videoFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getVideoCount(): Promise<number> {
        return this.getCount('videos');
    }


    public getArchive(who: string, archiveID: number): Promise<Archive> {
        return fetch(this.apiURL + 'archives/' + who + '/' + archiveID)
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: ArchiveResponse) => {
                return archiveFromJson(apiResponse.archives[0]);
            })
            .catch((error: Error) => {
                throw error;
            });
    }

    public getAllArchives(who: string): Promise<Archive[]> {
        return fetch(this.apiURL + 'archives/' + who)
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: ArchiveResponse) => {
                return apiResponse.archives.map(archiveFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getRandomArchive(who: string): Promise<Archive> {
        return fetch(this.apiURL + 'archives/' + who + '/random')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: ArchiveResponse) => {
                return archiveFromJson(apiResponse.archives[0]);
            })
            .catch((error: Error) => {
                throw error;
            });
    }

    public getArchiveCount(who: string): Promise<number> {
        return this.getCount('archives/' + who);
    }

    public getAllAnnouncements(): Promise<Announcement[]> {
        return fetch(this.apiURL + 'announcements')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: AnnouncementResponse) => {
                return apiResponse.announcements.map(announcementFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }
}
