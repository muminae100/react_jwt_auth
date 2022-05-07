import { Link } from "react-router-dom";

const Editor = () => {
    return (
        <section>
            <h1>Editors Page</h1>
            <br />
            <p>You must have been assigned an Editor role.</p>
            <div className="flexGrow">
                <Link to="/dashboard">Dashboard</Link>
            </div>
        </section>
    )
}

export default Editor;