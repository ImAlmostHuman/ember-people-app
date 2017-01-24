export default function() {
  this.namespace = '/api';

  this.post('/users', function() {
      return {
      data: {
          type:'users',
          id: 1,
          attributes: {
            title: 'mr',
            name: 'Sam Salad',
            gender: 'm',
            active: true,
        }
        }
    };
  });

  this.get('/users', function() {
    return {
      data: [{
          type:'users',
          id: 1,
          attributes: {
            title: 'mr',
            name: 'Sam Salad',
            gender: 'm',
            active: true,
        }
        }, {
          type: 'users',
          id: 2,
          attributes: {
            title: 'mrs',
            name: 'Joanne Julip',
            gender: 'f',
            active: false
        }
      }]
    };
  });
}