import styled from "styled-components";
import Card from "../../Shared/Card/Card";

const Root = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  --cardHeight: calc(1.41 * var(--cardWidth));
  --cardsCnt: ${(props) => props.cardsCnt};
  --containerMaxHeight: 50vh;
  .card-container {
    &:not(:last-of-type) {
      margin-bottom: calc(
        -1 * max(calc((
                  var(--cardHeight) * var(--cardsCnt) -
                    var(--containerMaxHeight)
                ) / (var(--cardsCnt)-1)), calc(var(--cardHeight) / 2))
      );
    }
  }
`;

export default function CardsColumn({ cards }) {
  return (
    <Root layout cardsCnt={cards.length}>
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
