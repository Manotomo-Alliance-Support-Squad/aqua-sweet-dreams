import React from 'react';
import seedrandom from 'seedrandom';
import ComboSection from '../../components/comboSection/comboSection';
import { Message } from "../../models/message";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import EmailIcon from '@material-ui/icons/Email';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { Announcement } from "../../models/announcement"
import { Artwork, MultiArtwork } from "../../models/artwork"
import { Video } from "../../models/video"
import './home.css';
import '../../shared/globalStyles/global.css'
import AnnouncementSection from "../../components/announcementSection/announcementSection";
import AnchorSupportedSection, { handleSectionVisibility } from "../../components/anchorSupportedSection/anchorSupportedSection";
import GameSection from '../../components/gamesSection/gameSection';

// Hack for community card before messages
import { LanguageContext, LanguageContextValue } from '../../components/languageSwitch/languageContext';
import MessageCard from '../../components/messageSection/messageCard/messageCard';
import '../../components/headerSection/header.css';
import { Anchor, AnchorSectionPosition } from '../../models/anchor';
import AnchorMultipleSection, { MultipleAnchorStates } from '../../components/anchor/anchorMultipleSection';
import { ReactComponent as AnchorBotan } from "../../assets/icons/anchorIcon.svg";
import { Game } from '../../models/game';

export interface HomePageProps {

}

export interface HomePageState {
    artloading: boolean;
    messageLoaded: boolean;
    announcementLoaded: boolean;
    messages: Message[];
    announcements: Announcement[];
    artworks: Artwork[];
    multiArtworks: MultiArtwork[];
    videos: Video[];
    games: Game[];
    activeHrefs: MultipleAnchorStates[];
}

const Anchors: Anchor[] = [
    {
        href: "#video-anchor",
        svgIcon: AnchorBotan,
        text: "Video",
        threshold: .2,
    },
    {
        href: "#message-anchor",
        svgIcon: AnchorBotan,
        text: "Messages",
        threshold: .1,
    },
    {
        href: "#games-anchor",
        svgIcon: AnchorBotan,
        text: "Games",
        threshold: .5,
    },
    {
        href: "#footer-anchor",
        svgIcon: AnchorBotan,
        text: "Credits",
        threshold: 1,
    }
]

export default class HomePage extends React.Component<HomePageProps, HomePageState> {

    constructor(props: HomePageProps,
        private manoAloeService: ManoAloeService) {
        super(props);
        this.manoAloeService = new ManoAloeService();
        this.loadVideo = this.loadVideo.bind(this);
        this.loadArtwork = this.loadArtwork.bind(this);
        this.loadAnnouncements = this.loadAnnouncements.bind(this);
        this.loadMessages = this.loadMessages.bind(this);
        this.loadMultiGallery = this.loadMultiGallery.bind(this);
        this.loadGames = this.loadGames.bind(this);

        this.onAnchorVisible = this.onAnchorVisible.bind(this);
    }

    state: HomePageState = {
        artloading: true,
        messageLoaded: false,
        announcementLoaded: false,
        messages: [],
        announcements: [],
        artworks: [],
        videos: [],
        games: [],
        multiArtworks: [],
        activeHrefs: [],
    }

    componentDidMount() {
        this.getData();
    }

    private getData(): void {
        this.loadMessages()
        this.loadAnnouncements();
        this.loadArtwork();
        this.loadVideo();
        this.loadMultiGallery();
        this.loadGames();
    }

    onAnchorVisible(isVisible: boolean, activeHref: string) {
        handleSectionVisibility(this, isVisible, activeHref);
    }

    async loadMessages() {
        const setMessagesToState = (messages: Message[]) => this.setState({ messages, messageLoaded: true });
        const getMessagesFromService = () => this.manoAloeService.getAllMessages()
            .then(setMessagesToState)
            .catch(console.error);

        const messages = SessionService.getMessages() ?? [];
        if (messages?.length) {
            setMessagesToState(messages);
        } else {
            getMessagesFromService().finally(
                () => SessionService.saveMessages(this.state.messages)
            );
        }
    }

    async loadAnnouncements() {
        const setAnnouncementsToState = (announcements: Announcement[]) => this.setState({ announcements, announcementLoaded: true });
        this.manoAloeService.getAllAnnouncements()
            .then(setAnnouncementsToState)
            .catch(console.error);
    }

