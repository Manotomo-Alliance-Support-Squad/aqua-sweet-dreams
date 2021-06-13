import BaseCard, { BaseCardProps, BaseCardState } from "../../../shared/components/baseCard/baseCard";
import { Artwork } from '../../../models/artwork';
import './artworkCard.css';
import { linkToString } from '../../../models/url';
import { decode } from "blurhash";

enum ImageLoadingState {
    NotLoaded,
    Loading,
    Loaded,
}

interface ArtworkCardProps extends BaseCardProps<Artwork> {
}

interface ArtworkCardState extends BaseCardState {
    loadingState: ImageLoadingState,
}

export default class ArtworkCard extends BaseCard<Artwork, ArtworkCardProps, ArtworkCardState> {
    private readonly artwork: Artwork;
    private readonly username: string;
    private imageElement: HTMLImageElement;

    constructor(props: ArtworkCardProps) {
        super(props);
        this.artwork = props.object;
        this.username = this.artwork.username ? props.object.username : "Anonymous";
        this.imageElement = document.createElement("img");

        this.imageLoaded = this.imageLoaded.bind(this);
        this.getBlurImage = this.getBlurImage.bind(this);
    }

    state: ArtworkCardState = {
        loadingState: ImageLoadingState.NotLoaded,
        loaded: false // From BaseCardState
    }

    private imageLoaded() {
        this.setState({
            loadingState: ImageLoadingState.Loaded,
        });

        this.imageElement.removeEventListener("load", this.imageLoaded);
    }

    private setImage() {
        if (this.state.loadingState === ImageLoadingState.NotLoaded) {
            this.imageElement.src = linkToString(this.artwork.artworkLink);
            this.imageElement.addEventListener("load", this.imageLoaded);

            this.setState({
                loadingState: ImageLoadingState.Loading,
            });
        }
    }

    componentDidMount() {
        this.setImage();
    }

    componentDidUpdate() {
        this.setImage();
    }

    getBlurImage() {
        const width = 32;
        const height = 32;

        const canvas = document.createElement("canvas");
        canvas.height = height;
        canvas.width = width;
        const ctx = canvas.getContext("2d");
        const imageData = ctx?.createImageData(width, height);
        const pixels = decode(this.artwork.blurhash, width, height);
        imageData?.data.set(pixels);
        if (imageData) {
            ctx?.putImageData(imageData, 0, 0);
        }
        return canvas.toDataURL();
    }

    renderArtwork() {
        const hasLoaded = this.state.loadingState === ImageLoadingState.Loaded;
        const artworkLink = linkToString(this.artwork.artworkLink);
        const artistLink = this.artwork.artistLink ? linkToString(this.artwork.artistLink) : "#no_artist_link";

        return (
            <div className="artwork-card">
                <img className="artwork-card-img" src={hasLoaded ? artworkLink : this.getBlurImage()} alt={this.artwork.title} />
                <div className="artwork-card-footer">
                    <div className="title">{this.artwork.title}</div>
                    <div className="artist">
                        Artist: <a href={artistLink}>{this.username}</a>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return this.renderCard(this.renderArtwork());
    }
}
