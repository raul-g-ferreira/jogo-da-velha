function isAvailable(field) {
    res = field.hasAttribute('player1') || field.hasAttribute('player2')
    return !res
}

function select(e) {
    const field = e.target
    if (isAvailable(field)) {

        const player = player1 ? 'player1' : 'player2'

        console.log('seleciona')

        field.setAttribute(player, '')
    }

    player1 = !player1
}

function initialize() {
    for (let i = 1; i <= 9; i++) {
        const div = document.createElement('div')
        div.classList.add('position')
        div.id = i
        document.querySelector('.game-window').appendChild(div)
    }
    console.log(player1)
    const divs = document.querySelectorAll('div .position')
    .forEach(div => {
        div.onclick = select
    })
}

function reset() {
    window.location.reload()
}



var player1 = true
initialize()