import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  onDeleteTodo,
  onUpdateTodo,
  onToggleTodo,
}) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo}
          onToggleTodo={onToggleTodo}
        />
      ))}
    </div>
  );
}
