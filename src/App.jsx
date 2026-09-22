import { useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import TodoItem from "./TodoComponents/TodoItem";
import TodoList from "./TodoComponents/TodoList";
import TodoForm from "./TodoComponents/TodoForm";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 新しいIDを生成する関数
  const generateNewId = () => {
    if (todos.length === 0) return 1;
    const maxId = Math.max(...todos.map((todo) => todo.id));
    return maxId + 1;
  };

  const addTodo = (text) => {
    const newTodo = {
      id: generateNewId(),
      text: text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo,
    );
    setTodos(updatedTodos);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text^3xl font-bold text-center text-gray-800 mb-8">
          Todo アプリ
        </h1>

        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
          onToggleTodo={toggleTodo}
        />
      </div>
    </div>
  );
}

export default App;
