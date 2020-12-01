<template>
  <div v-if="asyncDataStatus_ready">
    <CourseIntro
      :title="courseDetails.name"
      :subtitle="courseDetails.description"
    />
    <div class="course-content container-courses">
      <CourseContentLeft
        :chapters="courseDetails.chapters"
        @add-chapter="addChapterHandler"
        @add-lesson="addLessonHandler"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CourseIntro from "../../components/common/CourseIntro";
import CourseContentLeft from "../../components/teacher/CourseDetail/CourseContentLeft";
import asyncDataStatus from "../../mixins/asyncDataStatus";

export default {
  name: "CourseDetails",
  mixins: [asyncDataStatus],
  components: {
    CourseContentLeft,
    CourseIntro,
  },
  data() {
    return {
      courseDetails: null,
    };
  },
  methods: {
    addChapterHandler(newChapter) {
      this.courseDetails.chapters.push(newChapter);
    },
    addLessonHandler(newLesson) {
      console.log("from parent handler");
      console.log(newLesson);
      this.courseDetails.chapters.forEach((chapter) => {
        if (chapter._id === newLesson.chapter) {
          chapter.lessons.push(newLesson);
        }
      });
    },
  },
  created() {
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