const cidade = document.getElementById('cidade')
const logradouro = document.getElementById('endereco')
const estado = document.getElementById('estado')
const bairro = document.getElementById('bairro')
const mensagemErro = document.getElementById('erro')
mensagemErro.innerHTML = ''

async function buscaEndereco(cep) {
  try {
    let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json`)
    let consultaCepJson = await consultaCEP.json()
    if (consultaCepJson.erro) {
      throw Error('Cep não é valido!')
    }
    cidade.value = consultaCepJson.localidade
    logradouro.value = consultaCepJson.logradouro
    estado.value = consultaCepJson.uf
    bairro.value = consultaCepJson.bairro
    console.log(consultaCepJson)

    return consultaCepJson
  } catch (erro) {
    console.log(erro)
    mensagemErro.innerHTML = `<p>CEP inválido.</p>`
  }
}

const cep = document.getElementById('cep')
cep.addEventListener('focusout', () => buscaEndereco(cep.value))
