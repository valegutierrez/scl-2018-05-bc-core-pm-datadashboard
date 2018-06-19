const lecTable = document.getElementById('infoLectureTable');
const btnLecture = document.getElementById('lectures');
const lectureProgress = dataUsers => {
  btnLecture.addEventListener('click', () => {
    const filterStudents = dataUsers.filter(element => element.role === 'student');// Busca a las estudiantes dentro del array
    const renderUsers = filterStudents.forEach(element => {
      let names = `<tr><td>${element.name}</td><td></td><td></td><td></td><td></td></tr>`;
      return lecTable.innerHTML += names;
    });
    tableAppear();
    return renderUsers;
  });
};

const tableAppear = () => {
  document.getElementById('lectureProgressPage').style.display = 'block';
};

function findUser(dataUsers) {
  /* Autocompleta el input con los nombres de las estudiantes */
}


function printLectures() {
  /* imprime la data del array dentro de la tabla */ 
}

function exerciseProgress() {
  /* Se llaman los arrays de .JSON para usarlos en la siguiente función */
  printExercises();
}

function printExercises() {
  /* imprime la data del array dentro de la tabla */ 
}