<template>
    <div>
        <h1>ECAPA-TDNN 声纹识别模型</h1>
        <h2>对抗样本可以有效攻击声纹识别模型</h2>
    </div>

    <div>
        <a-upload v-model:file-list="fileList" name="file" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers" @change="handleChange" multiple="true">
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
            @change="handleChangeSelect">
            <a-select-option value="OriginalAudio">OriginalAudio</a-select-option>
            <a-select-option value="AdversarialSample">AdversarialSample</a-select-option>
        </a-select>

    </div>

    <div style="margin: 8px; margin-bottom: 20px; margin-top: 6px;">
        <h4>运行时间: {{ timer }}</h4>
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
import { defineComponent, ref, toRefs } from 'vue';
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
        const confidence = ref(0);
        const handleChangeSelect = value1 => {
            if (value1 === 'OriginalAudio') {
                confidence.value = 0.87;
                console.log('OriginalAudio');
            } else if (value1 === 'AdversarialSample') {
                confidence.value = 0.32;
                console.log('AdversarialSample');
            }
            console.log(`selected ${value1}`);
        };
        const handleChange = (info) => {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            info.file.status = 'done';
            message.success(`${info.file.name} file uploaded successfully`);
        }
        const fileList = ref([]);
        return {
            focus,
            handleChangeSelect,
            value1: ref('普通/对抗 模式切换'),
            fileList,
            headers: {
                authorization: 'authorization-text',
            },
            handleChange,
            confidence,
            options1,
        };
    },
    data() {
        return {
            timelineItems: [
                "模型初始化成功",
                "正在输入音频",
                "音频输入成功",
                "样本变化程序运行",
                "样本变化结束",
                "样本识别程序运行",
                "样本识别结束",
                "样本恢复程序运行",
                "样本恢复结束",
                "声纹识别程序运行",
                "声纹识别结束"
            ],
            currentIndex: 0,
            fileList: [],
            timer: 0,
            intervalId: null,
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
                        content: `声纹识别置信度为 ${toRefs(this).confidence.value}, 总共运行了 ${this.timer.toFixed(2)} 秒`,
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