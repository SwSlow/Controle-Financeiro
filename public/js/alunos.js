const myModal = new bootstrap.Modal("#addAluno-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    alunos: []
};  

document.getElementById("button-logout").addEventListener("click", logout);

//Adicionar aluno
document.getElementById("addAluno-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name-input").value;
    const cel = document.getElementById("cel-input").value;
    const value = parseFloat(document.getElementById("value-input").value);
    const date = document.getElementById("date-input").value;


    data.alunos.unshift ({
        name: name, cel: cel, value: value, date: date
    }); 
    
    saveData(data);
    e.target.reset();
    myModal.hide();

    getAlunos();

    alert("Aluno Adicionado!");

});

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session)
        logged = session;
    }

    if(!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    getAlunos();

}

function getAlunos() {
    const alunos = data.alunos;
    let alunosHtml = ``;

    if(alunos.length){
        alunos.forEach((item) => {

            if  (item.type === "2"){
                type = "saída";
            }

            alunosHtml += `
                <tr>
                    <th scope="row">${item.name}</th>
                    <td>${item.cel}</td>
                    <td>R$${item.value.toFixed(2)}</td>
                    <td>${item.date}</td>
                </tr>
            `

        })
    }

    document.getElementById("alunos-list").innerHTML = alunosHtml;
}