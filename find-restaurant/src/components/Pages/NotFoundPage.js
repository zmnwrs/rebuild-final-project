import { Link } from "react-router-dom";

export default function EmptyPage() {
    return (
        <div>
            <span>Current page is not found</span>
            <Link to={'/'}>
                <span>Back to Home</span>
            </Link>
        </div>
    )
}