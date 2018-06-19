const usersJson = 'https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-pm/users';
const cohortsJson = 'https://api.laboratoria.la/cohorts';
const progressJson = 'https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-pm/progress';

fetch(usersJson)
  .then(response => response.json())
  .then(dataUsers => {
    lectureProgress(dataUsers);
    findUser(dataUsers);
  });

fetch(cohortsJson)
  .then(response => response.json())
  .then(dataCohorts => {
    getCohorts(dataCohorts);
  });

fetch(progressJson)
  .then(response => response.json())
  .then(dataCohorts => {
    console.log(dataCohorts);
  });

const getCohorts = dataCohorts => {
  const renderCohorts = dataCohorts.forEach(element => {
    let cohort = `<a class="dropdown-item" href="#">${element.id}</href>`;
    return cohortsList.innerHTML += cohort;
  });
  return renderCohorts;
};