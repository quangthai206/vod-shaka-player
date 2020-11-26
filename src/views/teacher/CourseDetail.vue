<template>
  <div v-if="!isLoading">
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
export default {
  name: "CourseDetails",
  components: {
    CourseContentLeft,
    CourseIntro,
  },
  data() {
    return {
      isLoading: false,
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