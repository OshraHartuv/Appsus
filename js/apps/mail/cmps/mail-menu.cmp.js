export default {
    template: `
          <section class="mail-menu">
              <button>Compose</button>
              <ul class="clean-list">
                <li  @click="box('all')">All mail</li>
                <li  @click="box('inbox')">Inbox</li>
                <li @click="box('sent')">Sent</li>
                <li>Starred</li>
                <li>Drafts</li>
                <li>Labels</li>
                <ul >
                    <li>label</li>
                    <li>label</li>
                    <li>label</li>
                </ul>    
              </ul>            

          </section>
      `,
      data(){
          return {
              currBox:null
          }
      },
      methods:{
        box(box){
            this.currBox = box
            // console.log(this.currBox);
            this.$emit('mailBoxed', this.currBox)
        }
      }
}