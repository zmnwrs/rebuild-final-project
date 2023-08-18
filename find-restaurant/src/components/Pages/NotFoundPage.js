import { Link } from "react-router-dom";

export default function EmptyPage() {
    return (
        <div>
            <span>Current page is not found</span>
            <br></br>
            <Link to={'/'}>
                <button>Back to Home Page</button>
            </Link>
        </div>
    )
}