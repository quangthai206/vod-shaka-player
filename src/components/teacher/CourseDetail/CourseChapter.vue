<template>
    <li class="lessons-chap">
        <div class="number-chap">
            <div>{{index+1}}</div>
        </div>
        <div class="info-chap">
            <div class="title-chap">
                <h2>{{chap.title}}</h2>
                <p>{{chap.lessons.length}} lessons</p>
            </div>
            <div class="content-chap">
                <ul>
                    <CourseLesson
                            v-for="(l,index) in chap.lessons"
                            v-bind:key="index"
                            v-bind:lesson="l"
                    />
                    <button
                        type="button"
                        class="btn btn-info btn-add-lesson"
                        data-toggle="modal"
                        data-target="#myModal"
                        v-on:click="setIdAddingChap"
                    >
                            Add Lesson
                    </button>

                </ul>
            </div>
        </div>
        <button class="btn btn-warning">Add lesson</button>
    </li>
</template>

<script>
    import CourseLesson from "./CourseLesson";
    export default {
        name: "CourseChapter",
        components: {CourseLesson},
        props: {
            chap: Object,
            index: Number,
        },

        methods: {
            setIdAddingChap(){
                this.$store.commit('lecturerLessonStore/setIdAddingChap', this.chap.id);
            }
        }
    }
</script>

<style scoped>
    .lessons-chap {
        display: flex;
        background-color: #ffffff;
        padding: 20px 20px;
        border-radius: 15px;
        margin-bottom: 40px;
        box-shadow: 0 15px 30px 0 rgba(0,0,0,.11), 0 5px 15px 0 rgba(0,0,0,.08);
    }

    .lessons-chap .number-chap {
        margin-right: 20px;
    }

    .lessons-chap .number-chap > div {
        width: 40px;
        height: 40px;
        border: solid 6px #D6F3EA;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info-chap {
        flex-grow: 1;
    }

    .info-chap .title-chap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;
    }

    ul {
        list-style-type: none;
    }

    ul .btn-add-lesson {
        float: right;
    }
</style>