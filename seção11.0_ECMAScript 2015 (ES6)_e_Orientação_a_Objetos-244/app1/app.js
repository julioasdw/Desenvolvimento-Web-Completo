class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    
    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null || this[i] == NaN) {
                return false
            }
        }
        return true

    }
}

class Bd {
    constructor() {
        let id = localStorage.getItem('id')
        console.log(id)
        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return (parseInt(proximoId) + 1)
    }

    gravar(d) {
        let id = this.getProximoId()
        
        localStorage.setItem(id, JSON.stringify(d))
        
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        let despesas = Array()

        let id = localStorage.getItem('id')

        for(let i = 0; i <= id; i++) {
            despesas.push(JSON.parse(localStorage.getItem(i)))
        }

        console.log(despesas)
    }
    
}

let bd = new Bd()

// // como converter para JSON:
// let pro = {
//         a: 'nome', 
//         b: 1700
//     }
//     JSON.stringify(pro)


// como converter de JSON para OBJ:
// let proJSON = '{"teste": "test", "b": "aaaa"}' // string JSON
// let objeto = JSON.parse(proJSON)

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    
    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
    // console.log(despesa)

    // document.getElementById('exampleModalLabel1').innerText = 'TESTE'
    // document.getElementById('infoModal').innerText = 'aaaaaaaa'
    // document.getElementById('corBtnModal').classList.toggle('btn-success')



    if(despesa.validarDados()) {
        console.log('Dados validos!')
        bd.gravar(despesa)
        $('#registroDespesa').modal('show')

        document.getElementById('cor_titulo_modal').className = 'modal-header text-success'
        document.getElementById('exampleModalLabel1').innerText = 'Registro inserido com sucesso!'
        document.getElementById('infoModal').innerText = 'Despesa cadastrada com sucesso!'
        document.getElementById('corBtnModal').className = ('btn btn-success')
        document.getElementById('corBtnModal').innerText = 'Voltar'
        
    } else {
        console.log('Dados invalidos!')
        $('#registroDespesa').modal('show')

        document.getElementById('cor_titulo_modal').className = 'modal-header text-danger'
        document.getElementById('exampleModalLabel1').innerText = 'Erro Gravação'
        document.getElementById('infoModal').innerText = 'Existem campos brigatórios que não foram preenchidos!'
        document.getElementById('corBtnModal').className = ('btn btn-danger')
        document.getElementById('corBtnModal').innerText = 'Voltar e corrigir'
    }
}

function carregaListaDespesas() {
    bd.recuperarTodosRegistros()
}