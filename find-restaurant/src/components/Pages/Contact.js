import { Link } from "react-router-dom";

export default function ContactPage() {
    return (
        <div>
            <h1>Contact me</h1>
            <h3>Rei Wang</h3>
            <p>Title: Educational Technologist</p>
            <p>Working complany: Keypath</p>
            <p>Email: zmnwrs@gmail.com</p>
            
            <Link to={'/'}>
                <button>Back to Home</button>
            </Link>
        </div>
    )
}