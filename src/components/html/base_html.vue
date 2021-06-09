<script>
    export default {
        name    : 'base-html',
        props   : {
            html : {
                type    : String,
                default : '',
            },
        },
        render: function (createElement) {


            return createElement(
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