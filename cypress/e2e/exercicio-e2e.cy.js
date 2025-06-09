/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
    produtosPage.visitarUrl()
  });

  it('deve adicionar vários produtos ao carrinho usando massa de dados', () => {
    cy.fixture('produtos').then(dados => {
      // Aqui você pode escolher quais produtos usar
      const indices = [1, 2, 3, 4, 5];

      indices.forEach(i => {
        const produto = dados[i];

        produtosPage.buscarProduto(produto.nomeProduto);
        produtosPage.addProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade);
        cy.get('.woocommerce-message').should('contain', produto.nomeProduto);
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        });
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
        cy.get('#billing_first_name').type(faker.person.firstName())
        cy.get('#billing_last_name').type(faker.person.lastName())
        cy.get('#billing_company').type(faker.company.buzzPhrase())
        cy.get('#select2-billing_country-container').click()
        cy.get('.select2-search__field').type('Brasil{enter}');
        cy.get('#billing_address_1').type(faker.location.streetAddress())
        cy.get('#billing_address_2').type(faker.number.binary())
        cy.get('#billing_city').type(faker.location.city())
        cy.get('#select2-billing_state-container').click()
        cy.get('.select2-search__field').type('Rio Grande do Sul{enter}');
        cy.get('#billing_postcode').type(faker.number.float())
        cy.get('#billing_phone').type(faker.phone.number())
        cy.get('#billing_email').type(faker.internet.email())
        cy.get('#order_comments').type(faker.company.buzzPhrase())
        cy.get('#terms').click()
        cy.get('#place_order').click()



    });
  });
});
