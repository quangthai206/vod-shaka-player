const lecturerLessonStore = {
    namespaced: true,
    state: () => ({
        chaps: [
            {
                id: 1,
                title: "Introduction",
                lessons: [
                    {
                        id: 1,
                        title: "Lesson 1",
                        description: "",
                        file: null
                    },
                ]
            },
            {
                id: 2,
                title: "ABC",
                lessons: [
                    {
                        id: 1,
                        title: "Lesson 1",
                        description: "",
                        file: null
                    },
                    {
                        id: 2,
                        title: "Lesson 2",
                        description: "",
                        file: null
                    }
                ]
            }
        ],

        idAddingChap: -1,
    }),
    mutations: {
        addAChap(state, chap) {
            state.chaps.push(chap);
        },


        setIdAddingChap(state, num) {
            state.idAddingChap = num;
        },

        addALesson(state, {idChap, lesson}) {
            const chaps = state.chaps;
            const idCurChap = chaps.findIndex(c => c.id === idChap);

            chaps[idCurChap].lessons.push(lesson);

            state.chaps[idCurChap] = chaps[idCurChap];
        }
    }
}

export default lecturerLessonStore;