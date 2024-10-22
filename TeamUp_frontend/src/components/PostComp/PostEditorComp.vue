<template>
    <div style="border: 1px solid #ccc;width: 60%;border-radius: 8px">
        <Toolbar
                style="border-bottom: 1px solid #ccc;border-top-left-radius: 8px;border-top-right-radius: 8px"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
        />
        <Editor
                style="height: 350px; overflow-y: hidden;"
                v-model="valueHtml"
                :defaultConfig="editorConfig"
                @onCreated="handleCreated"
        />
    </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeUnmount, shallowRef} from 'vue'
// @ts-ignore
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {ErrorNotice, SuccessNotice} from "@/utils/Notification.js";
import api from "@/api";
import {IDomEditor} from "@wangeditor/editor";

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = defineModel('content');

const toolbarConfig = {
    toolbarKeys: [
        'headerSelect',
        'blockquote',
        'bold',
        'clearStyle',
        'color',
        'bgColor',
        '|',
        // 菜单组，包含多个菜单
        {
            key: 'group-image', // 必填，要以 group 开头
            title: '图片', // 必填
            menuKeys: ['uploadImage',
                'insertImage',]
        },
        {
            key: 'group-link',
            title: '链接',
            menuKeys: ['insertLink']
        },
        {
            key: 'group-table',
            title: '表格',
            menuKeys: ['insertTable',
                'deleteTable',
                'insertTableRow',
                'deleteTableRow',
                'insertTableCol',
                'deleteTableCol',
                'tableHeader',
                'tableFullWidth']
        },
        'divider',
        'emotion',
        'redo',
        'undo'
    ]
}
const editorConfig = {
    MENU_CONF: {},
    placeholder: '请输入内容...'
}
// @ts-ignore
editorConfig.MENU_CONF['uploadImage'] = {
    allowedFileTypes: ['image/*'],
    maxFileSize: 1 * 1024 * 1024,
    // @ts-ignore
    onSuccess(file, res) {
        SuccessNotice('上传成功！')
    },
    // @ts-ignore
    onFailed(file, res) {
        ErrorNotice(res.message);
    },
    // @ts-ignore
    onError(file, err, res) {
        ErrorNotice(err.message);
    },
    // 自定义上传图片
    // @ts-ignore
    async customUpload(file, insertFn) {
        try {
            let formData = new FormData();
            formData.append("file", file); // file 即选中的文件
            const res = await api.commonApi.uploadFile({
                file: formData
            });
            let url = res.data.data.url;
            insertFn(url, 'image', url);
        } catch (e: any) {
            ErrorNotice(e.response.data.message);
        }
    }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: IDomEditor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
    // 保证页面刷新不会丢失
    if (localStorage.getItem('post') != null) {
        editor.setHtml(<string>localStorage.getItem('post'));
    }
}
</script>

<style scoped lang="scss">

</style>