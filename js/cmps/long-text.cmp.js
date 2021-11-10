export default {
    props: ['txt'],
    template: `
          <div>
          <p>{{ txtToShow }}</p>
          <button v-if="overOneHundred" @click="showMore = !showMore" class="show-more-btn">{{ btnTxt }}</button>
          </div>
      `,
    data() {
        return {
            overOneHundred: (this.txt.length <= 100) ? false : true,
            showMore: false,
        };
    },
    computed: {
        txtToShow() {
            if (this.txt.length <= 100) return this.txt;
            else {
                return (this.showMore) ? this.txt : this.txt.substring(0, 101) + '...';
            }
        },
        btnTxt() {
            if (this.showMore) return 'Read less'
            else return 'Read more'
        }
    },
};
