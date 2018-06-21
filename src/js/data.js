const usersJson = 'https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-pm/users';
const cohortsJson = 'https://api.laboratoria.la/cohorts';
const progressJson = 'https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-pm/progress';
//testData
let Progress = {};
function start() {
  Promise.all([ // Llama la info de API en paralelo(Todas a la vez)
    fetch('https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-pm/users'),
    fetch('https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-pm/progress'),
    fetch('https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-pm/courses'),
    fetch('https://api.laboratoria.la/cohorts')
  ]).then((responses)=>{ // Se cumplen promesas
    return Promise.all(responses.map((response => response.json()))); 
  }).then((responseJsons)=>{ // Transforma respuestas en objetos Json
    const users = responseJsons[0].filter(element => element.role === 'student');
    const progress = responseJsons[1];
    const courses = responseJsons[2];
    const cohorts = responseJsons[3];
    // Ejecuta las funciones que se despliegan en el html.
    lectureProgress(users);
    findUser(users);
    generalInformation(users);

    if (users && progress && courses) {
      computeUserStats(users, progress, courses);
    }
  }).catch(
    (error)=>{ // Si una llamada falla se ejecuta error.
      console.log('Error al llamar API.' + error);
    }
  );
}
function computeUserStats(users, progress, courses) {
  console.log('Entraron los Datos en computeUserStats');
  console.log(users[0]);
  Progress = progress['axUVrtJBsWgK8aqCcAh4qN8z69N2'];//users[0].id];


  users.forEach(element => {
    let Progress = progress[element.id];
    console.log('Alumna:' + element.name);
// Empieza lógica 
    let porcentajetotal = 0;
    for (var Pkey in Progress) {
      console.log('unidad=' + Pkey);
      for (var UKey in Progress[Pkey]) {
        if (UKey === 'percent') {
        //console.log(' name=' + UKey + ' value=' + Progress[Pkey][UKey]);
          porcentajetotal += parseInt(Progress[Pkey][UKey]);
        }
        if (UKey === 'units') {
          for (var uniKey in Progress[Pkey][UKey]) {
            console.log('\t\tUnidad=' + uniKey );
            for (var xKey in Progress[Pkey][UKey][uniKey]) {
              if (xKey === 'parts') {
                //console.log('\t\t\t\tname=' + xKey + ' value=' + Progress[Pkey][UKey][uniKey][xKey]);
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
                for (partKey in Progress[Pkey][UKey][uniKey][xKey]) {
                  //console.log('\t\t\t\t\t\tname=' + partKey + ' value=' + Progress[Pkey][UKey][uniKey][xKey][partKey]);
                //console.log('\t\t\t\t\t\t\t\tType=' + Progress[Pkey][UKey][uniKey][xKey][partKey].type)
                //console.log('\t\t\t\t\t\t\t\tComplete=' + Progress[Pkey][UKey][uniKey][xKey][partKey].completed)
                  switch (Progress[Pkey][UKey][uniKey][xKey][partKey].type) {
                  case 'read':
                    totalRead++;
                    if (Progress[Pkey][UKey][uniKey][xKey][partKey].completed === 1)
                      totalReadOk++;
                    break;
                  case 'quiz':
                    totalQuiz++;
                    if (Progress[Pkey][UKey][uniKey][xKey][partKey].completed === 1) {
                      totalQuizOk++;						
                      scoreSumQuiz += parseInt(Progress[Pkey][UKey][uniKey][xKey][partKey].score);
                    }
                      
                    break;
                  case 'workshop':
                    totalWorkshop++;
                    if (Progress[Pkey][UKey][uniKey][xKey][partKey].completed === 1)
                      totalWorkshopOK++;						
                    break;
                  }
                }
                console.log('Totales     ' + totalRead + ' reads,' + totalQuiz + ' quiz,' + totalWorkshop + ' workshop.'); 
                console.log('Completados ' + totalReadOk + ' reads,' + totalQuizOk + ' quiz,' + totalWorkshopOK + ' workshop.'); 
                console.log('Porcentajes ' + ((totalReadOk * 100) / totalRead) + '% reads,'
                                      + ((totalQuizOk * 100) / totalQuiz) + '% quiz,' 
                                  + ((totalWorkshopOK * 100) / totalWorkshop) + '% workshop.'); 
                console.log('total    score quiz :' + scoreSumQuiz); 
                console.log('promedio score quiz :' + (scoreSumQuiz / totalQuizOk)); 
              }  
            }
          }
        }
      }
      console.log('***********');
    }
    console.log('porcentaje :' + (porcentajetotal / 8) + '%');
// Termina lógica
  });
  console.log(users);
  console.log(progress);
  console.log(courses);
}

start();