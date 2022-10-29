describe('ゲーム画面', () => {

  it('勝者が決まったら勝利メッセージが表示する', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy=game-message]').should('have.text', 'Next player: X');

    cy.get('[data-cy=0]').click();
    cy.get('[data-cy=1]').click();
    cy.get('[data-cy=2]').click();
    cy.get('[data-cy=3]').click();
    cy.get('[data-cy=4]').click();
    cy.get('[data-cy=5]').click();
    cy.get('[data-cy=7]').click();
    cy.get('[data-cy=6]').click();
    cy.get('[data-cy=8]').click();
    
    cy.get('[data-cy=game-message]').should('have.text', 'Winner: X');
  })

  it('勝者が決まらなければ引き分けメッセージを表示する', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy=game-message]').should('have.text', 'Next player: X');

    cy.get('[data-cy=0]').click();
    cy.get('[data-cy=1]').click();
    cy.get('[data-cy=3]').click();
    cy.get('[data-cy=4]').click();
    cy.get('[data-cy=7]').click();
    cy.get('[data-cy=6]').click();
    cy.get('[data-cy=2]').click();
    cy.get('[data-cy=5]').click();
    cy.get('[data-cy=8]').click();
    
    cy.get('[data-cy=game-message]').should('have.text', 'Draw!');
  })
})