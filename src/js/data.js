const usersJson = 'https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-pm/users';
const cohortsJson = 'https://api.laboratoria.la/cohorts';
const progressJson = 'https://api.laboratoria.la/cohorts/scl-2018-05-bc-core-pm/progress';
var users = {};
var progress = {};
var courses = {};

fetch(usersJson)
  .then(response => response.json())
  .then(usersData => {
    users = usersData;
    lectureProgress(usersData);
    findUser(usersData);
    generalInformation(usersData);
    console.log(users);
  });

fetch(cohortsJson)
  .then(response => response.json())
  .then(cohortsData => {
    const filterCourses = cohortsData.map(object => {
      courses = object.coursesIndex;
      return courses;
    });
    console.log(courses);
  });

fetch(progressJson)
  .then(response => response.json())
  .then(progressData => {
    progress = progressData;
    console.log(progress);
  });

function start() {
  if (users && progress && courses) {
    computeUserStats(users, progress, courses);
  }
}

function computeUserStats(users, progress, courses) {
}