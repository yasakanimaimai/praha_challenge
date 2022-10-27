describe('ゲーム画面', () => {

  it('勝者が決まったら勝利メッセージが表示する', () => {
    cy.visit('http://localhost:3000/');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[e2e="0"]').click();
    cy.get('[e2e="1"]').click();
    cy.get('[e2e="2"]').click();
    cy.get('[e2e="5"]').click();
    cy.get('[e2e="4"]').click();
    cy.get('[e2e="3"]').click();
    cy.get('[e2e="7"]').click();
    cy.get('[e2e="8"]').click();
    cy.get('[e2e="6"]').click();
    cy.get('.game-info > div').should('have.text', 'Winner: X');
    /* ==== End Cypress Studio ==== */
  })

  it('勝者が決まらなければ引き分けメッセージを表示する', () => {
    cy.visit('http://localhost:3000/');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[e2e="0"]').click();
    cy.get('[e2e="1"]').click();
    cy.get('[e2e="3"]').click();
    cy.get('[e2e="4"]').click();
    cy.get('[e2e="7"]').click();
    cy.get('[e2e="6"]').click();
    cy.get('[e2e="2"]').click();
    cy.get('[e2e="5"]').click();
    cy.get('[e2e="8"]').click();
    cy.get('.game-info > div').should('have.text', 'Draw!');
    /* ==== End Cypress Studio ==== */
  })
})