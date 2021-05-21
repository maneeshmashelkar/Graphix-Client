import React from "react"
import Menu from "./Menu";


const Base = ({
    title="My title",
    description="my Description",
    className="bg-dark text-white py-4",
    children
}) => {
    return(
        <div>
            <Menu/>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title} </h2>
                    <p className="lead">{description} </p>
                </div>
               <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-5 py-3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you got any question, feel free to reach out</h4>
                    <h4 className="text-dark">manishmashelkar45@gmail.com</h4>
                </div>
                <div className="container text-center">
                    <span className="text-muted ">
                        An Amazing Site to Buy T-shirts
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Base;