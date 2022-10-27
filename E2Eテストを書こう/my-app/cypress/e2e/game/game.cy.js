describe('ゲーム画面', () => {

  it('勝者が決まったら勝利メッセージが表示する', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[e2e=game-message]').should('have.text', 'Next player: X');

    cy.get('[e2e=0]').click();
    cy.get('[e2e=1]').click();
    cy.get('[e2e=2]').click();
    cy.get('[e2e=3]').click();
    cy.get('[e2e=4]').click();
    cy.get('[e2e=5]').click();
    cy.get('[e2e=7]').click();
    cy.get('[e2e=6]').click();
    cy.get('[e2e=8]').click();
    
    cy.get('[e2e=game-message]').should('have.text', 'Winner: X');
  })

  it('勝者が決まらなければ引き分けメッセージを表示する', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[e2e=game-message]').should('have.text', 'Next player: X');

    cy.get('[e2e=0]').click();
    cy.get('[e2e=1]').click();
    cy.get('[e2e=3]').click();
    cy.get('[e2e=4]').click();
    cy.get('[e2e=7]').click();
    cy.get('[e2e=6]').click();
    cy.get('[e2e=2]').click();
    cy.get('[e2e=5]').click();
    cy.get('[e2e=8]').click();
    
    cy.get('[e2e=game-message]').should('have.text', 'Draw!');
  })
})