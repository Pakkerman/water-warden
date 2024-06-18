import { UndoIcon } from "~/svgs";
import { useWaterContext } from "../contexts/WaterContext";

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

export function Drinks() {
  const { history } = useWaterContext();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <DrinkButtons />
      <div className="flex w-full cursor-pointer items-center justify-center gap-2">
        <DrinkAllButton />
        <UndoDrinkButton />
      </div>
      <div className="fixed bottom-0 right-0 z-10 text-xs">
        <pre>{JSON.stringify(history, null, 2)}</pre>
      </div>
    </div>
  );
}

function DrinkAllButton() {
  // TODO: this button
  // const { setHistory } = useWaterContext();
  return (
    <button
      className="flex h-20 w-[50%] items-center justify-center rounded-md border-2 border-blue-400 text-lg hover:border-orange-400"
      // onClick={() => setHistory((prev) => prev.slice(0, prev.length - 1))}
    >
      Drink All (current accumulation)
      <UndoIcon size={32} />
    </button>
  );
}

function UndoDrinkButton() {
  const { setHistory } = useWaterContext();
  return (
    <button
      className="flex h-20 w-[50%] items-center justify-center rounded-md border-2 border-red-400 text-lg hover:border-orange-400"
      onClick={() => setHistory((prev) => prev.slice(0, prev.length - 1))}
    >
      redo last cup <UndoIcon size={32} />
    </button>
  );
}

function DrinkButtons() {
  const { waterConsumption, setWaterConsumption, setHistory } =
    useWaterContext();

  return (
    <ul className="flex w-full justify-around">
      {drinks.map(({ name, amount }) => (
        <li
          className="flex w-20 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-blue-400 hover:border-orange-400"
          key={amount}
          onClick={() => {
            setWaterConsumption(waterConsumption + amount);
            setHistory((prev) => [...prev, { amount }]);
          }}
        >
          <p>{name}</p>
          <p>{amount}ml</p>
          <button></button>
        </li>
      ))}
    </ul>
  );
}
