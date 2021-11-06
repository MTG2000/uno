import styled from "styled-components";
import Card from "../../Shared/Card/Card";

const Root = styled.div`
  display: flex;
  justify-content: center;

  .card-container {
    &:not(:last-of-type) {
      margin-right: calc(var(--cardWidth) / -3);
    }
  }
`;

export default function CardsRow({ cards, cardProps }) {
  return (
    <Root layout>
      {cards.map((card) => (
        <div className="card-container" key={card.layoutId}>
          <Card
            layoutId={card.layoutId}
            color={card.color}
            digit={card.digit}
            action={card.action}
            width={200}
            flip={card.flip}
            rotationY={card.rotationY}
            selectable={cardProps?.selectable && card.playable}
          />
        </div>
      ))}
    </Root>
  );
}
