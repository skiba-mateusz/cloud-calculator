import { useState, type FormEvent } from "react";

type Operation = "add" | "subtract";

const OPERATIONS: Record<Operation, string> = {
  add: "+",
  subtract: "-",
};

function App() {
  const [operation, setOperation] = useState<Operation>("add");
  const [valA, setValA] = useState<number>();
  const [valB, setValB] = useState<number>();
  const [result, setResult] = useState<number | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!valA || !valB) return;

    const res = await fetch(`/api/${operation}?a=${valA}&b=${valB}`);
    const { data } = await res.json();

    setResult(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          name="operation"
          onChange={(e) => {
            setOperation(e.target.value as Operation);
            setResult(null);
          }}
          value={operation}
        >
          <option value="add" selected>
            + (addition)
          </option>
          <option value="subtract">- (subtraction)</option>
        </select>
        <input
          type="number"
          name="a"
          placeholder="A value"
          value={valA}
          onChange={(e) => {
            setValA(+e.target.value);
            setResult(null);
          }}
        />
        <input
          type="number"
          name="b"
          placeholder="B value"
          value={valB}
          onChange={(e) => {
            setValB(+e.target.value);
            setResult(null);
          }}
        />
        <button>Evaluate</button>
      </form>
      <div>
        {result != null
          ? `${valA} ${OPERATIONS[operation]} ${valB} = ${result}`
          : ""}
      </div>
    </div>
  );
}

export default App;
