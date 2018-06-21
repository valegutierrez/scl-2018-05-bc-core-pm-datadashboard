// constantes de tablas en html
const lecTable = document.getElementById('infoLectureTable');
const infTable = document.getElementById('generalInfBody');

// constantes de secciones de la página
const infPage = document.getElementById('generalInformationPage');
const lecPage = document.getElementById('lectureProgressPage');

// constantes de botones
const btnLecture = document.getElementById('lectures');
const btnInformation = document.getElementById('generalInfo');

// constante de input
const inpStudent = document.getElementById('userFinder');

// Se llama al momento de hacer click en el botón Información General
function generalInformation(users) {
  btnInformation.addEventListener('click', () => {
    const filterStudents = users.filter(element => element.role === 'student');// Busca a las estudiantes dentro del array
    const renderUsers = filterStudents.forEach(element => {
      let names = `<tr><td>${element.name}</td><td></td><td></td><td></td></tr>`;
      return infTable.innerHTML += names;
    });
    changeTitle('INFORMACIÓN GENERAL');
    hideContent();
    infPage.style.display = 'block';
  });
};
// Se llama al momento de hacer click en el botón Avance de Lecturas
function lectureProgress(users) {
  btnLecture.addEventListener('click', () => {
    const filterStudents = users.filter(element => element.role === 'student');// Busca a las estudiantes dentro del array
    const renderUsers = filterStudents.forEach(element => {
      let names = `<tr><td>${element.name}</td><td></td><td></td><td></td><td></td></tr>`;
      return lecTable.innerHTML += names;
    });
    changeTitle('AVANCE DE LECTURAS');// Cambia el titulo por información general
    hideContent();// Esconde todos los contenidos
    lecPage.style.display = 'block';// Muestra el contenido información general
  });
};

function getCohorts(cohorts) {
  const renderCohorts = cohorts.forEach(element => {
    let cohortElement = `<a class="dropdown-item" href="#">${element.id}</href>`;
    return cohortsList.innerHTML += cohortElement;
  });
  return renderCohorts;
};

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
// Cambia el titulo del dashboard
const changeTitle = titleText => {
  document.getElementById('titleDashboard').innerText = titleText;
};

function hideContent() {
  const bodyContentChild = document.getElementById('bodyContent').children;
  for (let i = 0;i < bodyContentChild.length;i++) {
    bodyContentChild[i].style.display = 'none';
  }   
};

function ComputeUserStats(users, progress, courses) {

}