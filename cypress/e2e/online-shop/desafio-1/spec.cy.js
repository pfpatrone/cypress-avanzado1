/// <reference types = "cypress" /> 

import { onlineShopPage } from "../../../support/pageObjects/online-shop"

const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {

    it(`${module} `, () => {
       //Ingresar en Pushing IT
        cy.visit('/');

        cy.fixture("online-shop/desafio-1/fixture").then((data) => {   
            onlineShopPage.iniciarSesion();
            onlineShopPage.userName(data.user);
            onlineShopPage.password(data.pass);
            onlineShopPage.submitForm();
           
            
             //validar usuario
            onlineShopPage.validateLoginUser(data.user);
    

            // Dirigirse a Online Shop
            onlineShopPage.homePageOnline();
          
           
            //Agregar un producto nuevo
            onlineShopPage.addProduct();
            onlineShopPage.productName(data.productName);
            onlineShopPage.productPrize(data.productPrize);
            onlineShopPage.productUrl(data.productUrl);
            onlineShopPage.productId(data.productId);
            onlineShopPage.createProduct();

            //validar el message_alert
            onlineShopPage.closeAlert();
            
            //Buscar el producto por su ID en el search
            onlineShopPage.selectByID();
            onlineShopPage.searchProduct(data.productId);

            //Eliminar el producto
            cy.wait(2000);
            onlineShopPage.deleteProduct(data.productId);
            onlineShopPage.confirmDelete();
            onlineShopPage.closeAlert();
            
            //Volver a buscar el producto
            onlineShopPage.selectByID();
            onlineShopPage.searchProduct(data.productId);
            //Verificar que el producto no exista
            onlineShopPage.checkExistProduct(data.productName);
         

        });
        cy.log('Verificar que exista, si existe eliminarlo');


        cy.log(`Crear un producto numero ${testCaseId}`)
    });


});