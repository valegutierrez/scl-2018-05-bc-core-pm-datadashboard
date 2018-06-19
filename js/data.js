const usersJson = 'data/cohorts/lim-2018-03-pre-core-pw/users.json';
const cohortsJson = 'data/cohorts.json';

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

const getCohorts = dataCohorts => {
  const renderCohorts = dataCohorts.forEach(element => {
    let cohort = `<a class="dropdown-item" href="#">${element.id}</href>`;
    return cohortsList.innerHTML += cohort;
  });
  return renderCohorts;
};