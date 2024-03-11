/// <reference types = "cypress" /> 

import { onlineShopPage } from "../../../support/pageObjects/online-shop"

const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {
    //API
    //1.Ingresar en pushing IT
    beforeEach(()=> {
        cy.login(Cypress.env().usuario, Cypress.env().password)
        cy.visit('');
    });

    it(`${module} - API`, () => {
       //Ingresar en Pushing IT
       cy.fixture(`${module}/${scenarioName}-${testCaseId}/fixture`).then((data) => {
            //2.Buscar el producto 
             // 3.Eliminar el producto si existe
            //ambos pasos los juntos como explicó el profe, si lo encuentra, lo elimina. Sino no hace nada
            cy.eliminarProductId(data.product.id);

            //4.Crear el producto
            cy.crearProducto(data.product);
            //5.Editar el producto (nombre, precio e imagen unicamente)
            cy.editProduct(data.product.id, data.newProduct.name, data.newProduct.price, data.newProduct.img);

       })

    });

    it.only(`${module} - FE`, () => {
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/fixture`).then((data) => {
        
             //FE
             //1.Visitar la pagina
             cy.visit('');
             //2.Dirigirse al online Shop
             onlineShopPage.homePageOnline();
             //Buscar el producto por su ID en el search
             onlineShopPage.selectByID();
             onlineShopPage.searchProduct(data.product.id);
             //Verificar que los datos del producto corresponden a los enviados en la edicion
             cy.checkNameProduct(data.newProduct.name);
             cy.checkPriceProduct(data.newProduct.price);
             cy.checkUrlProduct(data.newProduct.img);

            })
     });

});