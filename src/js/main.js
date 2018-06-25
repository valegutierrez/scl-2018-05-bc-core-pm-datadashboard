let gUsers;
let gProgress;
let gCourses;
let gCohorts;

window.onload = function start() {
  
  getApiData('scl-2018-05-bc-core-am');
  
};
function getApiData(cohort) {
  hideContent();
  titleCohort.innerText = 'cargando...';
  Promise.all([ // Llama la info de API en paralelo(Todas a la vez)
    fetch('https://api.laboratoria.la/cohorts/' + cohort + '/users'),
    fetch('https://api.laboratoria.la/cohorts/' + cohort + '/progress'),
    fetch('https://api.laboratoria.la/cohorts/' + cohort + '/courses'),
    fetch('http://api.laboratoria.la/cohorts/')
  ]).then((responses)=>{ // Se cumplen promesas
    return Promise.all(responses.map((response => response.json()))); 
  }).then((responseJsons)=>{ // Transforma respuestas en objetos Json
    const users = responseJsons[0].filter(element => element.role === 'student');
    const progress = responseJsons[1];
    const courses = responseJsons[2];
    const cohorts = responseJsons[3];
    //Actualiza las variables globales.
    gUsers = users;
    gProgress = progress;
    gCourses = courses;
    gCohorts = cohorts;

    if (users && progress && courses) {
      computeUsersStats(users, progress, courses);// Llama al computeUsersStats con datos obtenidos de la API
      getCohorts(cohorts);
    }
    titleCohort.innerText = cohort;
    console.log(filterUsers(users, 'lor')); // Debería devolver solo un elemento en el array.
    console.log(filterUsers(users, 'ana')); // Debería devolver tres elemento en el array.
    console.log(sortUsers(users, 'quizzesPercent', 'DESC'));

  }).catch(
    (error)=>{ // Si una llamada falla, se ejecuta error.
      console.log('Error al llamar API.' + error);
    });
}
// Constantes de tablas en html.
const lecTable = document.getElementById('infoLectureTable');
const infTable = document.getElementById('generalInfBody');
const resStdTable = document.getElementById('resumenStudentBody');
const pQuizzesTable = document.getElementById('pQuizzesTable');
const pEjerciciosTable = document.getElementById('pEjerciciosTable');
const infoPQuizzesTable = document.getElementById('infoPQuizzesTable');
const infoPEjerciciosTable = document.getElementById('infoPEjerciciosTable');

// Constantes de secciones de la página.
const infPage = document.getElementById('generalInformationPage');
const lecPage = document.getElementById('lectureProgressPage');
const resStdPage = document.getElementById('resumenStudentPage');
const pQuizzesProgressPage = document.getElementById('pQuizzesProgressPage');
const pEjerciciosProgressPage = document.getElementById('pEjerciciosProgressPage');

// Constantes de botones.
const btnLecture = document.getElementById('lectures');
const btnInformation = document.getElementById('generalInfo');
const btnResumenAlumna = document.getElementById('btnResumenAlumna');
const pQuizzes = document.getElementById('pQuizzes');
const pEjercicios = document.getElementById('pEjercicios');

// Constante de input.
const inpStudent = document.getElementById('userFinder');

