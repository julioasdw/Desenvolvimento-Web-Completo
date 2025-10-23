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
            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa === null) {
                continue
            }

            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }
    
    pesquisar(despesa) {
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()

        // console.log(despesasFiltradas)
        // console.log(despesa)
        
        //ano
        if(despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        
        //mes
        if(despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(function(d) {
                return d.mes == despesa.mes
            })
        }

        //dia
        if(despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        //tipo
        if(despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        //descricao
        if(despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        //valor
        if(despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        // console.log(despesasFiltradas)
        return despesasFiltradas
    }

    remover(id) {
        localStorage.removeItem(id)
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
        document.getElementById('exampleModalLabel1').innerHTML = 'Registro inserido com sucesso!'
        document.getElementById('infoModal').innerHTML = 'Despesa cadastrada com sucesso!'
        document.getElementById('corBtnModal').className = ('btn btn-success')
        document.getElementById('corBtnModal').innerHTML = 'Voltar'

        //dialog de sucesso
        $('#modalRegistraDespesa').modal('show') 
        
        ano.value = '' 
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
        
    } else {
        console.log('Dados invalidos!')
        
        document.getElementById('cor_titulo_modal').className = 'modal-header text-danger'
        document.getElementById('exampleModalLabel1').innerHTML = 'Erro Gravação'
        document.getElementById('infoModal').innerHTML = 'Existem campos brigatórios que não foram preenchidos!'
        document.getElementById('corBtnModal').className = ('btn btn-danger')
        document.getElementById('corBtnModal').innerHTML = 'Voltar e corrigir'
        
        $('#registroDespesa').modal('show')
    }
    
}

function carregaListaDespesas(despesas = [], filter = false) {
    
    if(despesas.length == 0 && filter == false  ) {
        despesas = bd.recuperarTodosRegistros()
    }

    // console.log(despesas)

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''      

    despesas.forEach(function(d) {
        // console.log(d)
        let linha = listaDespesas.insertRow()
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        switch(d.tipo) { 
            case '1':
                linha.insertCell(1).innerHTML = 'Alimentação'
                break 
            case '2':
                linha.insertCell(1).innerHTML = 'Educação'
                break
            case '3':
                linha.insertCell(1).innerHTML = 'Lazer'
                break 
            case '4':
                linha.insertCell(1).innerHTML = 'Saúde'
                break
            case '5':
                linha.insertCell(1).innerHTML = 'Transporte'
                break 
        }            

        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //Criar btn de excluir
        let btn = document.createElement("button")
        btn.className = "btn btn-danger"
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}` // isso vai criar um id=1,2,3... no elemento do botão criado
        btn.onclick = function() {
            // alert(this.id)
            let id = this.id.replace('id_despesa_', '')

            bd.remover(id)
            
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
        
        
        console.log(d)
    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    // Despesas filtradas
    let despesas = bd.pesquisar(despesa)

    // "listaDespesas" é o lemento <tbody id="listaDespesas"> do consulta.html
    let listaDespesas = document.getElementById('listaDespesas')

    carregaListaDespesas(despesas, true)
    
    // Vai limpar a tabela
    // listaDespesas.innerHTML = '' 


    

}