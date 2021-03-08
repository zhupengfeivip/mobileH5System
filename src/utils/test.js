import axios from 'axios'


function getUserAccount() {
    axios.post('/api/user2', {
        firstName: 'Fred',
        lastName: 'Flintstone'
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { getUserAccount }
