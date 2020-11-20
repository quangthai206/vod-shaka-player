<template>
    <div class="courses">
        <CoursesNavbar />
        <CoursesBody />
    </div>
</template>

<script>
    import CoursesNavbar from "../../components/CoursesNavbar";
    import CoursesBody from "../../components/StudentComponents/Courses/CoursesBody";
    export default {
        name: "Courses",
        components: {CoursesBody, CoursesNavbar}
    }
</script>

<style scoped>




</style>