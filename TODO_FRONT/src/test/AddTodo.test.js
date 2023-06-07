import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddTodo from "../components/AddTodo";

describe("ajout d'une tâche", () => {
  test("sends information to addTodoToDatabase", async () => {
    // définit des valeurs a envoyé en base de données
    const mockTodo = { content: "New task", edit: false, done: false };
    const mockId = 0;

    // création du mock qui simule une action a la place des info réelles
    const addTodoMock = jest.fn();
    render(<AddTodo addTodo={addTodoMock} />);

    // creation d'une simulation qui surveille les appel à object
    // il permet de lire l'object avec l'id apres qu'il soit envoyé en BDD
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ...mockTodo, id: mockId }),
      })
    );

    // Selectionne l'input present dans le component
    const input = screen.getByPlaceholderText("Add a todo");
    fireEvent.change(input, { target: { value: "New task" } });

    // Selectionne le BTN present dans le component
    const button = screen.getByText("Add");
    fireEvent.click(button);

    // retour du back avec l'id simulé
    await waitFor(() =>
      expect(addTodoMock).toHaveBeenCalledWith({
        id: mockId,
        content: "New task",
        done: false,
        edit: false,
      })
    );
  });
});
