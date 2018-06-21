const usersJson = 'https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-pm/users';
const cohortsJson = 'https://api.laboratoria.la/cohorts';
const progressJson = 'https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-pm/progress';

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
  console.log(users);
  console.log(progress);
  console.log(courses);
}

start();