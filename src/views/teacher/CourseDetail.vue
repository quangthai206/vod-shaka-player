<template>
  <div>
    <CourseIntro />
    <div class="course-content container-courses">
      <CourseContentLeft />
    </div>
  </div>
</template>

<script>
import CourseIntro from "../../components/teacher/CourseDetail/CourseIntro";
import CourseContentLeft from "../../components/teacher/CourseDetail/CourseContentLeft";
export default {
  name: "ACourse",
  components: { CourseContentLeft, CourseIntro },
};
</script>

<style scoped>
.course-content {
  display: flex;
  padding-top: 50px;
  background-color: #edf3ff;
}
</style>