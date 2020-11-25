<template>
  <div class="content-left">
    <div id="about-course">
      <h2>About the course</h2>
      <br />
      <p>
        Learning how to work with Single File Components is a vital step in
        mastering Vue.js.
      </p>
      <p>
        In this course you’ll learn everything you need to know about Vue’s
        Single File Components, so you can start using them in your projects
        today and speed up your development.
      </p>
    </div>
    <br />
    <div id="destination-course">
      <h4><b>By the end of this course you will know</b></h4>
      <br />
      <ul>
        <li>How to scaffold a new Vue.js project with Vue CLI 3</li>
        <li>What the drawbacks of global components are</li>
        <li>
          How to take advantage of the build step and Pre-Processors like Jade,
          Pug, Stylus, and Sass
        </li>
        <li>
          How to reuse your Single File Components by exporting and importing
          them
        </li>
        <li>
          How to organize your Single File Components according to the official
          style guide
        </li>
        <li>
          What CSS Modules are and how to use scoped styles in your Single File
          Components
        </li>
      </ul>
    </div>

    <ul id="course-lessons">
      <li
        v-for="(chapter, index) in chapters"
        :key="chapter._id"
        class="lessons-chap"
      >
        <div class="number-chap">
          <div>{{ index + 1 }}</div>
        </div>
        <div class="info-chap">
          <div class="title-chap">
            <h2>{{ chapter.title }}</h2>
            <p>{{ chapter.lessons.length }} lessons</p>
          </div>
          <div class="content-chap">
            <ul>
              <li v-for="lesson in chapter.lessons" :key="lesson._id">
                <a>
                  <span class="glyphicon glyphicon-play"></span>
                  <p>
                    <b>{{ lesson.title }}</b>
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CourseContentLeft",
  props: ["chapters"],
  created() {
    console.log(this.chapters);
  },
};
</script>

<style scoped>
.content-left {
  color: #5e527f;
  font-size: 17px;
  line-height: 1.6;
  flex: 2;
  padding-right: 100px;
}

.content-left #destination-course ul {
  padding-left: 40px;
  margin-bottom: 50px;
}

.content-left #course-lessons,
.content-left #course-lessons ul {
  list-style-type: none;
}

.lessons-chap {
  display: flex;
  background-color: #ffffff;
  padding: 20px 20px;
  border-radius: 15px;
  margin-bottom: 40px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
}

.lessons-chap .number-chap {
  margin-right: 20px;
}

.lessons-chap .number-chap > div {
  width: 40px;
  height: 40px;
  border: solid 6px #d6f3ea;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-chap {
  flex-grow: 1;
}

.info-chap .title-chap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.info-chap .content-chap ul li {
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}
.info-chap .content-chap ul li:nth-child(odd) {
  background-color: #f6f5f9;
}

.info-chap .content-chap li a {
  display: flex;
  align-items: center;
}

.info-chap .content-chap li > a > span {
  color: #5cceac;
  padding: 1px;
  text-align: center;
  border: solid 3px #bcebdd;
  border-radius: 50%;
  margin-right: 10px;
}

.info-chap .content-chap li > a > p {
  font-size: 16px;
  color: #766b93;
}
</style>