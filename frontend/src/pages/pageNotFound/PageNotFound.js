import { useNavigate } from 'react-router-dom'
import './pageNotFound.scss'



const PageNotFound = () => {
    const navigate = useNavigate()
    const handleRedirect = () => {
        navigate('/')
    }
    return (
        <div className="pageNotFound">
            <div className="wrapper">
                <h1>404 Not found</h1>
                <button onClick={handleRedirect}>Back To home</button>
            </div>
        </div>
    )
}

export default PageNotFound