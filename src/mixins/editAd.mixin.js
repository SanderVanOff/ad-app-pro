export default {
  data: () => ({
    done: false,
    contacts: false,
    formValues: {
      condition: "use",
      title: "",
      description: "",
      cost: 0,
      city: "",
      delivery: false,
      phone: "",
      mainImage: 0,
      imagesFiles: [],
      communication: "onlyMessage",
    },
  }),
  methods: {
    getParams(params) {
      this.formValues.condition = params.condition;
      this.formValues.title = params.title;
      this.formValues.description = params.description;
      this.formValues.cost = params.cost;
      this.formValues.city = params.city;
      this.formValues.delivery = params.delivery;
    },

    getPhotos(photosData) {
      this.formValues.mainImage = photosData.mainImageIndex;
      this.formValues.images = photosData.loadedImages;
      this.formValues.imagesFiles = photosData.imagesFiles;
    },

    withoutPhotos() {
        this.done = true;
        this.formValues.mainImage = 0;
      },

    getContact({ phone, communication }) {
      this.formValues.phone = phone;
      this.formValues.communication = communication;
    },

    doneParams(value = false){
        this.done = true
        this.contacts = value;
      },
  },
};
