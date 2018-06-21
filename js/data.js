const usersJson = 'https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-am/users'; //Pendiente futuro uso
const cohortsJson = 'https://api.laboratoria.la/cohorts';
const progressJson = 'https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-am/progress';//Pendiente de uso
function start() { // Pendiente de uso, de momento.
  getApiData('scl-2018-05-bc-core-am');
}
function computeUserStats(users, progress, courses) {
  users.forEach(element => {
    let Progress = progress[element.id]; //Obtiene progreso por usuario
    let porcentajetotal = 0; // Inicializa el acumulador de porcentaje
    for (var Pkey in Progress) { //Recorre los cursos
      for (var UKey in Progress[Pkey]) { //Recorre las unidades
        if (UKey === 'percent') { 
          porcentajetotal += parseInt(Progress[Pkey][UKey]); //Selecciona el poorcentaje de unidad
        }
        if (UKey === 'units') {
          for (var uniKey in Progress[Pkey][UKey]) { // Obtiene todas las unidades
            for (var xKey in Progress[Pkey][UKey][uniKey]) {
              if (xKey === 'parts') { // Obtiene el objeto de "Parts"
                let countPart = 0;
                let totalRead = 0;
                let totalQuiz = 0;
                let totalWorkshop = 0;
                let totalReadOk = 0;
                let totalQuizOk = 0;
                let totalWorkshopOK = 0;
                let totalScoreQuiz = 0;
                let scoreSumQuiz = 0;
                let scoreAvgQuiz = 0;
                for (partKey in Progress[Pkey][UKey][uniKey][xKey]) { // Recorre las "Parts"
                  switch (Progress[Pkey][UKey][uniKey][xKey][partKey].type) { // Elije tipo de parte
                  case 'read':
                    totalRead++; // Sumas una lectura al total
                    if (Progress[Pkey][UKey][uniKey][xKey][partKey].completed === 1)
                      totalReadOk++; // Suma una lectura completada
                    break;
                  case 'quiz':
                    totalQuiz++;
                    if (Progress[Pkey][UKey][uniKey][xKey][partKey].completed === 1) {
                      totalQuizOk++;						
                      scoreSumQuiz += parseInt(Progress[Pkey][UKey][uniKey][xKey][partKey].score);// Obtiene puntajes de Quizze
                    }
                    break;
                  case 'workshop':
                    totalWorkshop++;// Suma un workshop al total
                    if (Progress[Pkey][UKey][uniKey][xKey][partKey].completed === 1)
                      totalWorkshopOK++;// Suma uno a los completados				
                    break;
                  }
                }
                let stats = { // Arma la nueva propiedad para el objeto Users
                  percent: (scoreSumQuiz / (totalQuizOk === 0 ? 1 : totalQuizOk)),
                  exercises: {
                    total: totalWorkshop,
                    completed: totalWorkshopOK,
                    percent: ((totalWorkshopOK * 100) / (totalWorkshop === 0 ? 1 : totalWorkshop)) // Cambia los ceros por 1, para evitar division por 0
                  },
                  reads: {
                    total: totalRead,
                    completed: totalReadOk,
                    percent: ((totalReadOk * 100) / (totalRead === 0 ? 1 : totalRead))
                  },
                  quizzes: {
                    total: totalRead,
                    completed: totalReadOk,
                    percent: ((totalReadOk * 100) / (totalRead === 0 ? 1 : totalRead)),
                    scoreSum: scoreSumQuiz,
                    scoreAvg: (scoreSumQuiz / (totalQuizOk === 0 ? 1 : totalQuizOk))
                  }
                };
                element['stats'] = stats;// Agrega la nueva propiedad al Users
              }  
            }
          }
        }
      }
    }
  });
  console.log(users);
  console.log(progress);
  console.log(courses);
}

function getApiData(cohort) {
  Promise.all([ // Llama la info de API en paralelo(Todas a la vez)
    fetch('https://api.laboratoria.la/cohorts/' + cohort + '/users'),
    fetch('https://api.laboratoria.la/cohorts/' + cohort + '/progress'),
    fetch('https://api.laboratoria.la/cohorts/' + cohort + '/courses')
  ]).then((responses)=>{ // Se cumplen promesas
    return Promise.all(responses.map((response => response.json()))); 
  }).then((responseJsons)=>{ // Transforma respuestas en objetos Json
    const users = responseJsons[0].filter(element => element.role === 'student');
    const progress = responseJsons[1];
    const courses = responseJsons[2];
    // Ejecuta las funciones que se despliegan en el html.
    lectureProgress(users);
    generalInformation(users);
    if (users && progress && courses) {
      computeUserStats(users, progress, courses);//Llama al computerUserStats con datos obtenidos de la API
    }
  }).catch(
    (error)=>{ // Si una llamada falla se ejecuta error.
      console.log('Error al llamar API.' + error);
    });
}

function getCohorts(cohorts) { // Arma el contenido del desplejable de cohorts.
  const renderCohorts = cohorts.forEach(element => {
    let cohortElement = `<a class="dropdown-item" href="javascript:cohortsSelectChange('${element.id}');">${element.id}</href>`;
    return cohortsList.innerHTML += cohortElement;
  });
  return renderCohorts;
};

fetch(cohortsJson) 
  .then(response => response.json())
  .then(cohortsData => {
    getCohorts(cohortsData);
  });
