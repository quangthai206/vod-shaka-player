<template>
  <div>
    <div v-if="role === 'student'">
      <StudentCourse />
    </div>
    <div v-else>
      <TeacherCourse />
    </div>
  </div>
</template>

<script>
import StudentCourse from "../student/CourseDetail";
import TeacherCourse from "../teacher/CourseDetail";

export default {
  components: {
    StudentCourse,
    TeacherCourse,
  },
  data() {
    return {
      role: this.$store.state.auth.user.role,
    };
  },
};
</script>

<style>
</style>