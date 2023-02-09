import { useState, createRef, useEffect } from 'react';

let InitiativeTracker = () => {
    const [characters, setCharacters] = useState([]);
    const [combatantName, setCombatantName] = useState('');
    const [initiativeRoll, setInitiativeRoll] = useState('');
    const [initiativeRolls, setInitiativeRolls] = useState([]);
    const [locked, setLocked] = useState(false);

    const ref = createRef();

    useEffect(() => {
        setCharacters(JSON.parse(localStorage.getItem('players') || '[]'));
    }, []);

    let onClick = () => {
        let rolls = [...initiativeRolls];
        if (!combatantName || !initiativeRoll) {
            return;
        }

        rolls.push({
            combatantName,
            initiativeRoll
        });
        setInitiativeRolls(rolls.sort((a, b) => b.initiativeRoll - a.initiativeRoll));
        setCombatantName('');
        setInitiativeRoll('');
        ref.current.focus();
    }

    let cycleCombatants = () => {
        let rolls = [...initiativeRolls];
        let firstRoll = rolls.shift();
        rolls.push(firstRoll);
        setInitiativeRolls(rolls);
        setLocked(true);
    }

    return (
        <div className="flex-container">
            <h3>Initiative Tracker</h3>

            <div className="initiative-form">
                <h3>Add PC Combatant</h3>
                <h3>Add NPC Combatant</h3>
                <label>Combatant</label>
                <select onChange={(e) => { setCombatantName(e.target.value) }} value={combatantName} disabled={locked} ref={ref} >
                    <option>Please select a character</option>
                    {characters.map((character) => {
                        return <option key={character.name}>{character.name}</option>
                    })}
                </select>
                <label>Initiative Roll</label>
                <input type="number" value={initiativeRoll} onChange={(e) => { setInitiativeRoll(e.target.value) }} disabled={locked} />
                <button onClick={onClick} disabled={locked}>Add Combatant</button>
            </div>

            <div className="initiative-form">
                <h3>Add NPC Combatant</h3>
                <label>Combatant</label>
                <input type="text" onChange={(e) => { setCombatantName(e.target.value) }} value={combatantName} disabled={locked} ref={ref} />
                <label>Initiative Roll</label>
                <input type="number" value={initiativeRoll} onChange={(e) => { setInitiativeRoll(e.target.value) }} disabled={locked} />
                <button onClick={onClick} disabled={locked}>Add Combatant</button>
            </div>

            <div className="initiative-form">
                <h3>Combatants</h3>
                <div className="combatant-list">
                    {initiativeRolls.map(({ combatantName, initiativeRoll }) => {
                        return (
                            <div className="combatant">
                                <span className="combatant-name">{combatantName}</span> <span className="combatant-roll">{initiativeRoll}</span>
                            </div>
                        )
                    })}
                </div>
                <button onClick={cycleCombatants}>Next Combatant</button>
                <button onClick={() => { setInitiativeRolls([]); setLocked(false); }}>Clear</button>
            </div>
        </div>
    );
}

export default InitiativeTracker;