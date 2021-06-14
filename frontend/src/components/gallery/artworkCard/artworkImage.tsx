import React from 'react';
import './artworkCard.css';
import { ExternalLink, linkToString } from '../../../models/url';
import { decode } from "blurhash";

interface ArtworkProps {
    artworkLink: ExternalLink,
    blurhash?: string,
    title?: string,
}

interface ArtworkState {
    loaded: boolean,
}

export default class ArtworkImage extends React.Component<ArtworkProps, ArtworkState> {
    constructor(props: ArtworkProps) {
        super(props);
        this.imageLoaded = this.imageLoaded.bind(this);
        this.getImage = this.getImage.bind(this);
        this.getBlurImage = this.getBlurImage.bind(this);
    }

    state: ArtworkState = {
        loaded: false,
    }

    private imageLoaded() {
        this.setState({
            loaded: true,
        });
    }

    getBlurImage(blurhash: string) {
        const width = 32;
        const height = 32;

        const canvas = document.createElement("canvas");
        canvas.height = height;
        canvas.width = width;
        const ctx = canvas.getContext("2d");
        const imageData = ctx?.createImageData(width, height);
        const pixels = decode(blurhash, width, height);
        imageData?.data.set(pixels);
        if (imageData) {
            ctx?.putImageData(imageData, 0, 0);
        }
        return canvas.toDataURL();
    }

    getImage() {
        const { loaded } = this.state;
        const { blurhash, artworkLink } = this.props;
        if (loaded || !blurhash) {
            return linkToString(artworkLink);
        }
        return this.getBlurImage(blurhash);
    }

    render() {
        console.log(this.getImage())
        return (
            <img className="artwork-card-img" src={this.getImage()} alt={this.props.title} onLoad={() => { this.setState({ loaded: true }) }} />
        )
    }
}
