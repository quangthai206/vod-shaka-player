<template>
  <div>
    <CourseIntro />
    <div class="course-content container-courses">
      <CourseContentLeft />
      <CourseContentRight />
    </div>
  </div>
</template>

<script>
import CourseIntro from "../../components/student/CourseDetail/CourseIntro";
import CourseContentLeft from "../../components/student/CourseDetail/CourseContentLeft";
import CourseContentRight from "../../components/student/CourseDetail/CourseContentRight";
export default {
  name: "CourseDetails",
  components: {
    CourseContentRight,
    CourseContentLeft,
    CourseIntro,
  },
};
</script>

<style scoped>
.course-content {
  display: flex;
  padding-top: 50px;
  background-color: #edf3ff;
}
</style>