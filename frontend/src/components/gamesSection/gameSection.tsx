import BaseSection from "../../shared/components/baseSection/baseSection";
import { Game } from "../../models/game";
import DisplayedLanguage from "../../models/language";
import GameCard from "./gameCard/gameCard";
import "./gameSection.css";
import { CardStyles } from "../../shared/components/baseCard/baseCard";

export default class GameSection extends BaseSection<Game> {
    renderCard(object: Game, language: DisplayedLanguage, id: number): JSX.Element {
        return (
            <div key={id} className="game-card-container">
                <GameCard key={id} object={object} cardStyleIndex={id % CardStyles.length} language={language} />
            </div>
        );
    }
}
