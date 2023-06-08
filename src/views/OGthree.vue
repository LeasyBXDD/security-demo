<template>
    <div>
        <h1>普通声纹识别模型3</h1>
        <h2>对抗样本可以有效攻击声纹识别模型</h2>
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
        <a-button type="primary" @click="handleUpload" :disabled="fileList.length === 0" style="width: 170px; margin: 8px;">
            开始识别
        </a-button>
        <a-button :disabled="fileList.length === 0" style="width: 170px; margin: 8px;" @click="handleReset">
            重置
        </a-button>
        <a-select ref="select" v-model:value="value1" style="width: 170px; margin: 8px;" @focus="focus" @change="handleChange">
            <a-select-option value="OriginalAudio">OriginalAudio</a-select-option>
            <a-select-option value="AdversarialSample">AdversarialSample</a-select-option>
        </a-select>
    </div>

    <div style="margin-top: 20px;">
        <a-timeline>
            <a-timeline-item color="green">Create a services site 2015-09-01</a-timeline-item>
            <a-timeline-item color="green">Create a services site 2015-09-01</a-timeline-item>
            <a-timeline-item color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
            </a-timeline-item>
            <a-timeline-item>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
            </a-timeline-item>
            <a-timeline-item color="gray">
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
            </a-timeline-item>
            <a-timeline-item color="#00CCFF">
                <template #dot>
                    <SmileOutlined />
                </template>
                <p>Custom color testing</p>
            </a-timeline-item>
        </a-timeline>
    </div>
</template>

<script>
import { message } from 'ant-design-vue';
import { UploadOutlined, SmileOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
    components: {
        UploadOutlined,
        SmileOutlined,
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
});
</script>