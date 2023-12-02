//const SpectacularImageGenerator = require('./SpectacularImageGenerator');
//const OvalGenerator = require('./OvalGenerator');
//const Fractal = require('./fractal');
const NewSineGenerator = require('./NewSineGenerator');


// async function generateImages() {
//     for (let i = 0; i < 100; i++) {

//         // const frequencyX = Math.floor(Math.random() * 20) + 1;
//         // const frequencyY = Math.floor(Math.random() * 20) + 1;
//         // const amplitude = Math.floor(Math.random() * 200) + 100;
//         if(i<30){
//             frequencyX = i;
//             frequencyY = 31 - i;
//             amplitude = 100 + i;
//         } else if (i>30 && i<60){
//             frequencyX = 61 - i;
//             frequencyY = i - 30;
//             amplitude = 200 - i;
//         } else {
//             frequencyX = Math.floor(Math.random() * 20) + 1;
//             frequencyY = Math.floor(Math.random() * 20) + 1;
//             amplitude = 70 + i;
//         }

//         //const generator = new SpectacularImageGenerator(15, 8, 127);
//         const generator = new SpectacularImageGenerator(frequencyX, frequencyY, amplitude);
//         generator.generateImage();

//         await sleep(25);
//     }
// }

async function generateImages() {
    const totalFrames = 100;
    for (let i = 0; i < totalFrames; i++) {

        // const generator = new OvalGenerator();
        // generator.generateRippleEffect(i);
        const generator = new NewSineGenerator();
        generator.generateCompleteImage(i, totalFrames);

        await sleep(200);
    }
}

// async function generateImages() {
//     for(let i = 0; i<100; i++){
//         const generator = new Fractal();
//         generator.generateFractal();

//         await sleep(100);
//     }
// }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

generateImages();