import { useAppDispatch, useAppSelector } from "../store/hooks";
import { increment, decrement, incrementByAmount, reset } from "../store/slices/counterSlice";
import { Button } from "./ui/button";

export function CounterExample() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold">Redux Counter Example</h2>
      <p className="text-4xl font-mono">{count}</p>
      <div className="flex gap-2">
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(incrementByAmount(5))}>+5</Button>
        <Button onClick={() => dispatch(reset())} variant="outlined" color="gray">
          Reset
        </Button>
      </div>
    </div>
  );
}
