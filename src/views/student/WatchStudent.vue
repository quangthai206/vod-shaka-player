<template>
  <div v-if="!isLoading">
    <div class="watch-container container-courses">
      <h2>
        <router-link :to="'/courses/' + lesson.chapter.course._id"
          ><i class="glyphicon glyphicon-arrow-left"></i>
          {{ lesson.chapter.course.name }}
        </router-link>
      </h2>
      <ShakaPlayer />
      <div class="watch-content">
        <div class="description">
          <h1>{{ lesson.title }}</h1>
          <div class="text xl:text-lg">
            <p>{{ lesson.description }}</p>
          </div>
        </div>
        <div class="watch-aside">
          <div class="download-video">
            <div class="px-5 py-5 block text-blue-darkest">
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
          <div class="mt-6 list-lessons">
            <div>
              <div
                class="w-full bg-white rounded-lg pb-6 shadow-lg"
                id="chapter-widget"
              >
                <div
                  class="rounded-t-lg px-4 md:px-8 py-4 text-sm"
                  style="
                    background: rgb(246, 245, 249) none repeat scroll 0% 0%;
                  "
                >
                  <a href="#" class="hover:no-underline flex items-center"
                    ><a
                      href="/courses/nuxtjs-fundamentals"
                      title="Course Overview of Nuxt.js Fundamentals"
                      class="hover:no-underline"
                      ><i class="fas fa-arrow-left text-green mr-1"></i>
                      Nuxt.js Fundamentals
                    </a></a
                  >
                </div>
                <div class="px-4 md:px-8">
                  <div class="mt-6 mb-4 flex justify-between items-center">
                    <ul class="list-reset flex items-start">
                      <li>
                        <i
                          class="glyphicon glyphicon-menu-left text-grey text-xl cursor-not-allowed"
                        ></i>
                      </li>
                      <li
                        class="flex items-center text-sm justify-center"
                        style="min-width: 73px; font-size: 15px"
                      >
                        Chapter 1
                      </li>
                      <li>
                        <a href="#" title="Next Chapter: Working with Nuxt.js"
                          ><i
                            class="glyphicon glyphicon-menu-right text-green text-xl"
                          ></i
                        ></a>
                      </li>
                    </ul>
                    <div>
                      <div data-v-4fdc60af="">
                        <a
                          data-v-4fdc60af=""
                          href="#"
                          title="Follow Nuxt.js Fundamentals"
                          class="text-xs p-0"
                          ><i data-v-4fdc60af="" class="far fa-star"></i>
                          Follow
                        </a>
                        <p
                          data-v-4fdc60af=""
                          class="text-sm text-grey"
                          style="display: none"
                        >
                          You will receive a notification to your email when a
                          new lesson is published.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-1 flex items-center justify-between">
                    <h3 class="text-xl">Introduction to Nuxt.js</h3>
                    <span class="hidden md:inline-block text-sm"
                      >3 lessons • 7 min</span
                    >
                  </div>
                  <div class="lessons mt-6">
                    <div class="lesson leading-tight watching-lesson">
                      <div class="flex">
                        <div
                          class="flex justify-center items-center"
                          style="width: 25px"
                        >
                          <i class="fas fa-play text-green"></i>
                        </div>
                        <span
                          ><a
                            href="/lessons/what-is-nuxtjs"
                            title="Go to Vue.js lesson: What is Nuxt.js?"
                          >
                            What is Nuxt.js?
                          </a></span
                        >
                        <div class="flex items-center"><!----></div>
                      </div>
                      <span>3:45</span>
                    </div>
                    <div class="lesson leading-tight">
                      <div class="flex">
                        <div
                          class="flex justify-center items-center"
                          style="width: 25px"
                        >
                          <span class="text-xs text-center">2.</span>
                        </div>
                        <span
                          ><a
                            href="/lessons/create-nuxt-app"
                            title="Go to Vue.js lesson: Create Nuxt App"
                          >
                            Create Nuxt App
                          </a></span
                        >
                        <div class="flex items-center"><!----></div>
                      </div>
                      <span>1:38</span>
                    </div>
                    <div class="lesson leading-tight">
                      <div class="flex">
                        <div
                          class="flex justify-center items-center"
                          style="width: 25px"
                        >
                          <span class="text-xs text-center">3.</span>
                        </div>
                        <span
                          ><a
                            href="/lessons/guided-nuxtjs-project-tour"
                            title="Go to Vue.js lesson: Guided Nuxt.js Project Tour"
                          >
                            Guided Nuxt.js Project Tour
                          </a></span
                        >
                        <div class="flex items-center"><!----></div>
                      </div>
                      <span>2:02</span>
                    </div>
                  </div>
                  <div class="mt-4 md:mt-8">
                    <span class="font-thin text-sm leading-loose tracking-wide"
                      >NEXT CHAPTER</span
                    >
                    <div class="flex flex-wrap md:flex-no-wrap justify-between">
                      <a href="#" title="Up next Working with Nuxt.js"
                        >Working with Nuxt.js</a
                      >
                      <span class="w-full mt-2 md:m-0 md:w-auto text-sm">
                        8 lessons • 19 min
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ShakaPlayer from "../../components/ShakaPlayer";

export default {
  components: { ShakaPlayer },
  data() {
    return {
      isLoading: false,
      lesson: null,
    };
  },
  created() {
    this.isLoading = true;
    const lessonId = this.$route.params.id;
    axios
      .get(`http://localhost:3300/api/lessons/${lessonId}`)
      .then((res) => {
        console.log(res.data.data);
        this.lesson = res.data.data;
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
.watch-container {
  background-color: #edf3ff;
}

.container-courses {
  padding: 0 12%;
  padding-top: 1px;
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

h2 {
  margin: 40px 0 32px 0;
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
  width: 60%;
  padding-right: 70px;
}

.watch-aside {
  width: 40%;
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

.watch-aside {
  padding-left: 70px;
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