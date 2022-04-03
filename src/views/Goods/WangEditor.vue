<template>
    <div id="div1">
    </div>
</template>

<script>
    import E from 'wangeditor'
    export default {
        name: "WangEditor.vue",
        data(){
            return{
                editor:''
            }
        },
        mounted() {
            this.editor = new E('#div1')
            // 取消自动 focus
            this.editor.config.focus = false
            // 配置 onchange 回调函数
            this.editor.config.onchange = newHtml => {
                // console.log("change 之后最新的 html", newHtml);
                this.$emit('sendEditor',newHtml)
            };
            // 配置触发 onchange 的时间频率，默认为 200ms
            this.editor.config.onchangeTimeout = 500; // 修改为 500ms
            // 默认情况下，显示所有菜单
            this.editor.config.menus = [
                'head',
                'code',
                'splitLine',
                'undo',
                'redo',
            ]
            this.editor.create()
        }
    }
</script>

<style scoped>

</style>