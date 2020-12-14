<template>
  <div v-if="asyncDataStatus_ready">
    <div class="watch-container container-courses">
      <h3>
        <router-link :to="'/courses/' + lesson.chapter.course._id"
          ><i class="fa fa-arrow-left"></i>
          {{ lesson.chapter.course.name }}
        </router-link>
      </h3>
      <ShakaPlayer :video="lesson.video" />
      <div class="watch-content">
        <div class="description">
          <h1>{{ lesson.title }}</h1>
          <div class="text xl:text-lg">
            <p>{{ lesson.description }}</p>
          </div>
        </div>
        <div class="watch-aside">
          <div class="download-video">
            <div class="text-blue-darkest">
              DOWNLOAD VIDEO
              <span
                class="px-1 inline-block font-medium text-white bg-purple-lighter text-xs ml-2 rounded hover:text-white"
                >HD</span
              >
              <span
                class="px-1 inline-block font-medium text-white bg-pink-flamingo text-xs ml-1 rounded hover:text-white"
                >SD</span
              >
            </div>
          </div>
          <!-- List lessons -->
          <Playlist :playlist="playlist" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ShakaPlayer from "../../components/common/ShakaPlayer";
import asyncDataStatus from "../../mixins/asyncDataStatus";
import Playlist from "../../components/student/Playlist";

export default {
  mixins: [asyncDataStatus],
  components: { ShakaPlayer, Playlist },
  data() {
    return {
      lesson: null,
      playlist: null,
    };
  },
  created() {
    const lessonId = this.$route.params.id;

    // Get lesson information
    axios
      .get(`http://apig9.toedu.me/api/lessons/${lessonId}`)
      .then((res) => {
        // Get playlist information
        axios
          .get(
            `http://apig9.toedu.me/api/courses/${res.data.data.chapter.course._id}/playlist`
          )
          .then((res) => {
            this.playlist = res.data;
          });

        this.lesson = res.data.data;
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
.watch-container {
  background-color: #edf3ff;
}

.container-courses {
  padding: 60px 90px 0 90px;
}

a {
  color: #5e527f;
}

a:hover {
  color: #5cceac;
}

i {
  color: #5cceac;
  font-size: 18px;
  margin-right: 8px;
}

h3 {
  margin-bottom: 35px;
  font-size: 26px;
}

.player {
  height: 400px;
}

.watch-content {
  padding: 48px 0;
  display: flex;
}

.description {
  width: 55%;
  padding-right: 50px;
}

.watch-aside {
  width: 45%;
}

h1 {
  font-size: 26px;
  margin-bottom: 16px;
}

p {
  margin-bottom: 16px;
  font-size: 18px;
  letter-spacing: 0.9px;
}

ul {
  padding-left: 40px;
}

.download-video {
  background-color: #fff;
  font-size: 14px;
  font-weight: 500;
  border-radius: 0.5rem;
  border: 0 solid #edf3ff;
  padding: 20px;
}

.text-white {
  color: #fff;
}

.px-1 {
  padding: 3px 4px;
}

.ml-2 {
  margin-left: 0.5rem;
}

.font-medium {
  font-weight: 500;
}

.rounded {
  border-radius: 0.25rem;
}

.bg-purple-lighter {
  background-color: #b871ff;
}

.bg-pink-flamingo {
  background-color: #f755e7;
  margin-left: 6px;
}

.mt-6 {
  margin-top: 24px;
}

#chapter-widget {
  color: #766b93;
}

.w-full {
  width: 100%;
}

.shadow-lg {
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
}

.pb-6 {
  padding-bottom: 1.5rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.bg-white {
  background-color: #fff;
}

.md\:px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.text-sm {
  font-size: 14px;
}

.py-4 {
  padding-top: 20px;
  padding-bottom: 20px;
}

.rounded-t-lg {
  border-top-right-radius: 0.5rem;
}

.rounded-t-lg {
  border-top-right-radius: 0.5rem;
}

#chapter-widget a {
  color: #766b93;
  font-size: 15px;
}

.items-center {
  -webkit-box-align: center;
  align-items: center;
}

.flex {
  display: -webkit-box;
  display: flex;
}

a {
  text-decoration: none;
}

a {
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}

.md\:px-8 {
  padding-left: 20px;
  padding-right: 20px;
}

.mb-4 {
  margin-bottom: 16px;
}

.justify-between {
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.items-center {
  -webkit-box-align: center;
  align-items: center;
}

.items-start {
  -webkit-box-align: start;
  align-items: flex-start;
}

.list-reset {
  list-style: none;
  padding: 0;
}

ol,
ul {
  margin: 0;
}

.text-grey {
  color: #b8c2cc;
}

.text-xl {
  font-size: 20px;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

:any-link {
  cursor: pointer;
}

.mt-1 {
  margin-top: 0.25rem;
}

#chapter-widget h3 {
  color: #5e527f;
}

#chapter-widget .watching-lesson {
  color: #5e527f;
  font-weight: 500;
}

#chapter-widget .lesson {
  padding: 8px;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  line-height: 1.5;
}
.md\:mt-8 {
  margin-top: 2rem;
}

.tracking-wide {
  letter-spacing: 0.05em;
}

.leading-loose {
  line-height: 2;
}

.font-thin {
  font-weight: 200;
}

.md\:flex-no-wrap {
  flex-wrap: nowrap;
}

.md\:w-auto {
  width: auto;
}

.md\:m-0 {
  margin: 0;
}

#chapter-widget .lesson:nth-child(2n) {
  border-radius: 0.5rem;
  background: rgba(141, 126, 179, 0.08);
}

.text-xs {
  font-size: 12px;
}

#chapter-widget .p-0 {
  font-size: 13px;
}

.xl\:text-lg {
  font-size: 18px;
}

.fa-star {
  color: #766b93;
  font-size: 13px;
  margin-right: 0;
}

.glyphicon-menu-left,
.glyphicon-menu-right {
  font-size: 15px;
}

.text > p:not(:last-of-type),
.text > ul {
  margin-bottom: 16px;
}
</style>