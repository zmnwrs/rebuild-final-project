import { Link } from "react-router-dom";

export default function HomePage(){

    return (
        <div>
        <h1>Welcome to the Homepage</h1>
        <p>Please go to the map page and share to your friends</p>
        <p>They will search the restaurant they like and you can keep them in record</p>
        <Link to={'/map'}>
            <button>Go to the map</button>
        
        </Link>
        </div>
    )
}