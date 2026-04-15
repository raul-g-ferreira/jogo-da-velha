function isAvailable(field) {
    res = field.hasAttribute('player1') || field.hasAttribute('player2')
    return !res
}

function select(e) {
    const field = e.target
    if (isAvailable(field)) {

        const player = player1Turn ? 'player1' : 'player2'

        field.setAttribute(player, '')

        player1Turn = !player1Turn

        checkVictory(player)
    }
}

function showVictory(player) {
    document.querySelectorAll('.position').forEach(pos => {
        pos.onclick = null
    })
}

function checkDraw() {
    const occupiedPositions = Array.from(document.querySelectorAll('[player1], [player2]'))
    if (occupiedPositions.length >= 9) {
        alert('Deu velha 8(')
        document.querySelectorAll('.position').forEach(pos => {
            pos.onclick = null
        })
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

    if (winnerLineup.length > 0) {
        victoryStyles(winnerLineup)
        showVictory(player)
    }else {
        checkDraw()
    }
}

function victoryStyles(lineup) {
    const query = `#${lineup[0][0]}, #${lineup[0][1]}, #${lineup[0][2]}`
    const positions = document.querySelectorAll(query)
    positions.forEach(pos => {
        pos.classList.add('winner')
    })
}

function initialize() {
    for (let i = 1; i <= 9; i++) {
        const div = document.createElement('div')
        div.classList.add('position')
        div.id = `id${i}`
        document.querySelector('.game-window').appendChild(div)
    }
    setSelect()
}

function setSelect() {
    const divs = document.querySelectorAll('div .position')
        .forEach(div => {
            div.onclick = select
        })
}

function reset() {
    document.querySelectorAll('.position').forEach(pos => {
        pos.removeAttribute('player1')
        pos.removeAttribute('player2')
        pos.classList.remove('winner')
    })
    setSelect()
}

var player1Turn = true
const playerNames = ['Honda', 'Yamaha']
initialize()