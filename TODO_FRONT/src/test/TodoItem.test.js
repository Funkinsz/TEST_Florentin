import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoItem from "../components/TodoItem";

describe("lire le component et modifier l'item", () => {
  test("modifie l'état d'un todo lorsqu'on clique sur les boutons", async () => {
    const mockTodo = { id: 1, content: "Todo", done: true, edit: false };
    const mockUpdateTodo = jest.fn();

    render(
      <TodoItem
        todo={mockTodo}
        updateTodo={mockUpdateTodo}
      />
    );

    jest.spyOn(global, "fetch").mockImplementation(() => 
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ ...mockTodo})
    }))

    const btn = screen.getByText("Réalisé")
    fireEvent.click(btn)

    await waitFor(() => 
      expect(mockUpdateTodo).toHaveBeenCalledWith({
        id: 1,
        content: "Todo",
        done: true,
        edit: false
      }))
  });
});
