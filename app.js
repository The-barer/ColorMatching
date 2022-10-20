
const column = document.querySelectorAll('.color')

setRandomColor(true);
// setTimeout(()=>toggleAbout(), 0)

document.addEventListener('keydown',(event)=> {
    event.preventDefault()
    if(!document.querySelector('.about').classList.contains('hiden')) {
        toggleAbout()
    }
    event.code === 'Space' && setRandomColor();
})

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type;
    if(type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
        const tiptext = node.classList[1] === 'fa-lock' ? 'Locked!' : 'Unlocked!'
        creattooltip(node, tiptext, 300)
    }
    if(type === 'colornum') {
        const text = event.target.innerHTML
        navigator.clipboard.writeText(text);
        creattooltip(event.target, 'Copied!', 0);
    }
    if(type === 'about'){
        toggleAbout();
    }
    if(type === 'refresh'){
        setRandomColor();
    }
})

function setRandomColor(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [] ;

    column.forEach((col, index) => {
        const color = isInitial ? (colors[index] ? colors[index] : chroma.random().hex()) : chroma.random().hex()
        const text = col.querySelector('.colornum')
        const button = col.querySelector('.lockbtn')
        const islocked = col.querySelector('i').classList.contains('fa-lock')
        if(islocked) {
            colors.push(text.textContent)
            return ;
        }
        col.style.background = color
        text.textContent = color
        setTextColor(text, color)
        setTextColor(button, color)
        colors.push(color)
    })
    if(!isInitial) {updateColorsHash(colors)};
}

function setTextColor(text, color) {
    const lum = chroma(color).luminance();
    text.style.color = lum>0.5 ? 'black' : 'white';
}


function creattooltip(target, text, timeout = 900) {
    const tooltip = document.createElement('div')
    tooltip.classList.add('tip')
    tooltip.innerHTML = text
    target.append(tooltip)
    setTimeout(() => {
        target.querySelector('.tip').classList.add('hide')
    }, timeout); 
    setTimeout(() => {
        target.querySelector('.tip').remove()
    }, timeout+900);
}


function updateColorsHash(colors = []){
    document.location.hash =  colors.map( (col) => {
        return col.substring(1)
    }).join('-')
}
function getColorsFromHash() {
    if(document.location.hash.length>1) {
        return  document.location.hash.substring(1).split('-').map(color => '#' + color)
    }

    return []
}
function toggleAbout() {
    const about = document.querySelector('.about')
    about.classList.toggle('hiden')
}


