<template>
  <div v-if="asyncDataStatus_ready">
    <CourseIntro
      :title="courseDetails.name"
      :subtitle="courseDetails.description"
      :imageUrl="courseDetails.imageUrl2"
    />
    <div class="course-content container-courses">
      <CourseContentLeft :chapters="courseDetails.chapters" />
      <CourseContentRight :teacher="courseDetails.teacher" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CourseIntro from "../../components/common/CourseIntro";
import CourseContentLeft from "../../components/student/CourseDetail/CourseContentLeft";
import CourseContentRight from "../../components/student/CourseDetail/CourseContentRight";
import asyncDataStatus from "../../mixins/asyncDataStatus";

export default {
  name: "CourseDetails",
  mixins: [asyncDataStatus],
  components: {
    CourseContentRight,
    CourseContentLeft,
    CourseIntro,
  },
  data() {
    return {
      courseDetails: null,
    };
  },
  created() {
    const courseId = this.$route.params.id;
    axios
      .get(`http://apig9.toedu.me/api/courses/${courseId}`)
      .then((res) => {
        this.courseDetails = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.asyncDataStatus_fetched();
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