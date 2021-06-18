import BaseCard, { BaseCardProps, BaseCardState } from "../../../shared/components/baseCard/baseCard";
import { MultiArtwork, ArtworkMetadata, MultiArtworkGallery } from '../../../models/artwork';
import ArtworkImage from './artworkImage';
import './artworkCard.css';
import { linkToString } from '../../../models/url';

interface MultiArtworkCardProps extends BaseCardProps<MultiArtwork> {
}

interface MultiArtworkCardState extends BaseCardState {
}

export default class MultiArtworkCard extends BaseCard<MultiArtwork, MultiArtworkCardProps, MultiArtworkCardState> {
    private readonly artworks: MultiArtworkGallery[];
    private readonly metadata: ArtworkMetadata;
    private readonly username: string;

    constructor(props: MultiArtworkCardProps) {
        super(props);
        this.artworks = props.object.gallery;
        this.metadata = props.object.metadata;
        this.username = this.metadata.username ? props.object.metadata.username : "Anonymous";
    }

    state: MultiArtworkCardState = {
        loaded: false // From BaseCardState
    }

    renderArtwork() {
        const artistLink = this.metadata.artistLink ? linkToString(this.metadata.artistLink) : "#no_artist_link";
        return (
            <div className="artwork-card">
                {this.artworks.map((obj, idx) => {
                    return (
                        <ArtworkImage key={idx + linkToString(obj.artworkLink)} artworkLink={obj.artworkLink} blurhash={obj.blurhash} title={this.metadata.message} />
                    );
                })}
                <div className="artwork-card-footer">
                    <div className="title">{this.metadata.message}</div>
                    <div className="artist">
                        Submitter: <a href={artistLink}>{this.username}</a>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return this.renderCard(this.renderArtwork());
    }
}
