const usersJson = 'https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-pm/users';
const cohortsJson = 'https://api.laboratoria.la/cohorts';
const progressJson = 'https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-pm/progress';

fetch(usersJson)
  .then(response => response.json())
  .then(dataUsers => {
    lectureProgress(users);
    findUser(users);
  });

fetch(cohortsJson)
  .then(response => response.json())
  .then(cohorts => {
    getCohorts(cohorts);
  });

fetch(progressJson)
  .then(response => response.json())
  .then(progress => {
    console.log(progress);
  });

const getCohorts = cohorts => {
  const renderCohorts = cohorts.forEach(element => {
    let cohortelement = `<a class="dropdown-item" href="#">${element.id}</href>`;
    return cohortsList.innerHTML += cohortelement;
  });
  return rendercohorts;
};