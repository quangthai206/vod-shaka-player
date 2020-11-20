<template>
    <div class="content-left">
        <div id="about-course">
            <h2>About the course</h2><br>
            <p>Learning how to work with Single File Components is a vital step in mastering Vue.js.</p>
            <p>In this course you’ll learn everything you need to know about Vue’s Single File Components, so you can start using them in your projects today and speed up your development.</p>
        </div>
        <br>
        <div id="destination-course">
            <h4><b>By the end of this course you will know</b></h4><br>
            <ul>
                <li>How to scaffold a new Vue.js project with Vue CLI 3</li>
                <li>What the drawbacks of global components are</li>
                <li>How to take advantage of the build step and Pre-Processors like Jade, Pug, Stylus, and Sass</li>
                <li>How to reuse your Single File Components by exporting and importing them</li>
                <li>How to organize your Single File Components according to the official style guide</li>
                <li>What CSS Modules are and how to use scoped styles in your Single File Components</li>
            </ul>
        </div>

        <button type="button" class="btn btn-primary btn-add-chap" v-on:click="displayAddChapForm">Add Chapter</button>

        <div class="panel panel-success add-wrapper" v-show="isAddingChap">
            <div class="panel-heading">
                <form class="form-inline add-form" v-on:submit="addAChap">
                    <div class="form-group">
                        <input type="text" class="form-control" id="title" placeholder="Enter a title" v-model="title">
                    </div>
                    <button type="submit" class="btn btn-default">Add</button>
                </form>
            </div>
        </div>

        <ul id="course-lessons">
            <CourseChapter
                    v-for="(chap, index) in chaps"
                    v-bind:key="chap.id"
                    v-bind:index="index"
                    v-bind:chap="chap"
            />
        </ul>

        <LessonAddModal />
    </div>
</template>

<script>
    import CourseChapter from "./CourseChapter";
    import LessonAddModal from "./LessonAddModal";
    export default {
        name: "CourseContentLeft",
        components: {LessonAddModal, CourseChapter },
        data: function () {
            return {
                chaps: this.$store.state.lecturerLessonStore.chaps,
                isAddingChap: false,
                title: ""
            }
        },

        methods: {
            displayAddChapForm() {

                this.isAddingChap = !this.isAddingChap;
            },

            addAChap(e) {
                e.preventDefault();

                if(this.title != "") {
                    let newChap = {
                        id: this.chaps.length + 1,
                        title: this.title,
                        lessons: []
                    }

                    this.$store.commit('addAChap', newChap);
                    this.title = "";
                }



            }
        }
    }
</script>

<style scoped>
    .content-left {
        color: #5e527f;
        font-size: 17px;
        line-height: 1.6;
        flex: 2;
        padding-right: 100px;
    }

    .content-left #destination-course ul {
        padding-left: 40px;
        margin-bottom: 50px;
    }


    .content-left #course-lessons {
        list-style-type: none;
    }


    .btn-add-chap {
        margin-bottom: 40px;
    }

    .add-wrapper {
        width: 50%;
    }

    .add-form {
        display: flex;
    }

    .add-form > div {
        flex-grow: 1;
    }

    .add-form > div > input {
        width: 100%;
    }

</style>