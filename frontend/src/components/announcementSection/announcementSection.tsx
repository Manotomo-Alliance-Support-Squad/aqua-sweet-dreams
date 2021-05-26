import AnnouncementCard from "./announcementCard";
import {Announcement} from "../../models/announcement";
import BaseSection, {BaseSectionProps, BaseSectionState} from "../../shared/components/baseSection/baseSection";
import {CardStyleLength} from "../../shared/components/baseCard/baseCard";
import DisplayedLanguage from "../../models/language";

interface AnnouncementSectionProps extends BaseSectionProps<Announcement> {

}

interface AnnouncementSectionState extends BaseSectionState {

}


export default class AnnouncementSection extends BaseSection<Announcement> {

    renderCard(object: Announcement, cardStyleNum: number, language: DisplayedLanguage, id: number): JSX.Element {
        return <AnnouncementCard key={object.announcementID} object={object} cardStyleNum={0} language={language}/>;
    }

    render(): JSX.Element {
        const sectionStyle: string = this.props.customSectionStyle ? this.props.customSectionStyle : "base-section";
        if (!this.props.data.length) {
            return <></>;
        } else {
            return (
                <div className={sectionStyle}>
                    {this.props.data.map((object: Announcement, idx: number) => {
                            return this.renderCard(object, idx % CardStyleLength, DisplayedLanguage.Original, idx)
                        }
                    )}
                </div>
            );
        }
    }
}
