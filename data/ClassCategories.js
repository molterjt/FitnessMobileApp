
const CARDIO = require('../assets/images/gf_cardio.png');
const STRENGTH = require('../assets/images/gf_strength.png')
const SS = require('../assets/images/gf_silver.png');
const MINDBODY = require('../assets/images/gf_mindBody.png')
const ROW = require('../assets/images/gf_row.png');


const CATEGORY = [

    {
        title: 'Cardio Focus',
        summary: 'High intensity cardio based group classes to get your heart rate up and the sweat pouring',
        image: CARDIO,
        options: 'Spinning, Kickboxing, Zumba, Cardio-Blast, HIIT'
    },
    {
        title: 'Strength Focus',
        summary: 'Strength as a skill.  Develop strength, power, and body control.',
        image: STRENGTH,
        options: 'Total-Body-Tone, BootCamp, Kettlebell, Functional Fitness'
    },
    {
        title: 'SilverSneakers',
        summary: 'Focus on well-being, balance, and functional living',
        image: SS,
        options: 'SilverSneakers Group, Silver&Fit, Chair Yoga, Functional Strength'
    },
    {
        title: 'Mind-Body Focus',
        summary: 'Fine tune connection between body and mind',
        image: MINDBODY,
        options: 'Yoga, Breathe, Pilates, Power-Yoga, Brazilian Jiu-Jitsu'
    },
    {
        title: 'Rowing Focus',
        summary: 'No water, no problem. Get rowing',
        image: ROW,
        options: 'Indo-Row, Power-Row'
    },
];

export default CATEGORY;




