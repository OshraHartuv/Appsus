import longText from '../../../cmps/long-text.cmp.js';
import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
    template: `
          <section class="mail-details app-main" v-if="mail">
              <h3>{{ subjectToShow }}</h3>
              <ul  class="mail-details">
                  <li>mail details</li>
                  <li>mail details</li>
                  <li>mail details</li>
                  <li>mail details</li>
                <!-- <li>
                  <span class="underline">Author:</span>
                  {{ (book.authors).join(' , ') }}
                </li>
                <li>
                  <span class="underline">Subtitle:</span>
                  {{ book.subtitle }}
                </li>
                <li>
                  <span class="underline">Published at:</span>
                     {{ publishedToShow }}
                    </li>
                    <li>
                      <span class="underline">Description:</span> 
                      <long-text :txt="book.description"/>
                  </li>
                  <li>
                    <span class="underline">PageCount:</span>
                    {{ pagesToShow }} 
                  </li>
                  <li>
                    <span class="underline">Categories:</span>
                    {{ (book.categories).join(' , ') }}
                  </li>
                  <li>
                    <span class="underline">Language:</span> {{ book.language }}
                  </li>
                  <li>
                    <span class="underline">Price:</span >
                    <span :class="priceStyle"> 
                      {{ priceToShow }} 
                    </span>
                  </li> -->
                </ul>
                
                <!-- <p v-if="!book.reviews || !book.reviews.length">No reviews</p>
                <div v-else class="reviews">
                  <h1 class="underline">reviews:</h1>
                  <div class="reviews-container">
                    <ul v-for="(review, idx) in book.reviews" class="review-container">
                  <li> <span class="underline">Review from:</span> {{review.fullName}}</li>
                  <li><span class="underline">Rating:</span> 
                  <span v-for="num in review.rate" class="fa fa-star checked">
                    </span> </li>
                    <li><span class="underline"> Read at:</span> {{review.readAt}} </li>
                    <li><div class="underline">Review:</div> {{review.content}} </li>
                    <button @click=remove(idx)>Delete</button>
                  </ul>
                </div> -->
              </div>
              
          <router-link :to="'/book/'+ this.book.id +'/review-add'">Add review</router-link>
          <router-link :to="'/book/'+previousBookId"><< Previous book</router-link>
          <router-link :to="'/book/'+nextBookId">Next book >></router-link>
          <router-link to="/book" class="close-details">x</router-link>
          </section>
      `,
    data() {
      return {
        mail: null,
        nextMailId: null,
        previousMailId: null
      };
    },
    created() {
      const { bookId: mailId } = this.$route.params;
      mailService.getById(mailId).then((mail) => (this.mail = mail));
    },
    watch: {
      '$route.params.mailId': {
        handler() {
          const { bookId: mailId } = this.$route.params;
          mailService.getById(mailId)
              .then(mail => this.mail = mail);
          mailService.getNextBookId(mailId)
              .then(mailId => this.nextMailId = mailId);
          mailService.getPreviousBookId(mailId)
              .then(mailId => this.previousMailId = mailId);
  
        },
        immediate: true,
      },
    },
    methods: {
    //   remove(idx) {
    //     this.mail.reviews.splice(idx, 1);
    //     mailService
    //       .save(this.mail)
    //       .then(() => {
    //         const msg = {
    //           txt: 'Mail deleted successfully',
    //           type: 'success',
    //         };
    //         eventBus.$emit('showMsg', msg);
    //       })
    //       .catch((err) => {
    //         console.log('err', err);
    //         const msg = {
    //           txt: 'Error. Please try later',
    //           type: 'error',
    //         };
    //         eventBus.$emit('showMsg', msg);
    //       });
    //   },
    },
    computed: {
      subjectToShow() {
        return this.mail.subject[0].toUpperCase() + this.mail.subject.substring(1);
      },
    },
    components: {
      longText,
    },
  };
  
