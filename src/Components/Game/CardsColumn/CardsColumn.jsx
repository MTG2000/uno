import styled from "styled-components";
import Card from "../../Shared/Card/Card";

const Root = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  .card-container {
    &:not(:last-of-type) {
      margin-bottom: calc(-1 * var(--cardWidth));
    }
  }
`;

export default function CardsColumn({ cards }) {
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
          />
        </div>
      ))}
    </Root>
  );
}
