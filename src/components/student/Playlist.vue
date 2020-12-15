<template>
  <div class="mt-6 list-lessons">
    <div v-if="playlist">
      <div
        class="w-full bg-white rounded-lg pb-6 shadow-lg"
        id="chapter-widget"
      >
        <div
          class="rounded-t-lg px-4 md:px-8 py-4 text-sm"
          style="background: rgb(246, 245, 249) none repeat scroll 0% 0%"
        >
          <a href="#" class="hover:no-underline flex items-center"
            ><router-link
              :to="'/courses/' + playlist.courseId"
              class="hover:no-underline"
              ><i class="fas fa-arrow-left text-green mr-1"></i>
              {{ playlist.courseTitle }}
            </router-link></a
          >
        </div>
        <div class="px-4 md:px-8">
          <div class="mt-6 mb-4 flex justify-between items-center">
            <ul class="list-reset flex items-start">
              <li>
                <a
                  v-if="currentChapterIndex > 0"
                  :title="`Previous Chapter: ${
                    playlist.chapters[currentChapterIndex - 1].title
                  }`"
                  @click="prevChapter"
                  style="cursor: pointer"
                  ><i class="fa fa-angle-left text-green text-xl"></i
                ></a>
                <i
                  v-else
                  class="fa fa-angle-left text-grey text-xl cursor-not-allowed"
                ></i>
              </li>
              <li
                class="flex items-center text-sm justify-center"
                style="min-width: 73px; font-size: 15px"
              >
                Chapter {{ currentChapterIndex + 1 }}
              </li>
              <li>
                <a
                  v-if="currentChapterIndex < playlist.chapters.length - 1"
                  :title="`Next Chapter: ${
                    playlist.chapters[currentChapterIndex + 1].title
                  }`"
                  @click="nextChapter"
                  style="cursor: pointer"
                  ><i class="fa fa-angle-right text-green text-xl"></i
                ></a>
                <i
                  v-else
                  class="fa fa-angle-right text-grey text-xl cursor-not-allowed"
                ></i>
              </li>
            </ul>
            <div>
              <div>
                <a class="text-xs p-0" style="cursor: pointer"
                  ><i class="far fa-star"></i>
                  Follow
                </a>
                <p
                  data-v-4fdc60af=""
                  class="text-sm text-grey"
                  style="display: none"
                >
                  You will receive a notification to your email when a new
                  lesson is published.
                </p>
              </div>
            </div>
          </div>
          <div class="mt-1 flex items-center justify-between">
            <h4 class="text-xl">{{ currentChapter.title }}</h4>
            <span class="md:inline-block text-sm"
              >{{ playlist.chapters[currentChapterIndex].lessons.length }}
              {{
                playlist.chapters[currentChapterIndex].lessons.length > 1
                  ? "lessons"
                  : "lesson"
              }}
              • {{ totalMinutePerChapter(currentChapterIndex) }} min</span
            >
          </div>
          <div class="lessons mt-6">
            <div
              v-for="(lesson, index) in currentChapter.lessons"
              :key="lesson._id"
              class="lesson leading-tight"
              :class="{ 'watching-lesson': lesson._id === currentLesson }"
            >
              <div class="flex">
                <div
                  class="flex justify-center items-center"
                  style="width: 25px"
                >
                  <i
                    v-if="lesson._id === currentLesson"
                    class="fas fa-play text-green"
                  ></i>
                  <span v-else class="text-xs text-center"
                    >{{ index + 1 }}.</span
                  >
                </div>
                <span
                  ><router-link
                    :to="`/lessons/${lesson._id}`"
                    :event="lesson.video ? 'click' : ''"
                  >
                    {{ lesson.title }}
                  </router-link></span
                >
                <div class="flex items-center"></div>
              </div>
              <span v-if="lesson.video">{{
                fmtMSS(lesson.video.duration)
              }}</span>
            </div>
          </div>
          <div
            v-if="currentChapterIndex < playlist.chapters.length - 1"
            class="mt-4 md:mt-8"
          >
            <span class="font-thin text-sm leading-loose tracking-wide"
              >NEXT CHAPTER</span
            >
            <div class="flex flex-wrap md:flex-no-wrap justify-between">
              <a @click="nextChapter" style="cursor: pointer">{{
                playlist.chapters[currentChapterIndex + 1].title
              }}</a>
              <span class="w-full md:m-0 md:w-auto text-sm">
                {{ playlist.chapters[currentChapterIndex + 1].lessons.length }}
                {{
                  playlist.chapters[currentChapterIndex + 1].lessons.length > 1
                    ? "lessons"
                    : "lesson"
                }}
                • {{ totalMinutePerChapter(currentChapterIndex + 1) }} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full bg-white rounded-lg py-5 shadow-lg">
      <AppSpinner />
    </div>
  </div>
</template>

<script>
import AppSpinner from "../common/AppSpinner";
export default {
  components: { AppSpinner },
  props: ["playlist"],
  data() {
    return {
      currentLesson: undefined,
      currentChapterIndex: undefined,
    };
  },
  computed: {
    currentChapter() {
      return this.playlist.chapters[this.currentChapterIndex];
    },
  },
  created() {
    this.currentLesson = this.$route.params.id;
    console.log(this.currentLesson);
  },
  methods: {
    nextChapter() {
      console.log("next chapter");
      this.currentChapterIndex++;
    },
    prevChapter() {
      console.log("previous chapter");
      this.currentChapterIndex--;
    },
    totalMinutePerChapter(chapterIndex) {
      console.log(chapterIndex);
      console.log(this.playlist.chapters[chapterIndex].lessons);
      const totalSecond = this.playlist.chapters[chapterIndex].lessons.reduce(
        (total, currentValue) => {
          return total + (currentValue.video ? currentValue.video.duration : 0);
        },
        0
      );
      console.log(totalSecond);
      return Math.floor(totalSecond / 60);
    },
    getInitialChapter(chapters) {
      chapters.forEach((item, index) => {
        const found = item.lessons.find(
          (ele) => ele._id === this.currentLesson
        );
        if (found) {
          this.currentChapterIndex = index;
        }
      });
    },
    fmtMSS(s) {
      return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
    },
  },
  watch: {
    playlist(newVal) {
      this.getInitialChapter(newVal.chapters);
    },
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