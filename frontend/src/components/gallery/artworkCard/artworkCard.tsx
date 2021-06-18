import BaseCard, { BaseCardProps, BaseCardState } from "../../../shared/components/baseCard/baseCard";
import { Artwork } from '../../../models/artwork';
import ArtworkImage from './artworkImage';
import './artworkCard.css';
import { linkToString } from '../../../models/url';

interface ArtworkCardProps extends BaseCardProps<Artwork> {
}

interface ArtworkCardState extends BaseCardState {
}

export default class ArtworkCard extends BaseCard<Artwork, ArtworkCardProps, ArtworkCardState> {
    private readonly artwork: Artwork;
    private readonly username: string;

    constructor(props: ArtworkCardProps) {
        super(props);
        this.artwork = props.object;
        this.username = this.artwork.username ? props.object.username : "Anonymous";
    }

    state: ArtworkCardState = {
        loaded: false // From BaseCardState
    }

    renderArtwork() {
        const artistLink = this.artwork.artistLink ? linkToString(this.artwork.artistLink) : "#no_artist_link";

        return (
            <div className="artwork-card">
                <ArtworkImage artworkLink={this.artwork.artworkLink} blurhash={this.artwork.blurhash} title={this.artwork.title} />
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
