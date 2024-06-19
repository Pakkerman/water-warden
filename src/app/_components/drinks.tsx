import { UndoIcon } from "~/svgs";
import { useWaterContext } from "../contexts/WaterContext";
import { useTimeContext } from "../contexts/TimerContext";

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
  const { setHistory, history } = useWaterContext();
  const { countdown } = useTimeContext();
  const totalDrank = history.reduce((acc, curr) => acc + curr.amount, 0);
  const timeProgress = countdown / (60 * 60 * 10);
  const currentWaterAccumulation =
    Math.floor((1 - timeProgress) * 2500) - totalDrank;

  return (
    <button
      className="flex h-20 w-[50%] flex-col items-center justify-center rounded-md border-2 border-blue-400 text-lg hover:border-orange-400 "
      disabled={currentWaterAccumulation <= 0}
      onClick={() => {
        if (currentWaterAccumulation === 0) return;

        setHistory((prev) => [...prev, { amount: currentWaterAccumulation }]);
      }}
    >
      {currentWaterAccumulation > 0 ? (
        <>
          <label>Drink All</label>
          <label>({currentWaterAccumulation} ml)</label>
        </>
      ) : (
        <>
          <label>You are all</label>
          <label>Hydrated</label>
        </>
      )}
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
