describe("Test global TodoList", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/deployFrontTodo");
  });

  it("Ajouter un todo Item", () => {
    const todoInput = "Nouvelle todo";
    cy.get("input[type='text']").type(todoInput);

    cy.get("button").contains("Add").click();

    cy.get("li").should("have.length", 1);
    cy.get("li").contains(todoInput);
  });

  it("Supprimer un todo Item", () => {
    cy.get("li").should("have.length", 1).contains("Nouvelle todo");

    cy.get("li button").contains("Supprimer").click();

    cy.get("li").should("have.length", 0);
  });

  it("Valider un todo Item", () => {
    const todoItem = "Todo terminée";

    cy.get("input[type='text']").type(todoItem);
    cy.get("button").contains("Add").click();

    cy.get("li").should("have.length", 1);
    cy.get("li").contains(todoItem);

    cy.get("li button").contains("A faire").click();

    cy.get("li span").contains("✔️");
  });

  it("Modifier un todo Item", () => {
    const oldTodoItem = "Ancienne todo";
    const newTodoItem = "Nouvelle todo";

    cy.get("input[type='text']").type(oldTodoItem);
    cy.get("button").contains("Add").click();

    cy.get("li").should("have.length", 2).contains(oldTodoItem);

    cy.get("li button").eq(-2).contains("Modifier").click();

    cy.get('ul div input[type="text"]').clear().type(newTodoItem);
    cy.get("ul div button").contains("Save").click();

    cy.get("li").contains(oldTodoItem).should("not.exist");
    cy.get("li").contains(newTodoItem);
  });

  it("Ne pas ajouter si l'input est vide", () => {
    cy.get("li").should("have.length", 2);

    cy.get("button").contains("Add").click();

    cy.get("li").should("have.length", 2);
  });

  it("Annuler une modification apres avoir appuyé sur Cancel", () => {
    const oldTodoItem = "Ancienne todo";
    const newTodoItem = "Nouvelle todo";

    cy.get("input[type='text']").type(oldTodoItem);
    cy.get("button").contains("Add").click();

    cy.get("li").should("have.length", 3).contains(oldTodoItem);

    cy.get("li button").eq(-2).contains("Modifier").click();

    cy.get("ul div input[type='text']").clear().type(newTodoItem);
    cy.get("ul div button").contains("Cancel").click();

    cy.get("li").contains(oldTodoItem);
  });
});
