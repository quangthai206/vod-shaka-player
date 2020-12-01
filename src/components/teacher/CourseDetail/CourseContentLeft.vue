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

    <b-button
      v-b-modal.add-chapter-modal
      variant="primary"
      class="new-chapter-btn btn-lg"
      ><i class="fas fa-plus"></i> New Chapter</b-button
    >

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
            <div>
              <span class="lessons-quantity"
                >{{ chapter.lessons.length }} lessons</span
              >
              <b-button
                v-b-modal.add-lesson-modal
                pill
                variant="success"
                @click="chapterId = chapter._id"
                >Add Lesson</b-button
              >
            </div>
          </div>
          <div class="content-chap">
            <ul>
              <li v-for="lesson in chapter.lessons" :key="lesson._id">
                <a id="lesson-row">
                  <span
                    class="fa fa-play"
                    :class="{ 'disabled-play': !lesson.video }"
                  ></span>
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

    <b-modal id="add-chapter-modal" no-close-on-backdrop>
      <template #modal-title>New Chapter</template>
      <template #modal-footer="{ cancel }">
        <button @click="cancel()" type="button" class="btn btn-secondary">
          Cancel</button
        ><button type="button" class="btn btn-primary" @click="addNewChapter">
          Submit
        </button>
      </template>
      <b-form ref="add-chapter-form" @submit.prevent>
        <b-form-group label="Enter title:" label-for="chapter-title-input">
          <b-form-input
            id="chapter-title-input"
            ref="chapter-title"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <button ref="submit-new-chapter-btn" style="display: none"></button>
      </b-form>
    </b-modal>

    <b-modal id="add-lesson-modal" no-close-on-backdrop>
      <template #modal-title>New Lesson</template>
      <template #modal-footer="{ cancel }">
        <button @click="cancel()" type="button" class="btn btn-secondary">
          Cancel</button
        ><button type="button" class="btn btn-primary" @click="addNewLesson">
          Submit
        </button>
      </template>
      <b-form ref="add-lesson-form" @submit.prevent>
        <b-form-group label="Title:" label-for="lesson-title-input">
          <b-form-input
            id="lesson-title-input"
            ref="lesson-title"
            required
            placeholder="Enter title"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Description:" label-for="lesson-des-input">
          <b-form-input
            id="lesson-des-input"
            ref="lesson-description"
            required
            placeholder="Enter description"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox v-model="chooseAvailableVideo">
            Select available videos
          </b-form-checkbox>
        </b-form-group>
        <b-form-group v-if="chooseAvailableVideo">
          <b-form-select
            ref="lesson-video-id"
            :options="listVideo"
            label="Select video"
            :required="chooseAvailableVideo"
          />
        </b-form-group>
        <b-form-group
          v-if="!chooseAvailableVideo"
          label="Upload video:"
          label-for="lesson-video-input"
        >
          <b-form-file
            ref="lesson-video"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            accept=".mp4"
            :required="!chooseAvailableVideo"
          ></b-form-file>
        </b-form-group>
        <button ref="submit-new-lesson-btn" style="display: none"></button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CourseContentLeft",
  props: ["chapters"],
  created() {
    this.getVideo();
  },
  data() {
    return {
      chapterId: undefined,
      chooseAvailableVideo: false,
      listVideo: [],
    };
  },
  methods: {
    addNewChapter() {
      this.$refs["submit-new-chapter-btn"].click();
      if (this.$refs["add-chapter-form"].checkValidity()) {
        const title = this.$refs["chapter-title"].localValue;
        const courseId = this.$route.params.id;

        axios
          .post("http://localhost:3300/api/chapters", { title, courseId })
          .then((res) => {
            console.log(res.data.data);
            this.$emit("add-chapter", res.data.data);
            this.$bvToast.toast("Chapter created successfully!", {
              title: "Success",
              variant: "success",
              solid: true,
              autoHideDelay: 4000,
            });
          })
          .catch((err) => {
            console.log(err);
            this.$bvToast.toast("Something went wrong :(", {
              title: "Error",
              variant: "danger",
              solid: true,
              autoHideDelay: 4000,
            });
          });

        this.$bvModal.hide("add-chapter-modal");
      }
    },

    addNewLesson() {
      this.$refs["submit-new-lesson-btn"].click();
      if (this.$refs["add-lesson-form"].checkValidity()) {
        const chapterId = this.chapterId;

        let formUpload = new FormData();
        formUpload.append("title", this.$refs["lesson-title"].localValue);
        formUpload.append(
          "description",
          this.$refs["lesson-description"].localValue
        );
        formUpload.append("chapterId", chapterId);

        if (this.chooseAvailableVideo) {
          formUpload.append(
            "videoId",
            this.$refs["lesson-video-id"].localValue
          );
        } else {
          formUpload.append("video", this.$refs["lesson-video"].files[0]);
        }

        axios({
          method: "post",
          url: "http://localhost:3300/api/lessons",
          data: formUpload,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            console.log(res.data.data);
            this.$emit("add-lesson", res.data.data);
            this.$bvToast.toast("Lesson created successfully!", {
              title: "Success",
              variant: "success",
              solid: true,
              autoHideDelay: 4000,
            });
          })
          .catch((err) => {
            console.log(err);
            this.$bvToast.toast("Something went wrong :(", {
              title: "Error",
              variant: "danger",
              solid: true,
              autoHideDelay: 4000,
            });
          });

        this.$bvModal.hide("add-lesson-modal");
      }
    },

    getVideo() {
      axios.get("http://localhost:3300/api/videos").then((res) => {
        const videos = res.data;
        this.listVideo = videos.data.map((item) => ({
          value: item._id,
          text: item.name,
        }));
        console.log(this.listVideo);
      });
    },
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

.content-left ul#course-lessons {
  margin-top: 30px;
  list-style-type: none;
  width: 80%;
}

.content-chap ul {
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
  padding: 3px;
  text-align: center;
  border: solid 3px #bcebdd;
  border-radius: 50%;
  margin-right: 10px;
}

.info-chap .content-chap li > a > p {
  font-size: 16px;
  color: #766b93;
}

.new-chapter-btn {
  font-size: 17px;
}

.lessons-quantity {
  margin-right: 25px;
}

#lesson-row .disabled-play {
  color: #b3b3b3;
  border: solid 3px #b3b3b3;
}
</style>