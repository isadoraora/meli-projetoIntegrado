const mongoose = require('mongoose');

//schema de clientes
//caracteristicas dos clientes 

const ClientesSchema = new mongoose.Schema({
    nome: { type: String },
    email: { type: String},
    cpf: { type: Number },
    dataNascimento: { type: Date },
    estadoCivil: { type: String },
    telefone: { type: Number },
    comprou: { type: Boolean }
}, {
    versionKey: false
})
//se tiver algum campo obrigatório é só colocar required:true

//falamos então pro mongoose que temos esse model abaixo e quais infos têm:
const Clientes = mongoose.model('Clientes', ClientesSchema);
module.exports = Clientes; 