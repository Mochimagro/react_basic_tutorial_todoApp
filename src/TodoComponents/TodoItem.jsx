import { useState } from "react";

export default function TodoItem({
  todo,
  onDeleteTodo,
  onUpdateTodo,
  onToggleTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      `「${todo.text}」を削除してもよろしいですか？`,
    );

    if (isConfirmed) {
      onDeleteTodo(todo.id);
    }
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  // 編集を保存
  const handleEditSave = () => {
    if (editText.trim() === "") {
      return;
    }

    // 実際の更新処理を呼び出す
    onUpdateTodo(todo.id, editText.trim());
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  const handleToggle = () => {
    onToggleTodo(todo.id);
  };

  return (
    <div
      className={`p-3 rounded shadow flex items-center gap-3 ${
        todo.completed ? "bg-green-50 border border-green-200" : "bg-white"
      }`}
    >
      <input
        type="checkbox"
        onChange={handleToggle}
        checked={todo.completed}
        className="w-5 h-5"
      />

      <div className="flex-1">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <button
              onClick={handleEditSave}
              className="px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
            >
              保存
            </button>
            <button
              onClick={handleEditCancel}
              className="px-2 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
            >
              キャンセル
            </button>
          </div>
        ) : (
          <div onClick={handleEditStart} className="cursor-pointer">
            <p
              className={`${
                todo.completed ? "text-gray-500 line-through" : "text-gray-800"
              }`}
            >
              {todo.text}
            </p>
            <p className="text-sm text-gray-500">
              状態: {todo.completed ? "✅ 完了" : "⏳ 未完了"}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleDelete}
        className="ml-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none"
      >
        削除
      </button>
    </div>
  );
}
