var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function() {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '37999998811',
            address: {
                postalcode: '35501222',
                street: 'Rua Marquês de Olinda',
                number: '470',
                details: 'Casa',
                district: 'Catalão',
                city_state: 'Divinópolis/MG'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return data
    }
}