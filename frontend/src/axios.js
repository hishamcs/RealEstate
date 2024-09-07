import axios from 'axios'


const baseURL = 'http://127.0.0.1:8000/api/';



const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
    },

});


axiosInstance.interceptors.request.use(
    (config)=> {
        console.log('axios interceptor request config : ', config)
        const userInfo = localStorage.getItem('userInfo')
        const token = userInfo ? JSON.parse(userInfo).access: null

        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        } else {
            console.log('token is deleted')
            delete config.headers.Authorization
        }

        // Determine the content-type
        if(config.data) {
            if(typeof config.data === 'object' && !(config.data instanceof FormData)) {
                console.log('content type is : application/json')
                config.headers['Content-Type'] = 'application/json'
            } else if (config.data instanceof FormData) {
                console.log('content type is : multipart form data')
                config.headers['Content-Type'] = 'multipart/form-data'
            } else {
                console.log('content type is : text plain')
                config.headers['Content-Type'] = 'text/plain'
            }
        }


        return config
    }, 
    (error) => {
        console.log('axios interceptor error : ', error)
        return Promise.reject(error)
    }
)




axiosInstance.interceptors.response.use(
    (response) => {
        console.log('response : ', response)
        return response
    },
    async function (error) {
        console.log('error  :', error)
        console.log('error config : ', error.config)
        console.log('error.response : ', error.response)
        
        const originalRequest = error.config

        if(typeof error.response === 'undefined') {
            alert(
                'A server/network error occured.'+
                'Sorry about this - we will get it fixed shortly'
            )
            return Promise.reject(error)
        }

        if (
                error.response.status === 401 && 
                originalRequest.url === baseURL + 'user/token/refresh/'
                // originalRequest.url === baseURL + 'token/refresh/'
        ) {
            window.location.href = '/'
            return Promise.reject(error)
        }

        if (
                error.response.data.code === 'token_not_valid' && 
                error.response.status === 401 && 
                error.response.statusText === 'Unauthorized'
        ) {

            console.log('getting new tokennnn................')

            const userInfo = localStorage.getItem('userInfo')
            const refreshToken = userInfo ? JSON.parse(userInfo).refresh: null

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

                const now = Math.ceil(Date.now() / 1000)

                console.log('tokenParts.exp : ', tokenParts.exp)

                if (tokenParts.exp > now) {
                    return axiosInstance
                    .post('/user/token/refresh/', {refresh: refreshToken})
                    .then((response) => {
                        localStorage.setItem('userInfo', JSON.stringify({...JSON.parse(userInfo), access: response.data.access}))

                        axiosInstance.defaults.headers['Authorization'] = 
                                'Bearer ' + response.data.access;

                        originalRequest.headers['Authorization'] = 
                                'Bearer ' + response.data.access;
                        
                        return axiosInstance(originalRequest)

                    })
                    .catch((error) => {
                        console.log(error)
                    })
                


                } else {
                  console.log('Refresh token is expired', tokenParts.exp, now)
                  localStorage.removeItem('userInfo')
                  window.location.href = '/' 
                }



            } else {
                console.log('Refresh token not available')
                localStorage.removeItem('userInfo')
                window.location.href = '/'
            }
        }
        
        return Promise.reject(error)
    }
)



export default axiosInstance