const btn = document.getElementById('btn'),
    clear = document.getElementsByClassName('clear')[0],
    txt = document.getElementById('editor'),
    res = document.getElementById('res'),
    originalConsole = window.console

const editor = CodeMirror(document.getElementById('editor'), {
	mode: 'javascript',
	lineNumbers: true,
	autoCloseBrackets: true,
	tabSize: 4,
	indentUnit: 4,
})


btn.addEventListener('click', async () => {
    const code = editor.getValue();
    if (!code) return write('Please enter a text');
    try {
        console = {
            log: (msg) => msg
        };
        let ev = await eval(code);
        write(ev);
    } catch (er) {
        write(er);
    }
});
clear.addEventListener('click', () => (res.innerText = ''));

function write(a) {
    res.innerText = a instanceof Error ? String(a) : JSON.stringify(a, censor(a), 4);
}

function censor(censor) {
    let i = 0;
    return function (key, value) {
        if (i !== 0 && typeof censor === 'object' && typeof value == 'object' && censor == value) return '[Circular]';
        if (i >= 29) return '[Unknown]';
        ++i;
        return value;
    }
}