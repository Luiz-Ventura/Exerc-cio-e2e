/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";
import checkoutPage from '../support/page_objects/checkout.page';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  beforeEach(() => {
    produtosPage.visitarUrl();
  });

  it('deve adicionar vários produtos ao carrinho e finalizar pedido', () => {
    cy.fixture('produtos').then(dados => {
      const indices = [1, 2, 3, 4];

      indices.forEach(i => {
        const produto = dados[i];
        produtosPage.buscarProduto(produto.nomeProduto);
        produtosPage.addProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade);
        cy.get('.woocommerce-message').should('contain', produto.nomeProduto);
      });

      // Acessa o carrinho e checkout
      cy.get('.dropdown-toggle > .text-skin > .icon-basket').click();
      cy.get('a.checkout:visible').should('be.visible').click();

      // Preenche o checkout e finaliza
      checkoutPage.preencherFormulario();
      checkoutPage.finalizarPedido();


      // Valida mensagem de pedido recebido
      checkoutPage.validarPedidoRecebido();

    });
  });
});
