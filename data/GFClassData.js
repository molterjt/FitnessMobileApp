import CategoryData from './ClassCategories';


INSTRUCTOR = [


        {
            id: 1,
            name: 'Joe Rogan',
            email: 'fake@me.com',
            KBimage: 'https://workoutsreference.site/small/200/thumbnail/ANd9GcRWWBeSVRfn4prhGh02g8Ux7IuhP9gg3Pkwy4uMkvcCsMZXAGFa.jpg'
        },

        {
            id: 2,
            name: 'Jeff Molter',
            email: 'molterjt@miamioh.edu',
            TRXimage: 'https://www.evolvefp.net/uploads/2/3/4/0/23409794/4542723_orig.jpg'
        },
        {
            id: 3,
            name: 'Abigail Lyons',
            email: 'lyonsai@miamioh.edu',
            Yimage: 'https://scontent.ford1-1.fna.fbcdn.net/v/t31.0-8/25532148_384460608679469_3777340330892530406_o.jpg?oh=85018cfdaf857c463f636e2db208e024&oe=5B4956F0'
        },
        {
            id: 4,
            name: 'The Pebbles',
            email: 'Peebs@doggo.com',
            SSimage: 'https://i.pinimg.com/originals/a1/d5/87/a1d587ca3a4210dba15b4a7a86eac7b8.jpg'
        },
        {
            id: 5,
            name: 'Oscar Weiner',
            email: 'weinerdog@doggo.com',
            ROWimage: 'https://www.tailsonline.com/wp-content/uploads/2015/09/doggy-dog-world-03.jpg'
        },



];

CLASS = [
    {
        id: 1,
        title: 'Kettlebell',
        instructor: INSTRUCTOR[0].name,
        days: ['Mondays ', 'Wednesdays ', 'Fridays ', ],
        time: '3:00 - 4:15 pm',
        location: 'Rec Room: X',
        category: CategoryData[0].title,
        description: 'Learn to use one of the most versatile and effective training tools around for a high intensity strength and mobility class.',
        image: INSTRUCTOR[0].KBimage,
    },
    {
        id: 2,
        title: 'TRX Strength',
        instructor: INSTRUCTOR[1].name,
        days: ['Tuesdays ', 'Thursdays ', 'Saturdays ', ],
        time: '12:00 - 2:15 pm',
        location: 'Rec Room: A',
        category: CategoryData[0].title,
        description: 'Control your body. Get stronger. Straps.',
        image: INSTRUCTOR[1].TRXimage
    },
    {
        id: 3,
        title: 'Power Yoga',
        instructor: INSTRUCTOR[2].name,
        days: ['Mondays ', 'Wednesdays ', 'Fridays ', 'Sundays ' ],
        location: 'Rec Room: B',
        time: '7:00 - 8:15 am',
        category: CategoryData[3].title,
        description: 'Challenge your mind and body. A martial art to conquer yourself',
        image: INSTRUCTOR[2].Yimage
    },
    {
        id: 4,
        title: 'Pebble In Yo Shoe',
        instructor: INSTRUCTOR[3].name,
        days: ['Tuesdays ', 'Fridays ', 'Sundays ' ],
        location: 'Rec Room: B',
        time: '10:00 - 11:15 am',
        category: CategoryData[2].title,
        description: 'Functional mobility to take off your shoes',
        image: INSTRUCTOR[3].SSimage
    },
    {
        id: 5,
        title: 'Dacshunding Through the Rhine',
        instructor: INSTRUCTOR[4].name,
        days: ['Tuesdays ', 'Saturdays ' ],
        location: 'Rec Room: A',
        time: '1:30 - 2:45 pm',
        category: CategoryData[4].title,
        description: 'Rowing adventure through the motherland',
        image: INSTRUCTOR[4].ROWimage
    },
];

export default CLASS;