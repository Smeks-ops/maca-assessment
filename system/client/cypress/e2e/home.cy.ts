// describe('empty spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('SubmitReceiptPageButton.cy.ts', () => {

  it('Opens Purchase Reimbursement Form', () => {
    // cy.mount()
    cy.visit('http://localhost:3000/')
    cy.contains('Submit a Receipt').click()
    cy.url().should('include', '/form')

    cy.get('input[name="purchaseName"]').type('John Doe')
    cy.get('input[name="date"]').type('2020-01-01')
    cy.get('input[name="amount"]').type('100')
    cy.get('textarea').type('Test Description')
    cy.get('input[name="receipt"]').selectFile('cypress/fixtures/testImage.png')

    cy.contains('Submit').click()
  })
})

describe('UploadsButton.cy.ts', () => {

  it('Gets all uploads', () => {
    // cy.mount()
    cy.visit('http://localhost:3000/')
    cy.contains('Uploads').click()
    cy.url().should('include', '/uploads')
  })
})