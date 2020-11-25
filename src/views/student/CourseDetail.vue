<template>
  <div v-if="!isLoading">
    <CourseIntro
      :title="courseDetails.name"
      :subtitle="courseDetails.description"
    />
    <div class="course-content container-courses">
      <CourseContentLeft :chapters="courseDetails.chapters" />
      <CourseContentRight />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CourseIntro from "../../components/common/CourseIntro";
import CourseContentLeft from "../../components/student/CourseDetail/CourseContentLeft";
import CourseContentRight from "../../components/student/CourseDetail/CourseContentRight";
export default {
  name: "CourseDetails",
  components: {
    CourseContentRight,
    CourseContentLeft,
    CourseIntro,
  },
  data() {
    return {
      isLoading: false,
      courseDetails: null,
    };
  },
  created() {
    this.isLoading = true;
    const courseId = this.$route.params.id;
    axios
      .get(`http://localhost:3300/api/courses/${courseId}`)
      .then((res) => {
        this.courseDetails = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.isLoading = false;
      });
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