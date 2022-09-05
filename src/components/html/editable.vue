<template>
    <div id="pell" class="pell">
        <div class="pell-actionbar">
            <button v-for="action in defaultActions"
                    @click="action.result(), check(), $refs.editable.focus()"
                    :class="action._class"
                    :title="action.title"
                    :disabled="action.disabled"
                    type="button"
                    v-html="action.icon"></button>


            <!-- <button @click="action('bold'), check_selected('bold', $event)"
                    @mouseup="check_selected('bold', $event)"
                    @keyup="check_selected('bold', $event)"
                    class="pell-button bold"
                    title="Bold" type="button">B</button>
            <button @click="action('italic'), check_selected('italic', $event)"
                    @mouseup="check_selected('italic', $event)"
                    @keyup="check_selected('italic', $event)"
                    class="pell-button italic"
                    title="Italic" type="button">I</button>
            <button @click="action('underline'), check_selected('underline', $event)"
                    @mouseup="check_selected('underline', $event)"
                    @keyup="check_selected('underline', $event)"
                    class="pell-button underline"
                    title="Underline" type="button">U</button>
            <button @click="action('strikethrough'), check_selected('strikethrough', $event)"
                    @mouseup="check_selected('strikethrough', $event)"
                    @keyup="check_selected('strikethrough', $event)"
                    class="pell-button strike"
                    title="Strike-through" type="button">S</button>
            <button @click="action('heading1')"
                    class="pell-button"
                    title="Heading 1"
                    type="button"><b>H<sub>1</sub></b></button>
            <button @click="action('heading2')"
                    class="pell-button"
                    title="Heading 2"
                    type="button"><b>H<sub>2</sub></b></button>
            <button @click="action('paragraph')"
                    class="pell-button"
                    title="Paragraph"
                    type="button">¶</button>
            <button @click="action('quote')"
                    class="pell-button"
                    title="Quote"
                    type="button">“ ”</button>
            <button @click="action('olist')"
                    class="pell-button"
                    title="Ordered List"
                    type="button">#</button>
            <button @click="action('ulist')"
                    class="pell-button"
                    title="Unordered List"
                    type="button">•</button>
            <button @click="action('code')"
                    class="pell-button"
                    title="Code"
                    type="button">&lt;/&gt;</button>
            <button @click="action('line')"
                    class="pell-button"
                    title="Horizontal Line"
                    type="button">―</button>
            <button @click="action('image')"
                    class="pell-button"
                    title="Image"
                    type="button">📷</button>
            <button @click="action('link')"
                    class="pell-button"
                    title="Link"
                    type="button">🔗</button> -->
        </div>
        <div
            contenteditable="true"
            class="pell-content"
            ref="editable"
            @keyup="check()"
            @mouseup="check()"
            @input="oninput"
            @keydown="onkeydown">{{ content }}</div>
        <pre>{{ contentHtml }}</pre>
    </div>
