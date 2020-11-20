<template>
    <div>
        <CoursesNavbar />
        <CourseIntro />
        <div class="course-content container-courses">
            <CourseContentLeft />
        </div>
    </div>
</template>

<script>
    import CoursesNavbar from "../../components/CoursesNavbar";
    import CourseIntro from "../../components/LecturerComponents/ACourseComponents/CourseIntro";
    import CourseContentLeft from "../../components/LecturerComponents/ACourseComponents/CourseContentLeft";
    export default {
        name: "ACourse",
        components: {CourseContentLeft, CourseIntro, CoursesNavbar}
    }
</script>

<style scoped>
    .course-content {
        display: flex;
        padding-top: 50px;
        background-color: #EDF3FF;
    }
</style>