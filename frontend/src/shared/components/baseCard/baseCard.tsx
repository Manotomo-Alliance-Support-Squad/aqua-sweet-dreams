import { Component } from "react";
import CSS from "csstype";
import './baseCard.css';
import CardStyle1 from "../../../assets/cards/AKUKIN_Card_Header.png";
import CardStyle2 from "../../../assets/cards/AKUKIN_Card_Header1.png";
import { InView } from 'react-intersection-observer';

export const CardStyles = [
    [CardStyle1, "var(--main-text-wrapper-background-color)"],
    [CardStyle2, "var(--main-text-wrapper-background-color)"],
]

export interface BaseCardProps<T> {
    object: T;
    cardStyleIndex: number;
}

export interface BaseCardState {
    loaded: boolean;
}

export default class BaseCard<T, P extends BaseCardProps<T>, S extends BaseCardState> extends Component<P, S> {
    private readonly cardStyleIndex: number;

    constructor(props: P) {
        super(props);
        this.cardStyleIndex = this.props.cardStyleIndex >= CardStyles.length ? Math.floor(Math.random() * CardStyles.length) : this.props.cardStyleIndex;
    }

    state = {
        loaded: false
    } as S

    protected toggleVisibility(inViewport: boolean): void {
        if (inViewport) {
            this.setState({ loaded: true });
        }
    }

    public renderCard(content: JSX.Element): JSX.Element {
        const { loaded } = this.state;
        const rootStyles: CSS.Properties = {
            backgroundImage: `url(${CardStyles[this.cardStyleIndex][0]})`,
        };
        return (
            <InView className={"base-card" + (loaded ? "" : " view-port-hidden")} onChange={this.toggleVisibility.bind(this)} skip={loaded} threshold={.8}>
                <div className="card-header" />
                <div className="card-header-decal-wrapper">
                    <div className="card-header-decal" style={rootStyles} />
                </div>
                <div className="card-content">
                    {content}
                </div>
                <div className="card-footer" />
            </InView>
        );
    }
}
