const lecTable = document.getElementById('infoLectureTable');
const btnLecture = document.getElementById('lectures');

const lectureProgress = dataUsers => {
  btnLecture.addEventListener('click', () => {
    const filterStudents = dataUsers.filter(element => element.role === 'student');// Busca a las estudiantes dentro del array
    const renderUsers = filterStudents.forEach(element => {
      let names = `<tr><td>${element.name}</td><td></td><td></td><td></td><td></td></tr>`;
      return lecTable.innerHTML += names;
    });
    tableAppear();
    return renderUsers;
  });
};

const tableAppear = () => {
  changeTitle('AVANCE DE LECTURAS');//Cambia el titulo
  hideContent();//Esconde todos los contenidos
  document.getElementById('lectureProgressPage').style.display = 'block';//Muestra el contenido avance de lectura
};

function findUser(dataUsers) {
  /* Autocompleta el input con los nombres de las estudiantes */
}


function printLectures() {
  /* imprime la data del array dentro de la tabla */ 
}

function exerciseProgress() {
  /* Se llaman los arrays de .JSON para usarlos en la siguiente función */
  printExercises();
}

function printExercises() {
  /* imprime la data del array dentro de la tabla */ 
}
//Se llama al momento de hacer click en el menú información general
function generalInformation() {
  document.getElementById('generalInfBody').innerHTML = '';
  fetch(usersJson)
    .then(response => response.json())
    .then(dataUsers => {
      const filterStudents = dataUsers.filter(element => element.role === 'student');// Busca a las estudiantes dentro del array
      const renderUsers = filterStudents.forEach(element => {
        let names = `<tr><td>${element.name}</td><td></td><td></td><td></td></tr>`;
        document.getElementById('generalInfBody').innerHTML += names;
      });
    });
  changeTitle('INFORMACIÓN GENERAL');//Cambia el titulo por información general
  hideContent();//Esconde todos los contenidos
  document.getElementById('generalInformation').style.display = 'block';//muestra el contenido información general
}
//Cambia el titulo del dashboard
function changeTitle(titleText) {
  document.getElementById('titleDashboard').innerText = titleText;
}
function hideContent() {
  const bodyContentChild = document.getElementById('bodyContent').children;
  for (let i = 0;i < bodyContentChild.length;i++) {
    bodyContentChild[i].style.display = 'none';
  }   
}