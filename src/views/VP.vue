<template>
    <div>
        <h1>我们的声纹识别模型 VP Sentinel</h1>
        <h2>可以有效防御对抗样本的攻击，识别并还原出原本的音频内容</h2>
    </div>

    <div>
        <a-upload v-model:file-list="fileList" name="file" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers" @change="handleChange">
            <a-button style="margin: 8px; margin-bottom: 0px;">
                <upload-outlined></upload-outlined>
                点击上传
            </a-button>
        </a-upload>
        <div style="margin: 8px;"></div>
        <a-button type="primary" @click="handleUpload" style="width: 170px; margin: 8px;">
            开始识别
        </a-button>
        <a-button style="width: 170px; margin: 8px;" @click="handleReset">
            重新尝试
        </a-button>

        <a-select ref="select" v-model:value="value1" style="width: 170px; margin: 8px;" @focus="focus"
            @change="handleChange">
            <a-select-option value="OriginalAudio">OriginalAudio</a-select-option>
            <a-select-option value="AdversarialSample">AdversarialSample</a-select-option>
        </a-select>

        <a-text>运行时间: {{ timer }}</a-text>
    </div>


    <div style="margin: 8px;">
        <a-timeline>
            <a-timeline-item v-for="(item, index) in timelineItems" :key="index" :color="getColor(index)">
                <p v-if="index <= currentIndex">{{ item }}</p>
            </a-timeline-item>
        </a-timeline>
    </div>
</template>

<script>
import { message, Modal } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
    components: {
        UploadOutlined,
    },
    setup() {
        const options1 = ref([{
            value: '原始音频',
            label: 'OriginalAudio',
        }, {
            value: '对抗样本',
            label: 'AdversarialSample',
        }]);
        const focus = () => {
            console.log('focus');
        };
        const handleChangeSelect = value => {
            console.log(`selected ${value}`);
        };
        const handleChange = info => {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        };
        const fileList = ref([]);
        return {
            focus,
            handleChangeSelect,
            value1: ref('OriginalAudio'),
            fileList,
            headers: {
                authorization: 'authorization-text',
            },
            handleChange,
            options1,
        };
    },
    data() {
        return {
            timelineItems: [
                "Create a services site 2015-09-01",
                "Create a services site 2015-09-01",
                "Solve initial network problems 1",
                "Solve initial network problems 2",
                "Solve initial network problems 3 2015-09-01",
                "Technical testing 1",
                "Technical testing 2",
                "Technical testing 3 2015-09-01",
                "Technical testing 1",
                "Technical testing 2",
                "Technical testing 3 2015-09-01",
                "Custom color testing"
            ],
            currentIndex: 0,
            fileList: [],
            timer: 0,
            intervalId: null
        };
    },
    mounted() {
    },
    methods: {
        handleUpload() {
            this.intervalId = setInterval(() => {
                this.timer += 0.01;
            }, 10); // Update timer every second
            this.updateIndex();
        },
        handleReset() {
            this.currentIndex = 0;
            clearInterval(this.intervalId);
            const totalTime = this.timer;
            this.timer = 0;
        },
        getColor(index) {
            if (index === this.timelineItems.length - 1) {
                return "#00CCFF";
            } else if (index % 2 === 0) {
                return "green";
            } else {
                return "red";
            }
        },
        updateIndex() {
            setTimeout(() => {
                this.currentIndex++;
                if (this.currentIndex < this.timelineItems.length) {
                    this.updateIndex();
                } else {
                    clearInterval(this.intervalId);
                    Modal.success({
                        title: '运行结果',
                        content: `声纹识别置信度为 0.89,总共运行了 ${this.timer.toFixed(2)} 秒`,
                    });
                }
            }, Math.floor(Math.random() * 3000) + 100); // Update currentIndex after a random time between 100ms and 3s
        }
    },
    computed: {
        currentTimelineItem() {
            return this.timelineItems[this.currentIndex];
        }
    }
});
</script>