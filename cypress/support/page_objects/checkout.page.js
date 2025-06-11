import { faker } from '@faker-js/faker';

function gerarTelefoneValido() {
  const ddd = '11';
  const prefixo = '9';
  const sufixo = faker.number.int({ min: 10000000, max: 99999999 }).toString();
  return `${ddd}${prefixo}${sufixo}`;
}

class CheckoutPage {
  preencherFormulario() {
    cy.get('#billing_first_name').type(faker.person.firstName());
    cy.get('#billing_last_name').type(faker.person.lastName());
    cy.get('#billing_company').type(faker.company.name());

    cy.get('#select2-billing_country-container').click();
    cy.get('.select2-search__field').type('Brasil{enter}');

    cy.get('#billing_address_1').type(faker.location.streetAddress());
    cy.get('#billing_address_2').type(faker.string.alphanumeric(5));
    cy.get('#billing_city').type(faker.location.city());

    cy.get('#select2-billing_state-container').click();
    cy.get('.select2-search__field').type('Rio Grande do Sul{enter}');

    const cep = `${faker.number.int({ min: 10000, max: 99999 })}-${faker.number.int({ min: 100, max: 999 })}`;
    cy.get('#billing_postcode').type(cep);

    const telefone = gerarTelefoneValido();
    cy.get('#billing_phone').type(telefone);

    cy.get('#billing_email').type(faker.internet.email());
    cy.get('#order_comments').type(faker.lorem.sentence());

    cy.get('#terms').click();
  }

  finalizarPedido() {
    cy.get('#place_order').click();
  }
  validarPedidoRecebido() {
  cy.get('.woocommerce-thankyou-order-received', { timeout: 10000 })
    .should('contain', 'Obrigado. Seu pedido foi recebido.');
}

}

export default new CheckoutPage();
