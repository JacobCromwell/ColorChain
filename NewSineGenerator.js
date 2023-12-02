// SpectacularImageGenerator.js
const { createCanvas } = require('canvas');
const fs = require('fs');

class NewSineGenerator {
    constructor() {
        this.width = 800;
        this.height = 600;
        this.canvas = createCanvas(this.width, this.height);
        this.context = this.canvas.getContext('2d');
        this.percentComplete = this.percentComplete
    }

    generateCompleteImage(frameCount, totalFrames) {
        //this.drawBackground();
        this.percentComplete = this.height / totalFrames;
        this.drawExpandingSineWave(5, frameCount, Math.floor((120 + frameCount) / this.percentComplete));
        this.drawCenterLine(frameCount, totalFrames);

        // Save the generated image to a file
        const out = fs.createWriteStream(__dirname + '/ripple_effect.png');
        const stream = this.canvas.createPNGStream();
        stream.pipe(out);
    }

    drawCenterLine(frameCount) {
        const centerX = (this.width / 2);
        const centerY = Math.floor((this.height - (frameCount * this.percentComplete)));
        const color = this.calculatePixelColor(centerX * .001, centerY * .001);

        //console.log(`${centerX}, ${this.height}, ${10}, ${centerY}`)

        this.context.fillStyle = color;

        this.context.fillRect(centerX, centerY, 2, this.height);

        // for (let i = 0; i < frameCount; i++) {
        //     const centerY = Math.floor((this.height - (i * this.percentComplete)));
        //     this.drawRect(centerX, centerY, 2, (centerY / (frameCount * this.percentComplete)));
        // }
    }

    calculatePixelColor(x, y) {
        // Assuming x and y are in the range [0, 1]
        const red = Math.round(255 * Math.sin(x * Math.PI) * Math.sin(y * Math.PI));
        const green = Math.round(255 * Math.sin(x * Math.PI) * Math.sin(y * Math.PI + 0.5 * Math.PI));
        const blue = Math.round(255 * Math.sin(x * Math.PI + 0.5 * Math.PI) * Math.sin(y * Math.PI));

        return `rgb(${red}, ${green}, ${blue})`;
    }

    drawExpandingSineWave(frequency, amplitude, iterations) {
        // Calculate the period (2 * π / frequency) for the sine wave
        const period = 2 * Math.PI / frequency;

        // Draw the expanding sine wave
        for (let i = 0; i < iterations; i++) {
            const phase = i * 0.1;  // Adjust the phase to control the initial position of the wave
            this.drawSineWave(frequency, amplitude, period, phase);
            this.drawReverseSineWave(frequency, amplitude, period, phase);
        }
    }

    drawSineWave(frequency, amplitude, period, phase) {
        this.context.beginPath();

        for (let y = 0; y < this.height; y += 1) {
            const x = this.width / 2 + amplitude * Math.sin((y / this.height) * frequency * period + phase);
            this.context.lineTo(x, y);
        }

        const color = this.calculatePixelColor(Math.random(1), Math.random(1) );
        this.context.strokeStyle = color;
        this.context.stroke();
    }

    drawReverseSineWave(frequency, amplitude, period, phase) {
        this.context.beginPath();

        for (let y = 0; y < this.height; y += 1) {
            const x = this.width / 2 - amplitude * Math.sin((y / this.height) * frequency * period + phase);
            this.context.lineTo(x, y);
        }

        const color = this.calculatePixelColor(Math.random(1), Math.random(1) );
        this.context.strokeStyle = color;
        this.context.stroke();
    }

    drawRect(x, y, width, height) {
        const color = this.calculatePixelColor(x / width, y / height);
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }

    drawBackground() {
        //const color = this.calculatePixelColor(Math.floor(Math.random() * 200), Math.floor(Math.random() * 200));
        const color = 'blue';
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.width, this.height);
    }
}

module.exports = NewSineGenerator;
