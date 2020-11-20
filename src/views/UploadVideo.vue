<template>
    <div id="wrapper">
        <div class="form-upload">
            <center>
                <h3 class="form-title">
                    Upload Video
                </h3>
                <VueFileAgent
                        v-model="fileRecord"
                        ref="vueFileAgent"
                        :multiple="false"
                        @delete="fileDeleted($event)"
                />
                <div class="lds-roller" v-if="isLoading === 'begin'"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <img src="@/assets/tick.png" class="tick-icon" alt="" v-if="isLoading === 'end'" width="150px">
                <button class="btn btn-primary btn-upload" @click="uploadFiles()">
                    {{btnContent}}
                </button>
            </center>
        </div>
    </div>

</template>

<script>
    export default {
        name: "UploadVideo",
        data: function () {
            return {
                fileRecord: [],
                uploadUrl: 'http://localhost:8017/upload',
                uploadHeaders: { 'X-Test-Header': 'vue-file-agent' },
                fileRecordsForUpload: [],
                isLoading: false,
                btnContent: "Upload files"
            }
        },
        methods: {
           uploadFiles: function() {
               console.log(this.fileRecord);
               this.isLoading = 'begin';
               setTimeout(() => {
                   this.$refs.vueFileAgent.upload(this.uploadUrl, this.uploadHeaders, this.fileRecord);
                   this.isLoading = 'end';
                   this.btnContent = "Done";
               }, 3000);
           },

        }
    }
</script>

<style scoped>

    #wrapper {
        width: 100vw;
        height: 100vh;
        background-color: #7494EC;
        padding: 50px 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-upload {
        width: 35%;
        height: 100%;
        padding: 40px;
        background-color: #ffffff;
        border-radius: 15px;
        box-shadow: 0 0 30px;
        position: relative;
    }

    .form-title {
        text-transform: uppercase;
        color: #939DB7;
        margin-bottom: 60px;
    }

    .theme-undefined {
        background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
        border-radius: 15px;
    }

    .btn-upload {
        background-color: #5874C6;
        position: absolute;
        bottom: 40px;
        right: 50%;
        transform: translateX(50%);
        border: none;
        outline: none;
    }

    .lds-roller {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
        margin-top: 60px;
    }

    .tick-icon {
        margin-top: 60px;
    }

    .lds-roller div {
        animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;
    }
    .lds-roller div:after {
        content: " ";
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #7494EC;
        margin: -4px 0 0 -4px;
    }
    .lds-roller div:nth-child(1) {
        animation-delay: -0.036s;
    }
    .lds-roller div:nth-child(1):after {
        top: 63px;
        left: 63px;
    }
    .lds-roller div:nth-child(2) {
        animation-delay: -0.072s;
    }
    .lds-roller div:nth-child(2):after {
        top: 68px;
        left: 56px;
    }
    .lds-roller div:nth-child(3) {
        animation-delay: -0.108s;
    }
    .lds-roller div:nth-child(3):after {
        top: 71px;
        left: 48px;
    }
    .lds-roller div:nth-child(4) {
        animation-delay: -0.144s;
    }
    .lds-roller div:nth-child(4):after {
        top: 72px;
        left: 40px;
    }
    .lds-roller div:nth-child(5) {
        animation-delay: -0.18s;
    }
    .lds-roller div:nth-child(5):after {
        top: 71px;
        left: 32px;
    }
    .lds-roller div:nth-child(6) {
        animation-delay: -0.216s;
    }
    .lds-roller div:nth-child(6):after {
        top: 68px;
        left: 24px;
    }
    .lds-roller div:nth-child(7) {
        animation-delay: -0.252s;
    }
    .lds-roller div:nth-child(7):after {
        top: 63px;
        left: 17px;
    }
    .lds-roller div:nth-child(8) {
        animation-delay: -0.288s;
    }
    .lds-roller div:nth-child(8):after {
        top: 56px;
        left: 12px;
    }
    @keyframes lds-roller {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }



</style>