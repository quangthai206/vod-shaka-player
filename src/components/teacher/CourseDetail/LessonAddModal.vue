<template>
    <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add a lesson</h4>
                </div>
                <div class="modal-body">
                    <form action="#">
                        <div class="form-group">
                            <label for="lesson-title">Title:</label>
                            <input type="text" class="form-control" id="lesson-title" v-model="titleWillAdd">
                        </div>
                        <div class="form-group">
                            <label for="dcr">Description:</label>
                            <textarea class="form-control" id="dcr" v-model="descWillAdd"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Upload file:</label>
                            <vue-file-agent v-model="fileWillAdd" :deletable="true"/>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" v-on:click="addALesson">Add</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "LessonAddModal",
        data: function () {
            return {
                titleWillAdd: "",
                descWillAdd: "",
                fileWillAdd: null
            };
        },

        methods: {
            addALesson() {

                const {chaps, idAddingChap} = this.$store.state.lecturerLessonStore;

                const lesson = {
                    id: chaps[idAddingChap-1].lessons.length + 1,
                    title: this.titleWillAdd,
                    description: this.descWillAdd,
                    file: this.fileWillAdd
                }

                this.$store.commit(
                    'lecturerLessonStore/addALesson',
                    {
                        idChap: idAddingChap,
                        lesson: lesson
                    });

                this.titleWillAdd = "";
                this.descWillAdd = "";
                this.file = null;
            }
        }
    }
</script>

<style scoped>

</style>