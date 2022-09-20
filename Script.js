let piano = document.getElementById('piano');
let noteArr = ['C','D','E','F','G','A','B'];
const keys = ["Tab" ,"1","q","2","w","e","4","r","5","t","6","y","u","8","i","9","o","p","-","[","=","]","Backspace","\\"];

let html = '';

for(let octave = 0;octave < 2;octave++) {
    
    noteArr.forEach(note => {
        let hasSharp = note != 'E' && note != 'B';

        html += `<div class ='whiteNote' data-code='${note}${octave+4}'>
            ${hasSharp ? `<div class='blackNote' data-code='${note}#${octave+4}'></div>` : ''}
        </div>`
    });
}

piano.innerHTML = html;

const notes = document.querySelectorAll('.whiteNote, .blackNote');
const synth = new Tone.PolySynth().toMaster();

notes.forEach((note, i) => note.append(keys[i]));

document.addEventListener('keydown' ,elm => {
    elm.preventDefault();

    if(!elm.repeat) {
        keys.forEach((key,index) => {
            if(elm.key == key){
                notes[index].classList.add('clicked');
                setTimeout(() => notes[index].classList.remove('clicked'), 100);
                synth.triggerAttackRelease(notes[index].dataset.code,'16n')
            }
        });
    }
});
