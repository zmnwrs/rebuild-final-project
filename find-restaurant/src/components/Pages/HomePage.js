import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function HomePage(){

    return (
        <Link to={'/map'}>
            <span>link to map</span>
        
        </Link>
    )
}