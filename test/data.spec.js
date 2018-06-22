describe('data', ()=>{
  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isAtLeast(user.stats.percent, 0);
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {
      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });
    });
  });
  describe('sortUsers(users, orderBy, orderDirection)', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    it('debería retornar arreglo de usuarios ordenado por nombre ASC', () => {
      const sortedUsers = sortUsers(processed, 'name', 'ASC');
      for (let i = 1; i < sortUsers.length; i++) {
        assert.isAtMost(sortedUsers[0].name.localeCompare[1].name, 0);
      }
    });
    it('debería retornar arreglo de usuarios ordenado por nombre DESC', () => {
      const sortedUsers = sortUsers(processed, 'name', 'DESC');
      for (let i = 1; i < sortUsers.length; i++) {
        assert.isAtLeast(sortedUsers[0].name.localeCompare[1].name, 0);
      }
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', () => {
      const sortedUsers = sortUsers(processed, 'stats.percent', 'ASC');
      for (let i = 1; i < sortUsers.length; i++) {
        assert.isAtMost((sortedUsers[0].stats.percent) - (sortedUsers[1].stats.percent), 0);
      }
    });
      
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', () => {
      const sortedUsers = sortUsers(processed, 'stats.percent', 'DESC');
      for (let i = 1; i < sortUsers.length; i++) {
        assert.isAtLeast((sortedUsers[0].stats.percent) - (sortedUsers[1].stats.percent, 0));
      }
    });

    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC', () => {
      const sortedUsers = sortUsers(processed, 'stats.exercises.percent', 'ASC');
      for (let i = 1; i < sortUsers.length; i++) {
        assert.isAtMost((sortedUsers[0].stats.exercises.percent) - (sortedUsers[1].stats.exercises.percent), 0);
      }
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC', () => {
      const sortedUsers = sortUsers(processed, 'stats.exercises.percent', 'DESC');
      for (let i = 1; i < sortUsers.length; i++) {
        assert.isAtLeast((sortedUsers[0].stats.exercises.percent) - (sortedUsers[1].stats.exercises.percent), 0);
      }
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC', () => {
      const sortedUsers = sortUsers(processed, 'stats.quizzes.percent', 'ASC');
      for (let i = 1; i < sortUsers.length; i++) {
        assert.isAtMost((sortedUsers[0].stats.quizzes.percent) - (sortedUsers[1].stats.quizzes.percent), 0);
      }
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC', () => {
      const sortedUsers = sortUsers(processed, 'stats.quizzes.percent', 'DESC');
      for (let i = 1; i < sortUsers.length; i++) {
        assert.isAtLeast((sortedUsers[0].stats.quizzes.percent) - (sortedUsers[1].stats.quizzes.percent), 0);
      }
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC', () => {
      const sortedUsers = sortUsers(processed, 'stats.quizzes.scoreAvg', 'ASC');
      for (let i = 1; i < sortUsers.length; i++) {
        assert.isAtMost((sortedUsers[0].stats.quizzes.scoreAvg) - (sortedUsers[1].stats.quizzes.scoreAvg), 0);
      }
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC', () => {
      const sortedUsers = sortUsers(processed, 'stats.quizzes.scoreAvg', 'DESC');
      for (let i = 1; i < sortUsers.length; i++) {
        assert.isAtLeast((sortedUsers[0].stats.quizzes.scoreAvg) - (sortedUsers[1].stats.quizzes.scoreAvg), 0);
      }
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC', () => {
      const sortedUsers = sortUsers(processed, 'stats.reads.percent', 'ASC');
      for (let i = 1; i < sortUsers.length; i++) {
        assert.isAtMost((sortedUsers[0].stats.reads.percent) - (sortedUsers[1].stats.reads.percent), 0);
      }
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC', () => {
      const sortedUsers = sortUsers(processed, 'stats.reads.percent', 'DESC');
      for (let i = 1; i < sortUsers.length; i++) {
        assert.isAtLeast((sortedUsers[0].stats.reads.percent) - (sortedUsers[1].stats.reads.percent), 0);
      }
    });
  });

  describe('filterUsers(users, filterBy)', ()=>{
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)', () => {
      const searchUser = 'Ale';
      const filterUsers = filterUsers(users, searchUser);
      for (let i = 1; i < filterUsers.length; i++) {
        assert.isTrue(filterUsers[i].name.toLowerCase().indexOf(searchUser.toLowerCase()) > -1, 0);
      }
    });
  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter', () => {
      const processed = processCohortData(cohortData, orderBy, orderDirection, filterBy);
      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isAtLeast(user.stats.percent, 0);
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
      const filterUsers = filterUsers(users.stats);
      const sortUsers = sortUsers(users.stats);
    });
  });
});
