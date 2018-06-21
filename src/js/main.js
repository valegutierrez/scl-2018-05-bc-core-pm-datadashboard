const lecTable = document.getElementById('infoLectureTable');
const infTable = document.getElementById('generalInfBody');
const btnLecture = document.getElementById('lectures');
const btnInformation = document.getElementById('generalInfo');
const inpStudent = document.getElementById('userFinder');

// Se llama al momento de hacer click en el botón Información General
const generalInformation = usersData => {
  btnInformation.addEventListener('click', () => {
    const filterStudents = usersData.filter(element => element.role === 'student');// Busca a las estudiantes dentro del array
    const renderUsers = filterStudents.forEach(element => {
      let names = `<tr><td>${element.name}</td><td></td><td></td><td></td></tr>`;
      return infTable.innerHTML += names;
    });
    changeTitle('INFORMACIÓN GENERAL');
    hideContent();
    document.getElementById('generalInformation').style.display = 'block';
  });
};
// Se llama al momento de hacer click en el botón Avance de Lecturas
const lectureProgress = usersData => {
  btnLecture.addEventListener('click', () => {
    const filterStudents = usersData.filter(element => element.role === 'student');// Busca a las estudiantes dentro del array
    const renderUsers = filterStudents.forEach(element => {
      let names = `<tr><td>${element.name}</td><td></td><td></td><td></td><td></td></tr>`;
      return lecTable.innerHTML += names;
    });
    changeTitle('AVANCE DE LECTURAS');// Cambia el titulo por información general
    hideContent();// Esconde todos los contenidos
    document.getElementById('lectureProgressPage').style.display = 'block';// Muestra el contenido información general
  });
};

const getCohorts = cohortsData => {
  const renderCohorts = cohortsData.forEach(element => {
    let cohortElement = `<a class="dropdown-item" href="#">${element.id}</href>`;
    return cohortsList.innerHTML += cohortElement;
  });
  return renderCohorts;
};


function findUser(usersData) {
  const filterStudents = usersData.filter(element => element.role === 'student');
  inpStudent.addEventListener('input', () => {
    var returnName = [];
    for (i = 0; i < filterStudents.length; i++) {
      if ()
      returnName.push(filterStudents[i]);
    }
  });
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
// Cambia el titulo del dashboard
const changeTitle = titleText => {
  document.getElementById('titleDashboard').innerText = titleText;
};

const hideContent = () => {
  const bodyContentChild = document.getElementById('bodyContent').children;
  for (let i = 0;i < bodyContentChild.length;i++) {
    bodyContentChild[i].style.display = 'none';
  }   
};

function ComputeUserStats(users, progress, courses) {

}