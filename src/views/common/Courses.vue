<template>
  <div class="courses-body container-courses">
    <div class="courses-header">
      <div class="courses-title">
        <h1 v-if="role === 'student'">STUDENT'S COURSES</h1>
        <h1 v-else>TEACHER'S COURSES</h1>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi
          architecto et explicabo fuga hic, odio rem repellendus soluta unde?
        </p>
      </div>
      <div class="courses-info"></div>
    </div>
    <div class="courses-filter">
      <div id="type-class">
        <ul class="nav nav-tabs nav-types">
          <li><a href="#">Premium</a></li>
          <li><a href="#">Free</a></li>
          <li><a href="#">Master Class</a></li>
        </ul>
      </div>
      <div id="filters-dropdown">
        <div class="dropdown">
          <button class="dropdown-toggle" type="button" data-toggle="dropdown">
            Skill level <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li><a href="#">All</a></li>
            <li><a href="#">Beginner</a></li>
            <li><a href="#">Intermediate</a></li>
            <li><a href="#">Advanced</a></li>
          </ul>
        </div>
        <div class="dropdown">
          <button class="dropdown-toggle" type="button" data-toggle="dropdown">
            Watched state <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li><a href="#">All</a></li>
            <li><a href="#">In process</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="courses-list">
      <div
        class="course-item"
        v-for="course in courses"
        :key="course._id"
        @click="goToCourse(course._id)"
      >
        <div class="course-item-img">
          <div
            style="
              background-image: url('https://vueschool.io/media/4736c711002f927627a56f1e43a4841a/vueschool-vue-3-composition-api-not-transparent.jpg');
            "
          ></div>
        </div>
        <div class="course-item-desc">
          <h3 class="course-title">{{ course.name }}</h3>
          <br />
          <p class="course-subtitle">
            {{ course.description }}
          </p>
          <div v-if="role === 'student'" class="course-lecturers">
            <span class="label label-default">{{ course.teacher.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      role: this.$store.state.auth.user.role,
      courses: [],
    };
  },
  created() {
    axios.get("http://localhost:3300/api/courses").then((res) => {
      console.log(res.data.data);
      this.courses = res.data.data;
    });
  },
  methods: {
    goToCourse(id) {
      this.$router.push("courses/" + id);
    },
  },
};
</script>

<style scoped>
.courses-body {
  background-color: #edf3ff;
  height: 100%;
}

.courses-body .courses-header {
  display: flex;
  justify-content: space-between;
  padding: 40px 0;
}

.courses-body .courses-filter {
  padding: 20px 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.courses-filter #type-class .nav-types {
  border-radius: 10px;
  border: solid 1px #d5e4ff;
}

.nav-types li a {
  padding: 12px 24px;
  color: #5e527f;
}

.courses-filter #filters-dropdown {
  display: flex;
}

#filters-dropdown > div {
  margin-left: 20px;
  border: solid 1px #d5e4ff;
  width: 256px;
  border-radius: 15px;
}

#filters-dropdown > div button {
  background-color: #fff;
  color: #5e527f;
  border: none;
  outline: none;
  width: 100%;
  border-radius: 15px;
  padding: 16px;
  text-align: left;
  display: flex;
  align-items: center;
}

#filters-dropdown > div button span {
  margin-left: auto;
}

.courses-list {
  margin-top: 2.5em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding-bottom: 40px;
}

.courses-list .course-item {
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background-color: #ffffff;
  position: relative;
}

.courses-list .course-item .course-item-img {
  height: 20rem;
  overflow: hidden;
}

.courses-list .course-item .course-item-img > div {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: 0.5s;
}

.courses-list .course-item:hover .course-item-img > div {
  transform: scale(1.25);
}

.courses-list .course-item .course-item-desc {
  padding: 25px 24px;
  height: calc(100% - 20rem);
}

.course-item-desc .course-title {
  color: #38416f;
  font-size: 26px;
}

.course-item-desc .course-subtitle {
  color: #766b93;
  margin-bottom: 5em;
}

.course-item-desc .course-lecturers span {
  padding: 4px 8px;
  font-size: 12px;
  font-weight: normal;
  background-color: #eae9ef;
  color: #766b93;
  text-transform: uppercase;
  position: absolute;
  bottom: 20px;
}
</style>