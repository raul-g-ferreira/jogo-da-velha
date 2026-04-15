function isAvailable(field) {
    res = field.hasAttribute('player1') || field.hasAttribute('player2')
    return !res
}

function select(e) {
    const field = e.target
    if (isAvailable(field)) {

        const player = player1Turn ? 'player1' : 'player2'

        console.log('seleciona')

        field.setAttribute(player, '')

        player1Turn = !player1Turn

        checkVictory(player)
        checkDraw()
    }
}

function showVictory(player) {
    alert(`Vitória da ${playerNames[player == 'player1'? 0 : 1]}`)
    reset() // reload
}

function checkDraw() {
    const occupiedPositions = Array.from(document.querySelectorAll('[player1], [player2]'))
    if (occupiedPositions.length >= 9) {
        alert('Deu velha!')
        reset()
    }
}

function checkVictory(player) {
    const playerPositions = Array.from(document.querySelectorAll(`[${player}]`)).map(pos => pos.id)

    const winningPositions = [
        ['id1', 'id2', 'id3'], ['id4', 'id5', 'id6'], ['id7', 'id8', 'id9'],
        ['id1', 'id4', 'id7'], ['id2', 'id5', 'id8'], ['id3', 'id6', 'id9'],
        ['id1', 'id5', 'id9'], ['id3', 'id5', 'id7']
    ]

    const isSubset = (wLineup) => wLineup.every(pos => playerPositions.includes(pos))

    const winnerLineup = winningPositions.filter(wLineup => {
        return isSubset(wLineup)
    })

    if (winnerLineup.length > 0) { // debug
        console.log(`${player} wins`)
        showVictory(player)
    }
}

function initialize() {
    for (let i = 1; i <= 9; i++) {
        const div = document.createElement('div')
        div.classList.add('position')
        div.id = `id${i}`
        document.querySelector('.game-window').appendChild(div)
    }
    const divs = document.querySelectorAll('div .position')
        .forEach(div => {
            div.onclick = select
        })
}

function reset() {
    window.location.reload()
}

var player1Turn = true
const playerNames = ['Honda', 'Yamaha']
initialize()