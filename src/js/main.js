const lecTable = document.getElementById('infoLectureTable');
const btnLecture = document.getElementById('lectures');
const lectureProgress = dataUsers => {
  btnLecture.addEventListener('click', () => {
    const renderUsers = dataUsers.forEach(element => {
      let student = `<tr><td>${element.name}</td><td></td><td></td><td></td><td></td></tr>`;
      return lecTable.innerHTML += student;
    });
    return renderUsers;
  });
};

const inputUser = document.getElementById('userFinder');
const findUser = dataUsers => {
  inputUser.addEventListener('input', () => {
    let listCont = inputUser.value;
    closeAllLists();
    listCont = document.createElement('div');
    listCont.setAttribute('id', this.id + 'autocomplete-list');
    listCont.setAttribute('class', 'auto-items');
    inputUser.parentNode.appendChild(listCont);
  });
};

function closeAllLists(element) {
  let x = document.getElementsByClassName('auto-items');
  for (var i = 0; i < x.length; i++) {
    if (element !== x[i] && element !== inputUser) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
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