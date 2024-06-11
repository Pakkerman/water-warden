const drinks = [
  {
    name: "a sip",
    amount: 50,
  },
  {
    name: "small cup",
    amount: 150,
  },
  {
    name: "big cup",
    amount: 300,
  },
  {
    name: "a bottle",
    amount: 500,
  },
];

export function Drinks({
  remaining,
  setRemaining,
}: {
  remaining: number;
  setRemaining: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <ul className="flex w-full justify-around">
      {drinks.map(({ name, amount }) => (
        <li
          className="flex w-20 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-blue-400 hover:border-orange-400"
          key={amount}
          onClick={() =>
            setRemaining(remaining - amount < 0 ? 0 : remaining - amount)
          }
        >
          <p>{name}</p>
          <p>{amount}ml</p>
          <button></button>
        </li>
      ))}
    </ul>
  );
}