    async loadVideo() {
        const setVideosToState = (videos: Video[]) => this.setState({ videos });
        const getVideoFromService = () => this.manoAloeService.getVideo()
            .then(setVideosToState)
            .catch(console.error);

        const videos = SessionService.getVideo() ?? [];
        if (videos?.length) {
            setVideosToState(videos);
        } else {
            getVideoFromService().finally(
                () => SessionService.saveVideo(this.state.videos)
            );
        }
    }


    async loadArtwork() {
        const setArtworksToState = (artworks: Artwork[]) => this.setState({ artloading: false, artworks });
        const getArtworkFromService = () => this.manoAloeService.getGallery()
            .then(setArtworksToState)
            .catch(console.error);

        const artworks = SessionService.getGallery() ?? [];
        if (artworks?.length) {
            setArtworksToState(artworks);
        } else {
            getArtworkFromService().finally(
                () => SessionService.saveGallery(this.state.artworks)
            );
        }
    }

    async loadMultiGallery() {
        const setMultipleArtworksToState = (multiArtworks: MultiArtwork[]) => this.setState({ multiArtworks });
        const getMultipleArtworkFromService = () => this.manoAloeService.getMultiGallery()
            .then(setMultipleArtworksToState)
            .catch(console.error);

        const multiArtworks = SessionService.getMultiGallery() ?? [];
        if (multiArtworks?.length) {
            setMultipleArtworksToState(multiArtworks);
        } else {
            getMultipleArtworkFromService().finally(
                () => SessionService.saveMultiGallery(this.state.multiArtworks)
            );
        }
    }

    async loadGames() {
        const setGamesToState = (games: Game[]) => this.setState({ games });
        const getGamseFromService = () => this.manoAloeService.getGame()
            .then(setGamesToState)
            .catch(console.error);

        const games = SessionService.getGame() ?? [];
        if (games?.length) {
            setGamesToState(games);
        } else {
            getGamseFromService().finally(
                () => SessionService.saveGame(this.state.games)
            );
        }
    }

    renderCardSection(data: (Message | Artwork | Video | MultiArtwork)[]) {
        return (
            <div>
                <div className="wrapper-overlay">
                    {this.state.messageLoaded && this.state.announcementLoaded ? <ComboSection data={data} /> : <div />}
                </div>
            </div>
        )
    }

