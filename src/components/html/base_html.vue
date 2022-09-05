<script>
    import { h } from 'vue'
    export default {
        name    : 'BaseHtml',
        props   : {
            html : {
                type    : String,
                default : '',
            },
        },
        render: function () {


            return h(
                'img',   // tag name
                {
                    class : this.classes,
                    attrs : attrs,
                    ref   : 'img'
                }
            )
        }
    }
</script>