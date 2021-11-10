// import { carService } from '../services/car-service.js';

export default {
    template: `
        <section class="note-add" @click.stop="editing =false">
            <div >
            <form class ="new-note" v-if="editing" @blur="editing =!editing"> 
                <input type="text" placeholder="Title" ><br/>
                <input type="text" placeholder="Take a note...">
            </form>
            <input class="add-start" v-else type="text" @click="editing =!editing"  placeholder="Take a note..." autofocus>
            </div>
            <!-- <h3>Add a new car</h3>
            <form v-if="carToEdit" @submit.prevent="save" >
                <input v-model="carToEdit.vendor" type="text" placeholder="Vendor">
                <input v-model.number="carToEdit.maxSpeed" type="number" placeholder="Max speed">
                <button>Save</button>
            </form> -->
        </section>
    `,
    data() {
        return {
            carToEdit: null,
            editing: false
        };
    },
    // created() {
    //     const { carId } = this.$route.params;
    //     if (carId) {
    //         carService.getById(carId)
    //             .then(car => this.carToEdit = car);
    //     } else {
    //         this.carToEdit = carService.getEmptyCar();
    //     }
    // },
    // methods: {
    //     save() {
    //         carService.save(this.carToEdit)
    //             .then(car => this.$router.push('/car'));
    //     }
    // }
};