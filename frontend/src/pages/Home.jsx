import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/horario");
    };

    return (
        <>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
            <button onClick={handleRedirect}>Horarios</button>
        </>
    );
};

export default Home;