    randomizeArrayWithSeed(unshuffled_arr: any[], seed: string) {
        let rng = seedrandom(seed);
        // Schwartzian transform
        return unshuffled_arr
            .map((a) => ({ sort: rng(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
    }

    // We do this because state setting is async and trying to create this in getData yields empty arrays
    compileCardData() {
        let comboCardData: (Message | Artwork | Video | MultiArtwork)[] = [];
        let mainContentArray: any[] = [];
        let subContentArray: any[] = [];
        let multimediaCount: number = this.state.artworks.length + this.state.videos.length + this.state.multiArtworks.length;
        let indexIncrementSpacing: number;

        // The higher count of the two types of content gets to determine the sprinkling of the type of content
        if (multimediaCount > this.state.messages.length) {
            mainContentArray = this.randomizeArrayWithSeed(
                mainContentArray.concat(this.state.multiArtworks, this.state.artworks, this.state.videos),
                "manotomo",  // seed to get the same randomization results every time
            );
            // TODO: create a randomly seeded version of the main content array
            subContentArray = this.state.messages;

            indexIncrementSpacing = Math.floor(multimediaCount / this.state.messages.length);
        } else {
            mainContentArray = this.state.messages;
            subContentArray = this.randomizeArrayWithSeed(
                subContentArray.concat(this.state.multiArtworks, this.state.artworks, this.state.videos),
                "manotomo",  // seed to get the same randomization results every time
            );
            if (multimediaCount === 0) {
                indexIncrementSpacing = -1;

            } else {
                indexIncrementSpacing = Math.floor(this.state.messages.length / multimediaCount);
            }
        }

        // Main content is the type of content we have more of
        for (
            let mainContentIndex = 0, subContentIndex = 0;
            mainContentIndex < mainContentArray.length;
            mainContentIndex++) {
            comboCardData.push(mainContentArray[mainContentIndex]);

            if (indexIncrementSpacing === -1) {
                continue;
            }
            else if (mainContentIndex % indexIncrementSpacing === 0 && subContentIndex < subContentArray.length) {
                comboCardData.push(subContentArray[subContentIndex]);
                subContentIndex++;
            }
        }

        return comboCardData
    }

    render() {
        const comboCardData = this.compileCardData()
        const { activeHrefs } = this.state;
        return (
            <>
                <section id='anchor'>
                    <div className="home-root">
                        <AnchorSupportedSection anchor={Anchors[0]} onVisible={this.onAnchorVisible} >
                            <div className="main-video-container">
                                <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/Snn2gWq-3KY" title="YouTube video player" frameBorder="0"></iframe>
                            </div>
                        </AnchorSupportedSection>
                        <AnchorSupportedSection anchor={Anchors[1]} onVisible={this.onAnchorVisible}>
                            <>
                                <div className="separator">
                                    <AnchorLink href='#message-anchor'>
                                        <EmailIcon className="anchor-link" style={{ width: 28, height: 36 }} />
                                    </AnchorLink>
                                </div>
                                <div id="message-anchor" className="justify-center">
                                    <div className="justify-align-center">
                                        <AnnouncementSection data={this.state.announcements} customSectionStyle="single-column notice-container wrapper-overlay" />
                                    </div>
                                </div>
                                <div className="justify-center padding-top">
                                    <LanguageContext.Consumer>
                                        {(value: LanguageContextValue) => {
                                            const { language } = value;
                                            return (
                                                <div className="justify-align-center notice-container main-message" style={{ "whiteSpace": "pre-line" }}>
                                                    <MessageCard key={1} object={{
                                                        messageID: 0,
                                                        orig_msg: "私たちはあくあクルーの代表者であり、あくたんのための支援プロジェクトを用意しています! 多くはありませんが、あくたんが私たちがここにいることを覚えておいてください.\n\n\
                                                        私たちはあなたの復帰を嬉しく思います。あくたんの配信を楽しみにしています! \n\n\
                                                        おかえりなさい、あくたん！\
                                                        ",
                                                        tl_msg: "We are some representatives of the Aqua Crew! We have prepared several messages from fans all around the world for you! It's not much, but we hope Aqutan remembers that we’re here cheering you up no matter what happens~ \n\n\
                                                        We are happy for your return and we will be looking forward to Aqutan’s streams!\n\n\
                                                        Welcome back, Aqua!\
                                                        ",
                                                        country: "", username: "AKUKIN HQ",
                                                    }} cardStyleIndex={1} language={language} />
                                                </div>
                                            );
                                        }
                                        }
                                    </LanguageContext.Consumer>
                                </div>
                                {this.renderCardSection(comboCardData)}
                            </>
                        </AnchorSupportedSection>
                        <AnchorSupportedSection anchor={Anchors[2]} onVisible={this.onAnchorVisible}>
                            <>
                                <div className="separator">
                                    <AnchorLink href='#games-anchor'>
                                        <SportsEsportsIcon className="anchor-link" style={{ width: 36, height: 36 }} />
                                    </AnchorLink>
                                </div>
                                <div className="wrapper-overlay">
                                    <GameSection data={this.state.games} customSectionStyle="game-section" />
                                </div>
                            </>
                        </AnchorSupportedSection>
                        <AnchorSupportedSection anchor={Anchors[3]} onVisible={this.onAnchorVisible}>
                            <div className="justify-center">
                                <div className="notice-container">
                                    <div className="notice-content" style={{ borderRadius: 0 }}>
                                        <p>These are all the messages we managed to collect!</p>
                                        <p>Tweet at <a href="https://twitter.com/hashtag/Ganbare%E3%81%82%E3%81%8F%E3%81%9F%E3%82%93">#Ganbareあくたん</a> to send us a message!</p>
                                        <p style={{ fontSize: 12 }}>If you find any problems with the website, or if you would like to report a message, please contact us at manotomo@googlegroups.com or at webmaster@manotomo.com</p>
                                        <p style={{ fontSize: 12 }}>This is not an official Hololive site. We are just a group of fans supporting Aqua!</p>
                                    </div>
                                </div>
                            </div>
                        </AnchorSupportedSection>
                    </div>
                </section>
                <AnchorMultipleSection position={AnchorSectionPosition.RIGHT} activeHrefs={activeHrefs} anchors={Anchors} />
            </>
        )
    }
}
