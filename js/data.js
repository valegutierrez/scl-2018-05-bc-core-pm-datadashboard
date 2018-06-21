window.onload = function start() {
  getApiData('scl-2018-05-bc-core-pm');
};
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
    if (users && progress && courses) {
      computeUserStats(users, progress, courses);// Llama al computerUserStats con datos obtenidos de la API
    }
    console.log('pos aqui empieza');
    console.log(filterUsers(users, 'lor')); // deberia devolver solo un elemento en el array
    console.log(filterUsers(users, 'ana')); // deberia devolver tres elemento en el array
    console.log('pos aqui termina');

  }).catch(
    (error)=>{ // Si una llamada falla se ejecuta error.
      console.log('Error al llamar API.' + error);
    });
}
function computeUserStats(users, progress, courses) {
/*   users.forEach(element => {
for (javascript in progress) {
element['js'] = progress[javascript];
};
}); */
  users.forEach(element => {
    let userProgress = progress[element.id]; // Obtiene progreso por usuario
    let porcentajetotal = 0; // Inicializa el acumulador de porcentaje
    for (var progKey in userProgress) { // Recorre los cursos
      for (var unitKey in userProgress[progKey]) { // Recorre las unidades
        if (unitKey === 'percent') { 
          porcentajetotal += parseInt(userProgress[progKey][unitKey]); // Selecciona el porcentaje de unidad
        }
        if (unitKey === 'units') {
          for (var unitsInside in userProgress[progKey][unitKey]) { // Obtiene todas las unidades
            for (var groupKey in userProgress[progKey][unitKey][unitsInside]) {
              if (groupKey === 'parts') { // Obtiene el objeto de "Parts"
                let countPart = 0;
                let totalRead = 0;
                let totalQuiz = 0;
                let totalExercise = 0;
                let totalReadOk = 0;
                let totalQuizOk = 0;
                let totalExerciseOk = 0;
                let totalScoreQuiz = 0;
                let scoreSumQuiz = 0;
                let scoreAvgQuiz = 0;
                for (partKey in userProgress[progKey][unitKey][unitsInside][groupKey]) { // Recorre las "Parts"
                  switch (userProgress[progKey][unitKey][unitsInside][groupKey][partKey].type) { // Elije tipo de parte
                  case 'read':
                    totalRead++; // Sumas una lectura al total
                    if (userProgress[progKey][unitKey][unitsInside][groupKey][partKey].completed === 1)
                      totalReadOk++; // Suma una lectura completada
                    break;
                  case 'quiz':
                    totalQuiz++;
                    if (userProgress[progKey][unitKey][unitsInside][groupKey][partKey].completed === 1) {
                      totalQuizOk++;						
                      scoreSumQuiz += parseInt(userProgress[progKey][unitKey][unitsInside][groupKey][partKey].score);// Obtiene puntajes de Quizzes
                    }
                    break;
                  case 'exercise':
                    totalExercise++;// Suma un workshop al total
                    if (userProgress[progKey][unitKey][unitsInside][groupKey][partKey].completed === 1)
                      totalExerciseOK++;// Suma uno a los completados				
                    break;
                  }
                }
                let stats = { // Arma la nueva propiedad para el objeto Users
                  percent: (scoreSumQuiz / (totalQuizOk === 0 ? 1 : totalQuizOk)),
                  exercises: {
                    total: totalExercise,
                    completed: totalExerciseOk,
                    percent: ((totalExerciseOk * 100) / (totalExercise === 0 ? 1 : totalExercise)) // Cambia los ceros por 1, para evitar division por 0
                  },
                  reads: {
                    total: totalRead,
                    completed: totalReadOk,
                    percent: ((totalReadOk * 100) / (totalRead === 0 ? 1 : totalRead))
                  },
                  quizzes: {
                    total: totalQuiz,
                    completed: totalQuizOk,
                    percent: ((totalQuizOk * 100) / (totalQuiz === 0 ? 1 : totalQuiz)),
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
  // Ejecuta las funciones que se despliegan en el html.
  lectureProgress(users);
  generalInformation(users);
}

function getCohorts(cohorts) { // Arma el contenido del desplejable de cohorts.
  const renderCohorts = cohorts.forEach(element => {
    let cohortElement = `<a class="dropdown-item" href="javascript:cohortsSelectChange('${element.id}');">${element.id}</href>`;
    return cohortsList.innerHTML += cohortElement;
  });
  return renderCohorts;
};

function filterUsers(users, search) { // Función de filtro de usuario
  return users.filter(function(studentFilter) {
    return studentFilter.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
  });
}