</template>
<script>
    export default {
        name: 'HtmlEditable',
        props: {
            content: {
                type    : String,
                default : '',
            },
            defaultParagraphSeparator : {
                type    : String,
                default : 'div',
            },
            callback: {
                type: Function,
                default () {
                    this.$emit('editable', this.$refs.editable.innerHTML)
                }
            }
        },
        data(){
            let that = this
            return {
                defaultParagraphSeparatorString : 'defaultParagraphSeparator',
                formatBlock                     : 'formatBlock',
                defaultActions                  : [
                        {// bold: {
                            icon     : '<b>B</b>',
                            title    : 'Bold',
                            _class   : ['pell-button', 'bold'],
                            disabled : false,
                            state    : () => this.query_command_state('bold'),
                            result   : () => this.exec('bold'),
                        },
                        {// italic: {
                            icon     : '<i>I</i>',
                            title    : 'Italic',
                            _class   : ['pell-button', 'italic'],
                            disabled : false,
                            state    : () => this.query_command_state('italic'),
                            result   : () => this.exec('italic'),
                        },
                        {// underline: {
                            icon     : '<u>U</u>',
                            title    : 'Underline',
                            _class   : ['pell-button', 'underline'],
                            disabled : false,
                            state    : () => this.query_command_state('underline'),
                            result   : () => this.exec('underline'),
                        },
                        {// strikethrough: {
                            icon     : '<strike>S</strike>',
                            title    : 'Strike-through',
                            _class   : ['pell-button', 'strike'],
                            disabled : false,
                            state    : () => this.query_command_state('strikeThrough'),
                            result   : () => this.exec('strikeThrough'),
                        },
                        {// heading1: {
                            icon     : '<b>H<sub>1</sub></b>',
                            title    : 'Heading 1',
                            _class   : ['pell-button'],
                            disabled : false,
                            result   : () => this.exec(this.formatBlock, '<h1>'),
                        },
                        {// heading2: {
                            icon     : '<b>H<sub>2</sub></b>',
                            title    : 'Heading 2',
                            _class   : ['pell-button'],
                            disabled : false,
                            result   : () => this.exec(this.formatBlock, '<h2>'),
                        },
                        {// paragraph: {
                            icon     : '&#182;',// ¶
                            title    : 'Paragraph',
                            _class   : ['pell-button'],
                            disabled : false,
                            result   : () => this.exec(this.formatBlock, '<p>'),
                        },
                        {//quote: {
                            icon     : '&#8220; &#8221;',// “ ”
                            title    : 'Quote',
                            _class   : ['pell-button'],
                            disabled : false,
                            result   : () => this.exec(this.formatBlock, '<blockquote>'),
                        },
                        {//olist: {
                            icon     : '&#35;',// #
                            title    : 'Ordered List',
                            _class   : ['pell-button'],
                            disabled : false,
                            result   : () => this.exec('insertOrderedList'),
                        },
                        {//ulist: {
                            icon     : '&#8226;',// •
                            title    : 'Unordered List',
                            _class   : ['pell-button'],
                            disabled : false,
                            result   : () => this.exec('insertUnorderedList'),
                        },
                        {//code: {
                            icon     : '&lt;/&gt;',// &lt;/&gt;
                            title    : 'Code',
                            _class   : ['pell-button'],
                            disabled : false,
                            result   : function(){
                                if(this._class.includes(that.selectedClasses)){
                                    this._class = this._class.filter(x => x != that.selectedClasses)
                                    that.defaultActions.forEach(e => {
                                        if(e.title != 'Code'){
                                            e.disabled = false
                                        }
                                    })
                                    that.$refs.editable.innerHTML = that.unEscapeHtml(that.$refs.editable.innerHTML)
                                }else{
                                    this._class.push(that.selectedClasses)
                                    that.defaultActions.forEach(e => {
                                        if(e.title != 'Code'){
                                            e.disabled = true
                                        }
                                    })
                                    that.$refs.editable.innerHTML = that.escapeHtml(that.$refs.editable.innerHTML)

                                } //this.exec(this.formatBlock, '<pre>'),
                            }
                        },
                        {//line: {
                            icon     : '&#8213;',// ―
                            title    : 'Horizontal Line',
                            _class   : ['pell-button'],
                            disabled : false,
                            result   : () => this.exec('insertHorizontalRule'),
                        },
                        {//link: {
                            icon     : '&#128279;',// 📷
                            title    : 'Link',
                            _class   : ['pell-button', 'link'],
                            disabled : false,
                            result   : () => {
                                const url = window.prompt('Enter the link URL')
                                if (url) this.exec('createLink', url)
                            },
                        },
                        {//image: {
                            icon     : '&#128247;',// 🔗
                            title    : 'Image',
                            _class   : ['pell-button', 'image'],
                            disabled : false,
                            result   : () => {
                                const url = window.prompt('Enter the image URL')
                                if (url) this.exec('insertImage', url)
                            },
                        }
                ],
                contentHtml : '',
                selectedClasses : 'pell-button-selected',
            }
        },
        methods : {
            exec : (command, value = null) => document.execCommand(command, false, value),

            query_command_state : command => document.queryCommandState(command),

            query_command_value : command => document.queryCommandValue(command),

            oninput({ target: { firstChild } }){
                // console.log('input', firstChild, firstChild.nodeType)

                if (firstChild && firstChild.nodeType === 3) {
                    this.exec(this.formatBlock, `<${this.defaultParagraphSeparator}>`)
                }else if (this.$refs.editable.innerHTML === '<br>') this.$refs.editable.innerHTML = ''

                this.callback(this.$refs.editable.innerHTML)
            },

            onkeydown(event){
                // console.log('onkeydown', event)
                if (event.key === 'Enter' && this.query_command_value(this.formatBlock) === 'blockquote') {
                    setTimeout(() => this.exec(this.formatBlock, `<${this.defaultParagraphSeparator}>`), 0)
                }
            },

            run(result){
                let c = this.defaultActions.find(x => x.title == 'Code')

                if(c._class.includes(this.selectedClasses)){

                }
            },

            check_selected(btn, e){
                let a = this.defaultActions[btn],
                    button = e.target

                if(a && a.state){
                    button.classList[a.state() ? 'add' : 'remove'](this.selectedClasses)
                }
            },

            getHtml(){
                if(this.$refs.editable){
                    return this.$refs.editable.innerHTML
                }
                return ''
            },

            check(){
                for(let x in this.defaultActions.filter(k => k.state)){
                    let button = this.defaultActions[x]

                    if(button.state()){
                        button._class.push(this.selectedClasses)
                    }else{
                        button._class = button._class.filter(x => x != this.selectedClasses)
                    }
                    // console.log(button.state(), button._class)
                    // button.classList[button.state() ? 'add' : 'remove']()

                }
            },
            escapeHtml(unsafe) {
                return unsafe
                     .replace(/&/g, "&amp;")
                     .replace(/</g, "&lt;")
                     .replace(/>/g, "&gt;")
                     .replace(/"/g, "&quot;")
                     .replace(/'/g, "&#039;")
            },
            unEscapeHtml(safe) {
                return safe
                     .replace(/&amp;/g, '&')
                     .replace(/&lt;/g, '<')
                     .replace(/&gt;/g, '>')
                     .replace(/&quot;/g, '"')
                     .replace(/&#039;/g, "'")
            },
        },
        mounted(){
        }
    }
</script>