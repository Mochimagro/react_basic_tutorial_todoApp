import { useState } from "react";

export default function ({ onAddTodo }) {
  const [inputValue, setInputValue] = useState("");
  const maxTextLength = 20;

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
      console.log("入力欄が空です");
      return;
    }

    if (trimmedValue.length > maxTextLength) {
      console.log("20文字以内で入力して下さい");
      return;
    }

    onAddTodo(inputValue.trim());

    setInputValue("");
  };

  return (
    <div className="mb-6">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength={maxTextLength}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="新しいTodoを入力して下さい"
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          追加
        </button>
      </form>
    </div>
  );
}
