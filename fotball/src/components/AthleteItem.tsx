import type { IAthlete } from "../interfaces/IAthlete";

const AthleteItem = ({ player }: { player: IAthlete }) => {
  return (
    <article className="glassDiv itemCard">
      <h2 className="bold">{player.name}</h2>
      <img
        className="img-responsive"
        src={`http://localhost:5212/images/athletes/${player.image}`}
        alt=""
        style={{ width: "200px" }}
      />
      <h4>Id: {player.id}</h4>
      <h4>Price: {player.price}M</h4>
      <h3>
        {player.purchaseStatus ? (
          "Utilgjengelig for kjøp"
        ) : (
          <button className="button">Kjøp Spiller</button>
        )}
      </h3>
    </article>
  );
};

export default AthleteItem;
