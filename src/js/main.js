window.onload = function start() {
  getApiData('scl-2018-05-bc-core-pm');
};
function getApiData(cohort) {
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
    if (users && progress && courses) {
      window.computeUserStats(users, progress, courses);// Llama al computerUserStats con datos obtenidos de la API
      window.getCohorts(cohorts);
    }
    console.log(window.filterUsers(users, 'lor')); // deberia devolver solo un elemento en el array
    console.log(window.filterUsers(users, 'ana')); // deberia devolver tres elemento en el array
    console.log(window.sortUsers(users, 'quizzesPercent', 'DESC'));
  }).catch(
    (error)=>{ // Si una llamada falla se ejecuta error.
      console.log('Error al llamar API.' + error);
    });
}
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
    let sinAvance = [0, 0, 0]; // Acumulador para sin avance de Quizzes, Lecturas, Ejercicios
    let noOptimo = [0, 0, 0]; // Acumulador para no optimo de Quizzes, Lecturas, Ejercicios
    let optimo = [0, 0, 0]; // Acumulador para optimo de Quizzes, Lecturas, Ejercicios
    const renderUsers = users.forEach(element => {
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
      let names = `<tr><td>${element.name}</td><td>${element.stats.percent}%</td><td>${element.stats.reads.percent}%</td><td>${element.stats.quizzes.percent}%</td><td>${element.stats.exercises.percent}%</td></tr>`;
      return infTable.innerHTML += names; 
    });
    
    summaryCohorts(sinAvance, noOptimo, optimo, users.length);
    changeTitle('INFORMACIÓN GENERAL');
    hideContent();
    infPage.style.display = 'block';
  });
};
// Porcentajes totales
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

// Se llama al momento de hacer click en el botón Avance de Lecturas
function lectureProgress(users) {
  btnLecture.addEventListener('click', () => {
    const renderUsers = users.forEach(element => {
      let names = `<tr><td>${element.name}</td><td>${element.stats.reads.percent}%</td></tr>`;
      return lecTable.innerHTML += names;
    });
    changeTitle('AVANCE DE LECTURAS');// Cambia el titulo por información general
    hideContent();// Esconde todos los contenidos
    lecPage.style.display = 'block';// Muestra el contenido información general
  });
};
// Cambia el titulo del dashboard
const changeTitle = titleText => {
  document.getElementById('titleDashboard').innerText = titleText;
};

function orderChange() {
  const selectedIndex = document.getElementById('comboBoxOrder').selectedIndex;
  const selectedItem = document.getElementById('comboBoxOrder').options[selectedIndex];

  //selectedItem.value
  //TODO: hacer ordenamiento.
}
function categoryFilter() {


}

function hideContent() {
  const bodyContentChild = document.getElementById('bodyContent').children;
  for (let i = 0;i < bodyContentChild.length;i++) {
    bodyContentChild[i].style.display = 'none';
  }   
};


