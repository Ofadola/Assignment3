import React from 'react'

const GameFooter = ({ isStoryteller, state, clue, setClue, onSubmit, hasChosen }) => {
    if (isStoryteller) {
        if (state === 'storyteller') {
            return (
                <footer>
                    <div className="storyteller-label">Storyteller</div>
                    <div className="controls">
                        <input type="text" className="dixit-input" placeholder="Clue"
                        value={clue} onChange={e => setClue(e.target.value)}/>
                        <button className="green-btn"
                        onClick={onSubmit}>SEND</button>
                    </div>
                </footer>
            )
        }
        if (state === 'choosing') {
            return (
                <footer>
                    <div className="storyteller-label">
                        Waiting for players to choose their cards
                    </div>
                </footer>
            )
        }
        if (state === 'voting') {
            return (
                <footer>
                    <div className="storyteller-label">
                        Waiting for players to vote
                    </div>
                </footer>
            )
        }
        if (state === 'votingEnd') {
            return (
                <footer>
                    <button className="green-btn"
                    style={{marginTop: '30px'}}
                    onClick={onSubmit}>VALIDATE</button>
                </footer>
            )
        }
    }
    else {
        if (state === 'storyteller') {
            return (
                <footer>
                    <div className="storyteller-label">
                        Waiting for storyteller to choose card
                    </div>
                </footer>
            )
        }
        if (state === 'choosing' && !hasChosen) {
            return (
                <footer>
                    <div className="storyteller-label">
                        Choose your card
                    </div>
                    <button className="green-btn"
                    onClick={onSubmit}>SEND</button>
                </footer>
            )
        }
        if (state === 'choosing' && hasChosen) {
            return (
                <footer>
                    <div className="storyteller-label">
                        Waiting for other players to choose their cards
                    </div>
                </footer>
            )
        }
        if (state === 'voting' && !hasChosen) {
            return (
                <footer>
                    <button className="green-btn"
                    style={{
                        marginTop: '50px'
                    }}
                    onClick={onSubmit}>VOTE</button>
                </footer>
            )
        }
        if (state === 'voting' && hasChosen) {
            return (
                <footer>
                    <div className="storyteller-label">
                        Waiting for other players to vote
                    </div>
                </footer>
            )
        }
        if (state === 'votingEnd') {
            return (
                <footer>
                    <div className="storyteller-label">
                        Waiting for storyteller to validate
                    </div>
                </footer>
            )
        }
    }
    return (
        <div>ERROR</div>
    )
}

export default GameFooter;
