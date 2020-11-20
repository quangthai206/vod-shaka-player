<template>
    <div class="course-intro container-courses">
        <div class="course-intro-content">
            <h1 class="intro-title">Single File Components</h1>
            <h5 class="intro-subtitle">Embrace the full power of JavaScript bundlers and Vue.js by learning how to create and manage Single File Components.</h5>
            <div class="course-intro-manip">
                <a class="btn btn-success btn-start">
                    <span class="glyphicon glyphicon-education"></span>
                    Start Course
                </a>
                <a class="btn btn-follow">
                    <span class="glyphicon glyphicon-star"></span>
                    Follow
                </a>
            </div>
        </div>
        <div class="course-intro-img"></div>
    </div>
</template>

<script>
    export default {
        name: "CourseIntro"
    }
</script>

<style scoped>
    .course-intro {
        padding-top: 40px;
        padding-bottom: 50px;
        background: linear-gradient(0deg,#4f48ad,#1d185e 71.5%);
        color: #fff;
        display: flex;
    }

    .course-intro .course-intro-content {
        flex: 1;
        padding-top: 100px;
    }

    .course-intro .course-intro-content .intro-title {
        margin-bottom: 1em;
        font-size: 2.5em;
    }

    .course-intro .course-intro-content .intro-subtitle {
        font-size: 1.15em;
        line-height: 1.6;
        margin-bottom: 70px;
    }

    .course-intro .course-intro-content .course-intro-manip {
        width: 50%;
        display: flex;
        justify-content: space-between;
    }

    .btn-start, .btn-follow {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        text-transform: uppercase;
    }

    .course-intro-manip .btn-start {
        background: linear-gradient(.31deg,#3cac8a .7%,#5cceac 99.3%);
        text-shadow: 0 2px 4px rgba(0,0,0,.25);
    }

    .course-intro-manip .btn-follow {
        background-color: transparent;
    }

    .course-intro .course-intro-img {
        flex: 1;
        background-image: url("https://vueschool.io/media/acb06e901542e9ba62e98f515ce8d266/vuejs-single-file-components.png");
        background-size: contain;
        background-position: right;
        background-repeat: no-repeat;
    }
</style>