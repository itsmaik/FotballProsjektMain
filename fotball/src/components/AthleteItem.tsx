import type { IAthlete } from "../interfaces/IAthlete";

const AthleteItem = ({ player }: { player: IAthlete }) => {
  return (
    <article className="w-64 p-2 border-2 rounded border-gray-200 shadow-lg shadow-gray-300/50">
      <h2 className="font-bold">{player.name}</h2>
      <img
        className="h-60 w-full object-cover"
        src={`http://localhost:5212/images/athletes/${player.image}`}
        alt=""
      />
      <h4>Price: {player.price}M</h4>
      <h3>
        {player.purchaseStatus ? (
          "Utilgjengelig for kjøp"
        ) : (
          <button className="">Kjøp Spiller</button>
        )}
      </h3>
    </article>
  );
};

export default AthleteItem;
