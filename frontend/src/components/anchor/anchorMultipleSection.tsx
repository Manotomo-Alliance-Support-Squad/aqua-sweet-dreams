import React from "react";
import { Anchor, AnchorSectionProps } from "../../models/anchor";
import AnchorButton from "./anchorButton";
import "./anchorSection.css";

export interface MultipleAnchorStates {
    href: string,
    lastUpdate: Date,
}

interface AnchorMultipleSectionProps extends AnchorSectionProps {
    anchors: Anchor[];
    activeHrefs: MultipleAnchorStates[];
}

export default class AnchorMultipleSection extends React.Component<AnchorMultipleSectionProps> {
    render() {
        const { anchors, position } = this.props;
        let { activeHrefs = [] } = this.props;
        activeHrefs = activeHrefs.sort((a, b) => a.lastUpdate > b.lastUpdate ? -1 : 1);
        return (
            <div className={"anchor-section multiple " + position} style={{ "--element-count": anchors.length } as React.CSSProperties}>
                {anchors.map(anchor => (
                    <div key={anchor.href} className={activeHrefs.length > 0 && activeHrefs[0].href === anchor.href ? "active" : ""}>
                        <div className="anchor-seperator" />
                        <AnchorButton anchor={anchor} />
                    </div>
                ))}
            </div>
        );
    }
}