btnInformation.addEventListener('click', () => {
  generalInformation(gUsers);
  resumenCohort(gUsers);
});
// Se llama al momento de hacer click en el botón de Información General.
function generalInformation(users) {
  changeTitle('INFORMACIÓN GENERAL');
  hideContent();
  document.getElementById('generalInfBody').innerHTML = '';
  const renderUsers = users.forEach(element => {
    // Los promedios se obtienen de aquí.
    let averageStudent = Math.round((element.stats.reads.percent + element.stats.quizzes.percent + element.stats.exercises.percent) / 3);
    let names = `<tr><td>${element.name}</td><td>${averageStudent}%</td><td>${element.stats.reads.percent}%</td><td>${element.stats.quizzes.percent}%</td><td>${element.stats.exercises.percent}%</td></tr>`;
    return infTable.innerHTML += names; 
  });
  
  infPage.style.display = 'block';
}
btnResumenAlumna.addEventListener('click', () => {
  if (inpStudent.value !== '') {
    // Armamos objeto options, con las propiedades solicitadas.
    const options = {
      cohort: gCohorts,
      cohortData: {
        users: gUsers,
        progress: gProgress,
        courses: gCourses
      },
      orderBy: 'name',
      orderDirection: 'ASC',
      search: inpStudent.value
    };
    // Hacemos la llamada a la función processCohortData.
    processCohortData(options);
    resumenStudentBody(gUsers, inpStudent.value);
  } else {
    resStdTable.innerHTML = '';
    let names = `<tr colspan="5"><td>Tiene que ingresar algún filtro para buscar alumnas</td></tr>`;
    resStdTable.innerHTML += names;
    hideContent();
    resStdPage.style.display = 'block';
  }
});
function resumenStudentBody(users, search) {
  changeTitle('RESUMEN ALUMNA');
  hideContent();
  resStdTable.innerHTML = '';
  filterUsers(users, search).forEach(element => {
    // Los promedios se obtienen de aquí.
    let averageStudent = Math.round((element.stats.reads.percent + element.stats.quizzes.percent + element.stats.exercises.percent) / 3);
    let names = `<tr><td>${element.name}</td><td>${averageStudent}%</td><td>${element.stats.reads.percent}%</td><td>${element.stats.quizzes.percent}%</td><td>${element.stats.exercises.percent}%</td></tr>`;
    return resStdTable.innerHTML += names; 
  });
  resStdPage.style.display = 'block';
}
// RESUMEN COHORT
function resumenCohort(users) {
  let sinAvance = [0, 0, 0]; // Acumulador para sin avance de Quizzes, Lecturas, Ejercicios.
  let noOptimo = [0, 0, 0]; // Acumulador para no óptimo de Quizzes, Lecturas, Ejercicios.
  let optimo = [0, 0, 0]; // Acumulador para óptimo de Quizzes, Lecturas, Ejercicios.
  users.forEach(element => {
    if (element.stats.quizzes.percent === 0) {
      sinAvance[0]++;
    }
    if (element.stats.reads.percent === 0) {
      sinAvance[1]++;
    }
    if (element.stats.exercises.percent === 0) {
      sinAvance[2]++;
    }
    if (element.stats.quizzes.percent > 0 && element.stats.quizzes.percent < 70) {
      noOptimo[0]++;
    }
    if (element.stats.reads.percent > 0 && element.stats.reads.percent < 70) {
      noOptimo[1]++;
    }
    if (element.stats.exercises.percent > 0 && element.stats.exercises.percent < 70) {
      noOptimo[2]++;
    }
    if (element.stats.quizzes.percent >= 70 && element.stats.quizzes.percent <= 100) {
      optimo[0]++;
    }
    if (element.stats.reads.percent >= 70 && element.stats.reads.percent <= 100) {
      optimo[1]++;
    }
    if (element.stats.exercises.percent >= 70 && element.stats.exercises.percent <= 100) {
      optimo[2]++;
    }
  });
  summaryCohorts(sinAvance, noOptimo, optimo, users.length);
};

// Porcentajes totales.
function summaryCohorts(sinAvance, noOptimo, optimo, userCount) {
  const progressRow = document.getElementById('progressRow');
  const notOptimalRow = document.getElementById('notOptimalRow');
  const optimalRow = document.getElementById('optimalRow');
  const totalRow = document.getElementById('totalRow');
  totalRow.children[1].innerText = userCount;
  for (let i = 0; i < 3;i++) {
    progressRow.children[i + 1].innerText = Math.round((parseInt(sinAvance[i]) * 100) / parseInt(userCount)) + '%';  
    notOptimalRow.children[i + 1].innerText = Math.round((parseInt(noOptimo[i]) * 100) / parseInt(userCount)) + '%';  
    optimalRow.children[i + 1].innerText = Math.round((parseInt(optimo[i]) * 100) / parseInt(userCount)) + '%'; 
  }
}

