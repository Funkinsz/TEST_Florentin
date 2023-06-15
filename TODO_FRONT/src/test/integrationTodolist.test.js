import React from "react"
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";

describe("Test d'intégration depuis todoList pour delete", () => {
  test("add Todo", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Add a todo");
    fireEvent.change(input, { target: { value: "Test todo" } });

    const addBtn = screen.getByText("Add");
    fireEvent.click(addBtn);
  });
});
