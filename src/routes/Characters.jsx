import React, { useState } from "react";

const initialValues = {
    name: "",
    body: "",
    mind: "",
    soul: "",
    acv: "",
    dcv: ""
};

const Characters = () => {
    const [values, setValues] = useState(initialValues);
    const [players, setPlayers] = useState(
        JSON.parse(localStorage.getItem("players")) || []
    );

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setPlayers([...players, values]);
        setValues(initialValues);
        localStorage.setItem("players", JSON.stringify([...players, values]));
    };

    return (
        <div className="characters">
            <h2>Create Character</h2>
            <form className="character-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                />
                <label htmlFor="body">Body:</label>
                <input
                    type="text"
                    name="body"
                    id="body"
                    placeholder="Body"
                    value={values.body}
                    onChange={handleChange}
                />
                <label htmlFor="mind">Mind:</label>
                <input
                    type="text"
                    name="mind"
                    id="mind"
                    placeholder="Mind"
                    value={values.mind}
                    onChange={handleChange}
                />
                <label htmlFor="soul">Soul:</label>
                <input
                    type="text"
                    name="soul"
                    id="soul"
                    placeholder="Soul"
                    value={values.soul}
                    onChange={handleChange}
                />
                <label htmlFor="acv">ACV:</label>
                <input
                    type="text"
                    name="acv"
                    id="acv"
                    placeholder="ACV"
                    value={values.acv}
                    onChange={handleChange}
                />
                <label htmlFor="dcv">DCV:</label>
                <input
                    type="text"
                    name="dcv"
                    id="dcv"
                    placeholder="DCV"
                    value={values.dcv}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
            <h2>Characters</h2>
            <table style={{margin: "auto", width: "80%", textAlign: "center"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Body</th>
                        <th>Mind</th>
                        <th>Soul</th>
                        <th>ACV</th>
                        <th>DCV</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr key={index}>
                            <td>{player.name}</td>
                            <td>{player.body}</td>
                            <td>{player.mind}</td>
                            <td>{player.soul}</td>
                            <td>{player.acv}</td>
                            <td>{player.dcv}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Characters;
