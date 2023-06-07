import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";

test("affiche une liste de todos", () => {
  const todoList = [
    { id: 1, content: "Todo 1", done: false, edit: false },
    { id: 2, content: "Todo 2", done: true, edit: false },
    { id: 3, content: "Todo 3", done: false, edit: true },
  ];

  render(
    <TodoList
      todoList={todoList}
    />
  );

  const todos = screen.getAllByRole("listitem");

  expect(todos).toHaveLength(3);
});
