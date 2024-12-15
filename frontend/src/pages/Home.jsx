import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleRedirectToSchedules = () => {
        navigate("/horario");
    };

    const handleRedirectToPeriods = () => {
        navigate("/period");
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
            <button onClick={handleRedirectToSchedules}>Horarios</button>
            <button onClick={handleRedirectToPeriods}>Períodos</button>
        </>
    );
};

export default Home;
