import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../components/TodoItem";

test("modifie l'état d'un todo lorsqu'on clique sur les boutons", async () => {
    const todo = { id: 1, content: "Todo", done: false, edit: false };
    const deleteTodo = jest.fn();
    const updateTodo = jest.fn();
  
    render(<TodoItem todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />);
  
    const doneButton = screen.getByText("A faire");
    const editButton = screen.getByText("Modifier");
    const deleteButton = screen.getByText("Supprimer");
  
    fireEvent.click(doneButton);
    fireEvent.click(editButton);
    fireEvent.click(deleteButton);
  
    expect(updateTodo).toHaveBeenCalledWith({ ...todo, done: true });
    expect(updateTodo).toHaveBeenCalledWith({ ...todo, edit: true });
    expect(deleteTodo).toHaveBeenCalledWith(todo);
  });
