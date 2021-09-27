const btn = document.getElementById('btn')
const txt = document.getElementById('editor')
const res = document.getElementById('res')
const a = window.console
btn.addEventListener('click', async () => {
    if (!txt.value) return write('Please enter a text')
    try {
        console = {
            log: (msg) => msg
        }
        let ev = await eval(txt.value)
        write(ev, true)
    } catch (er) {
        write(er)
    }
})

function write(a, b) {
    res.innerHTML = (b && typeof a == 'object') ? JSON.stringify(a, null, 4) : String(a)
}
