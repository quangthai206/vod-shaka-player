<template>
  <div class="content-right">
    <div class="behind-course">
      <h4>Who's behind the course?</h4>
      <br />
      <div class="media">
        <img
          src="https://www.w3schools.com/bootstrap4/img_avatar3.png"
          class="mr-3 rounded-circle"
          style="width: 60px; height: 60px"
        />
        <div class="media-body">
          <h5 class="media-heading">{{ teacher.name }}</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseContentRight",
  props: ["teacher"],
};
</script>

<style scoped>
.content-right {
  flex: 1;
}

.media-heading {
  margin-bottom: 10px;
}
</style>