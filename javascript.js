var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");
var form3 = document.getElementById("form3");

var prox1 = document.getElementById("prox1");
var prox2 = document.getElementById("prox2");
var ant1 = document.getElementById("ant1");
var ant2 = document.getElementById("ant2");

var progresso = document.getElementById("progresso");

prox1.onclick = function() {
    var cpf = document.getElementById("cpf").value;
    if (!testaCPF(cpf)) {
        alert("CPF inválido");
        return false;
    }
    form1.style.left = "-450px";
    form2.style.left = "40px";
    progresso.style.width = "240px";
}

ant1.onclick = function() {
    form1.style.left = "40px";
    form2.style.left = "450px";
    progresso.style.width = "120px";
}

prox2.onclick = function() {
    form2.style.left = "-450px";
    form3.style.left = "40px";
    progresso.style.width = "360px";

    data = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        datanasc: document.getElementById("datanasc").value,
        cep: document.getElementById("cep").value,
        logradouro: document.getElementById("logradouro").value,
        bairro: document.getElementById("bairro").value,
        numero: document.getElementById("numero").value
    }

    sessionStorage.setItem("formData", JSON.stringify(data));

    if(sessionStorage.getItem("formData")) {
        var formData = JSON.parse(sessionStorage.getItem("formData"));
        document.getElementById("nome1").innerHTML = formData.nome;
        document.getElementById("cpf1").innerHTML = formData.cpf;
        document.getElementById("datanasc1").innerHTML = formData.datanasc;
        document.getElementById("endereco").innerHTML = formData.logradouro + ", " + formData.numero + ", " + formData.bairro + ".";
    }
    
}

ant2.onclick = function() {
    form2.style.left = "40px";
    form3.style.left = "450px";
    progresso.style.width = "240px";
}

function fMasc(objeto,mascara) {
    obj=objeto
    masc=mascara
    setTimeout("fMascEx()",1)
}

function fMascEx() {
    obj.value=masc(obj.value)
}

function mCPF(cpf){
    cpf=cpf.replace(/\D/g,"")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    return cpf
}

const cep = document.querySelector("#cep")

const showData = (result)=>{
    for(const campo in result){
        if(document.querySelector("#"+campo)){
            document.querySelector("#"+campo).value = result[campo]
        }
    }
}

cep.addEventListener("blur",(e)=>{
    let search = cep.value.replace("-","")
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://viacep.com.br/ws/${search}/json/`, options)
    .then(response =>{ response.json()
        .then( data => showData(data))
    })
    .catch(e => console.log('Deu Erro: '+ e,message))
})

function testaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}