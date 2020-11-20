<template>
    <div>
        <CoursesNavbar />
        <CourseIntro />
        <div class="course-content container-courses">
            <CourseContentLeft />
            <CourseContentRight />
        </div>
    </div>
</template>

<script>
    import CoursesNavbar from "../../components/CoursesNavbar";
    import CourseIntro from "../../components/StudentComponents/CourseDetails/CourseIntro";
    import CourseContentLeft from "../../components/StudentComponents/CourseDetails/CourseContentLeft";
    import CourseContentRight from "../../components/StudentComponents/CourseDetails/CourseContentRight";
    export default {
        name: "CourseDetails",
        components: {CourseContentRight, CourseContentLeft, CourseIntro, CoursesNavbar}
    }
</script>

<style scoped>

    .course-content {
        display: flex;
        padding-top: 50px;
        background-color: #EDF3FF;
    }

</style>