describe('Todo List E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Adjust the URL if your app is served at a different port
  });

  it('should allow me to add a new todo', () => {
    const newItem = 'Feed the cat';

    // Start with an empty DB for a consistent test state
    cy.request('POST', 'http://localhost:3001/reset');

    // Type new todo item and submit
    cy.get('input[type="text"]').type(newItem);
    cy.get('button').contains('Add Todo').click();

    // The new item should be visible in the list
    cy.get('ul').should('contain', newItem);
  });
});
