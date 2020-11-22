<template>
    <li>
        <a href="#">
            <span class="glyphicon glyphicon-play"></span>
            <p><b>{{lesson.title}}</b></p>
        </a>
    </li>
</template>

<script>
    export default {
        name: "CourseLesson",
        props: {
            lesson: Object
        }
    }
</script>

<style scoped>
    ul li {
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
    }
    ul li:nth-child(odd) {
        background-color: #F6F5F9;
    }

    li a {

        display: flex;
        align-items: center;

    }

    .info-chap .content-chap li > a > span {
        color: #5CCEAC;
        padding: 1px;
        text-align: center;
        border: solid 3px #BCEBDD;
        border-radius: 50%;
        margin-right: 10px;
    }

    .info-chap .content-chap li > a > p {
        font-size: 16px;
        color: #766b93;
    }
</style>