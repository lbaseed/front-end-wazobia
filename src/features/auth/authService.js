import axios from 'axios'


const API_URL = 'https://test-api.sytbuilder.com/graphql'

// create user account

const createAccount = async (userData) => {
    console.log(userData)
    const first_name = userData.first_name;
    const last_name = userData.last_name;
    const email = userData.email;
    const password = userData.password;

    let data = JSON.stringify({
        query: `
        mutation {
            signup(first_name:"${first_name}", last_name:"${last_name}", email:"${email}", password:"${password}"){
             user{
                _id
                uuid
                first_name
                last_name
                email
                email_verified_at
            },
              token
            }
          }
        `,
        variables: {
        now: new Date().toISOString(),
        },
        });
    let option = {
        headers: {
        'Content-Type': 'application/json',
    }
    }
    const response = await axios.post(API_URL, data, option)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const authService = {
    createAccount
}

export default authService;

const login = async(userData) => {
    const email = userData.email;
    const password = userData.password;

    let data = JSON.stringify({
        query: `
            mutation{
                login(email:"${email}", password:"${password}"){
                    user{
                    uuid,
                    first_name,
                    last_name,
                    email,
                    email_verification_token,
                    email_verified_at
                    },
                    token
                }
            }
        `,
        variables: {
        now: new Date().toISOString(),
        },
        });
}