// Se llama al momento de hacer click en el botón Avance de Lecturas.
btnLecture.addEventListener('click', () => {
  lectureProgress(gUsers);
});
function lectureProgress(users) {
  const renderUsers = users.forEach(element => {
    let names = `<tr><td>${element.name}</td><td>${element.stats.reads.percent}%</td></tr>`;
    return lecTable.innerHTML += names;
  });
  changeTitle('AVANCE DE LECTURAS');// Cambia el titulo por información general.
  hideContent();// Esconde todos los contenidos.
  lecPage.style.display = 'block';// Muestra el contenido información general.
};
// Se llama al momento de hacer click en el botón promedio quizzes.
pQuizzes.addEventListener('click', () => {
  quizzesAverage(gUsers);
});
function quizzesAverage(users) {
  const renderUsers = users.forEach(element => {
    let names = `<tr><td>${element.name}</td><td>${isNaN(element.stats.quizzes.scoreAvg) ? 0 : element.stats.quizzes.scoreAvg}%</td></tr>`;
    return infoPQuizzesTable.innerHTML += names;
  });
  changeTitle('PROMEDIO DE QUIZZES');// Cambia el titulo por información general.
  hideContent();// Esconde todos los contenidos.
  pQuizzesProgressPage.style.display = 'block';// Muestra el contenido información general.
};

pEjercicios.addEventListener('click', () => {
  ejerciciosAverage(gUsers);
});
function ejerciciosAverage(users) {
  const renderUsers = users.forEach(element => {
    let names = `<tr><td>${element.name}</td><td>${isNaN(element.stats.exercises.percent) ? 0 : element.stats.exercises.percent}%</td></tr>`;
    return infoPEjerciciosTable.innerHTML += names;
  });
  changeTitle('AVANCE DE EJERCICIOS');// Cambia el titulo por información general.
  hideContent();// Esconde todos los contenidos.
  pEjerciciosProgressPage.style.display = 'block';// Muestra el contenido información general.
};
// Cambia el titulo del dashboard.
const changeTitle = titleText => {
  document.getElementById('titleDashboard').innerText = titleText;
};

function orderNameChange() {// Ordena la grilla general por nombre de estudiante.
  const selectedIndex = document.getElementById('comboBoxOrder').selectedIndex;
  const selectedItem = document.getElementById('comboBoxOrder').options[selectedIndex];
  sortUsers(gUsers, 'name', selectedItem.value);
  generalInformation(gUsers);
  resumenCohort(gUsers);
}
function orderAvgChange() {// Ordena la grilla general por promedio de estudiante.
  const selectedIndex = document.getElementById('comboBoxOrderAvg').selectedIndex;
  const selectedItem = document.getElementById('comboBoxOrderAvg').options[selectedIndex];
  sortUsers(gUsers, 'percent', selectedItem.value);
  generalInformation(gUsers);
  resumenCohort(gUsers);
}

function categoryFilter() { //Filtra alumnas por niveles, óptimo, no óptimo, sin avance, Todos.
  const SelectedFilter = document.querySelector('input[name="optradio"]:checked').value;
  switch (SelectedFilter){
	  case 'Todos':
		  generalInformation(gUsers);
	    break;	  
	  case 'Optimo':
		  let filterUser = gUsers.filter(function(studentFilter) {
	    let averageStudent = Math.round((studentFilter.stats.reads.percent + studentFilter.stats.quizzes.percent + studentFilter.stats.exercises.percent) / 3);
			  return averageStudent >= 70 && averageStudent <= 100;
		  });
		  generalInformation(filterUser);
	    break;
	  case 'NoOptimo':
	    generalInformation(gUsers.filter(function(studentFilter) {
			  let averageStudent = Math.round((studentFilter.stats.reads.percent + studentFilter.stats.quizzes.percent + studentFilter.stats.exercises.percent) / 3);
			  return averageStudent > 0 && averageStudent < 70;
		  }));
	    break;
	  case 'sinAvance':
	    generalInformation(gUsers.filter(function(studentFilter) {
			  let averageStudent = Math.round((studentFilter.stats.reads.percent + studentFilter.stats.quizzes.percent + studentFilter.stats.exercises.percent) / 3);
			  return averageStudent === 0;
		  }));
	    break;
  }
}

function hideContent() {
  const bodyContentChild = document.getElementById('bodyContent').children;
  for (let i = 0;i < bodyContentChild.length;i++) {
    bodyContentChild[i].style.display = 'none';
  }   
};

function cohortsSelectChange(cohort) {
  getApiData(cohort);
}
