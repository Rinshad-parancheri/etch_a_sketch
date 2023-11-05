class Sketch {
    constructor() {
        this.currentMode = 'Brush';

        this.COLOR_PICKER = document.getElementById('colorPicker');
        this.BTN = document.querySelectorAll(".btn");
        this.SIZE = document.getElementById("size");
        this.RANGE = document.getElementById("range");
        this.SKETCH_PAD = document.getElementById("sketch-pad");

        this.brushColor = this.COLOR_PICKER.value;
        this.setUpGrid(this.RANGE.value);
        this.setUpEventListener();
    }

    setUpGrid(size) {
        this.SKETCH_PAD.innerHTML = '';
        this.SKETCH_PAD.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;

        for (let i = 1; i <= size * size; i++) {
            const div = document.createElement('div');
            div.classList.add('grid');
            this.SKETCH_PAD.appendChild(div);
        }
        this.setUpEventListener();
    }

    setUpEventListener() {
        this.grids = document.querySelectorAll(".grid");

        this.BTN.forEach(btn => {
            btn.onclick = e => {
                this.setUpCurrentMode(e.target.innerText);
            };
        });
      
       this.COLOR_PICKER.onchange = (e) => {
        this.brushColor = e.target.value;
        this.setUpCurrentMode('Brush');
        }

        this.grids.forEach(grid => {
            grid.onmousemove = (e) => { this.updateFunctionalityOfCurrentMode(grid) }
        })

        this.RANGE.onmousemove = (e) => this.SIZE.innerText = `${e.target.value} X ${e.target.value}`;
        this.RANGE.onchange = (e) => this.setUpGrid(e.target.value);
    }

    updateFunctionalityOfCurrentMode(grid) {
        if (this.currentMode === 'Eraser') {
            grid.style.backgroundColor = 'white';
        } else if (this.currentMode === 'Rainbow') {
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            grid.style.backgroundColor = `rgb(${red},${green},${blue})`;
        } else {
            grid.style.backgroundColor = this.brushColor;
        }
    };

    setUpCurrentMode(value) {
        if (value == 'Clear') {
            this.setUpGrid(this.RANGE.value);
        } else {
            this.currentMode = value
        }

    }
}

window.onload = () => new Sketch();