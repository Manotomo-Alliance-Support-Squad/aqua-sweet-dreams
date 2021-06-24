import React from "react";
import { InView } from 'react-intersection-observer';
import { Anchor } from "../../models/anchor";
import { MultipleAnchorStates } from "../anchor/anchorMultipleSection";

interface AnchorSupportedSectionProps {
    anchor: Anchor,
    onVisible: (isVisible: boolean, href: string) => void;
}

function onSectionVisible(activeHrefs: MultipleAnchorStates[], activeHref: string) {
    const hrefIndex = activeHrefs.findIndex(({ href }) => href === activeHref);
    if (hrefIndex < 0) {
        activeHrefs.push({ href: activeHref, lastUpdate: new Date() });

    }
    return activeHrefs;
}


function onSectionNotVisible(activeHrefs: MultipleAnchorStates[], activeHref: string) {
    return activeHrefs.filter(({ href }) => href !== activeHref);

}

export function handleSectionVisibility(component: any, isVisible: boolean, activeHref: string) {
    let { activeHrefs } = component.state;
    if (isVisible) {
        activeHrefs = onSectionVisible(activeHrefs, activeHref);
    } else {
        activeHrefs = onSectionNotVisible(activeHrefs, activeHref);
    }
    component.setState({
        activeHrefs
    })
}

export default class AnchorSupportedSection extends React.Component<AnchorSupportedSectionProps> {
    public render() {
        const { anchor, onVisible, children } = this.props;
        return (
            <div id={anchor.href.substring(1)}>
                <InView onChange={(inView) => onVisible(inView, anchor.href)} threshold={anchor.threshold || 0}>
                    {children}
                </InView>
            </div>
        );
    }
}
