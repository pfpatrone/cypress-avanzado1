// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (usuario, password) =>
{
    cy.request({
        method: "POST",
        url: `${Cypress.env().apiUrl}/login`,
        body:
        {
            username: usuario,
            password: password
        },
    }).then(respuesta => {
        window.localStorage.setItem('token',respuesta.body.token);
        window.localStorage.setItem('user',respuesta.body.user.username);
        window.localStorage.setItem('userId', respuesta.body.user._id);
        Cypress.env().token = respuesta.body.token;
    });
})

Cypress.Commands.add('eliminarProductId', (id) =>
{
    cy.request({
        method: 'GET',
        url: `${Cypress.env().apiUrl}/products?id=${id}`,
        headers: { Authorization: `Bearer ${Cypress.env().token}` },
    }).its('body.products.docs').each((product) => {
        cy.request({
            method: "DELETE",
            url: `${Cypress.env().apiUrl}/product/${product._id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`,
              }
        });
    });

})

Cypress.Commands.add('crearProducto', (body) =>
{
    cy.request({
        method: 'POST',
        url: `${Cypress.env().apiUrl}/create-product`,
        body: body,
    })

})


Cypress.Commands.add('editProduct', (id,name,price,img) =>
{
   cy.request({
        method: 'GET',
        url: `${Cypress.env().apiUrl}/products?id=${id}`,
        headers: { Authorization: `Bearer ${Cypress.env().token}` },
    }).its('body.products.docs').each((product) => {
        cy.request({
            method: "PUT",
            url: `${Cypress.env().apiUrl}/product/${product._id}`,
            headers: { Authorization: `Bearer ${Cypress.env().token}` },
            body: 
            {
                name: name,
                price: price,
                img: img
            }
        });
    });

})
    
Cypress.Commands.add('checkNameProduct', (text) =>
{
    cy.get("[id='name']").invoke("text").should("eq", text);
})

Cypress.Commands.add('checkPriceProduct', (text) =>
{
    cy.get("[id='price']").invoke("text").should("eq", text);
})


Cypress.Commands.add('checkUrlProduct', (text) =>
{
    cy.get('img.chakra-image').invoke('attr', 'src').then((src) => {
        // Aquí puedes comparar el valor de src
        expect(src).to.eq(text);
      });
})
