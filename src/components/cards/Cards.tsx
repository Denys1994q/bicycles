import Card from "../card/Card";
import { IBicycle } from "../../store/slices/models/bicycle";

interface ICardsProps {
    cards: IBicycle[],
    onRemoveCard: (id: number) => void,
    onUpdateCard: (id: number, status: any) => void,
}

const Cards: React.FC<ICardsProps> = ({ cards, onRemoveCard, onUpdateCard }) => {
    return (
        <>
            {cards && cards.length > 0 ? (
                <ul>
                    {cards.map((card: IBicycle) => (
                        <li key={card.id}>
                            <Card {...card} onRemoveCard={onRemoveCard} onUpdateCard={onUpdateCard} />
                        </li>
                    ))}
                </ul>
            ) : (
                <h4>No cards yet</h4>
            )}
        </>
    );
};

export default Cards;
