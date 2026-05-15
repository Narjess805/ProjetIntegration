describe('Gestion des étudiants', () => {
    beforeEach(() => {
        // Intercept API calls to provide mock data
        cy.intercept('GET', '**/api/departements', {
            statusCode: 200,
            body: [
                { id: 1, nom: 'Informatique' },
                { id: 2, nom: 'Gestion' }
            ]
        }).as('getDepartements');

        cy.intercept('POST', '**/api/etudiants', {
            statusCode: 201,
            body: { id: 2, nom: 'Alice Martin', email: 'alice.martin@universite.tn', cin: '12345678', departementId: 1 }
        }).as('createEtudiant');
        
        cy.intercept('GET', '**/api/etudiants/*', {
            statusCode: 200,
            body: { id: 1, nom: 'John Doe', email: 'john@example.com', cin: '12345678', departementId: 1, age: 20 }
        }).as('getOneEtudiant');
    });

    it('affiche la liste des étudiants', () => {
        cy.intercept('GET', '**/api/etudiants', {
            statusCode: 200,
            body: [
                { id: 1, nom: 'John Doe', email: 'john@example.com', cin: '12345678', departementNom: 'Informatique', age: 20 }
            ]
        }).as('getEtudiants');

        cy.visit('http://localhost:3000/etudiants');
        cy.wait('@getEtudiants');
        cy.get('[data-testid="etudiant-list"]').should('be.visible');
        cy.get('[data-testid="etudiant-item"]').should('have.length.greaterThan', 0);
    });

    it('crée un nouvel étudiant', () => {
        // First load of the list (optional, but good for stability)
        cy.intercept('GET', '**/api/etudiants', {
            statusCode: 200,
            body: []
        }).as('getEtudiantsEmpty');

        // Load after creation
        cy.intercept('GET', '**/api/etudiants', {
            statusCode: 200,
            body: [
                { id: 2, nom: 'Alice Martin', email: 'alice.martin@universite.tn', cin: '12345678', departementNom: 'Informatique', age: 24 }
            ]
        }).as('getEtudiantsFull');

        cy.visit('http://localhost:3000/etudiants/new');
        cy.wait('@getDepartements');

        cy.get('[name="nom"]').type('Alice Martin');
        cy.get('[name="cin"]').type('12345678');
        cy.get('[name="dateNaissance"]').type('2000-01-01');
        cy.get('[name="email"]').type('alice.martin@universite.tn');
        cy.get('[name="anneePremiereInscription"]').clear().type('2024');
        cy.get('[name="departementId"]').select('1');

        cy.get('[type="submit"]').click();
        
        cy.wait('@createEtudiant');
        // The app should redirect to /etudiants which triggers a GET /api/etudiants
        cy.wait('@getEtudiantsFull');
        
        cy.contains('Alice Martin', { timeout: 10000 }).should('be.visible');
    });
});