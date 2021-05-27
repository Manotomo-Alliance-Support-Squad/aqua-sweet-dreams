import { Artwork } from '../../models/artwork';
import ArtworkCard from './artworkCard/artworkCard';
import DisplayedLanguage from "../../models/language";
import BaseSection, { BaseSectionProps, BaseSectionState } from "../../shared/components/baseSection/baseSection";
import { CardStyles } from "../../shared/components/baseCard/baseCard";
import './gallerySection.css';

interface GallerySectionProps extends BaseSectionProps<Artwork> {
}

interface GallerySectionState extends BaseSectionState {

}


export default class GallerySection extends BaseSection<Artwork> {
    renderCard(object: Artwork, cardStyleIndex: number, language: DisplayedLanguage, id: number): JSX.Element {
        return (
            // TODO: edit gallery-section to display at a specific scale
            <div className="gallery-section">
                <ArtworkCard key={object.artworkID} object={object} cardStyleIndex={id % CardStyles.length} />
            </div>
        );
    }
}
