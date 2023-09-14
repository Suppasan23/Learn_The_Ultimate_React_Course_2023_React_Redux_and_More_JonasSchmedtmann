import PageNav from "../components/PageNav";

function PageNotFound() {
    return (
        <>
            <p>
                <span style={{fontSize:"20px", color:"red"}}>Page not found 😢</span>&nbsp;
            </p>

            <div>
                <PageNav/>
            </div>
        </>
    )
}

export default PageNotFound;