import styled from "styled-components";
import Card from "../../Shared/Card/Card";

const Root = styled.div`
  display: flex;
  justify-content: center;

  --cardsCnt: ${(props) => props.cardsCnt};
  --containerMaxWidth: 70vw;
  .card-container {
    &:not(:last-of-type) {
      margin-right: calc(
        -1 * max(calc((
                  var(--cardWidth) * var(--cardsCnt) - var(--containerMaxWidth)
                ) / (var(--cardsCnt)-1)), calc(var(--cardWidth) / 3))
      );
    }
  }
`;

export default function CardsRow({ cards, cardProps }) {
  return (
    <Root layout cardsCnt={cards.length}>
      {cards.map((card) => (
        <div className="card-container" key={card.layoutId}>
          <Card
            id={card.id}
            layoutId={card.layoutId}
            color={card.color}
            digit={card.digit}
            action={card.action}
            width={200}
            flip={true}
            rotationY={card.rotationY}
            selectable={cardProps?.selectable && card.playable}
          />
        </div>
      ))}
    </Root>
  );
}
