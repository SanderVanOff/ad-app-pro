<template>
  <section>
    <h5 class="mb-3">{{$route.name === 'EditAd' ? "Отредактируйте фото": "Добавьте фото"}}
    <small class="mb-3 text-muted">(c фото ваше объявление будет заметнее)</small>
    </h5>
    <div class="d-flex">
    <input
      class="form-control d-none"
      type="file"
      id="formFileMultiple"
      multiple
      @change="loadImage"
      ref="inputImgFile"
    />
    <div class="create-add-form__images mb-3">
      
      <!-- LOADED-images -->
      <div class="loadedImages d-inline" v-if="imagesData.loadedImages">
      <span
        class="form-added-image-wrapper position-relative"
        v-for="(img, i) of imagesData.loadedImages"
        :key="img"
      >
        <button
          type="button"
          class="btn-close position-absolute top-minus-5 right-1"
          @click="removeImg(i, 'loadedImages')"
          aria-label="Close"
        ></button>
        <img
          :src="img"
          class="rounded form-added-images me-2 mb-2 cursor-pointer"
          @click="choiceMainImg(img)"
          :class="{
            'border border-success border-3': defaultMainImage === i,
          }"
        />
      </span>
      </div>
      <!--  -->
      <span
        class="form-added-image-wrapper position-relative"
        v-for="(img, i) of imagesData.images"
        :key="img"
      >
        <button
          type="button"
          class="btn-close position-absolute top-minus-5 right-1"
          @click="removeImg(i, 'images')"
          aria-label="Close"
        ></button>
        <img
          :src="img"
          class="rounded form-added-images me-2 mb-2 cursor-pointer"
          @click="choiceMainImg(img)"
          :class="{
            'border border-success border-3': defaultMainImage === i + isloadedImagesLength,
          }"
        />
      </span>
      <button
        type="button"
        class="btn btn-outline-dark btn-add-photo me-2 mb-2"
        @click="alertInputFile"
      >
        <i class="fas fa-camera-retro fs-1"></i>
      </button>
    </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "v-photos",
  props: ['ad'],
  data: () => ({
    defaultMainImage: 0,
    loadedImagesLength: 0,
    mainImage: null,
    imagesData: {
      mainImageIndex: 0,
      loadedImages: [],
      images: [],
      imagesFiles: [],
    },
  }),

  computed: {
    title() {
      return this.$route.name
    },
    isIndexImage() {
      let images = this.imagesData.loadedImages.concat(this.imagesData.images);
      let idx = images.findIndex((item) => item === this.mainImage)
      return idx;
    },
    isloadedImagesLength(){
      return this.imagesData.loadedImages.length
    }
  },

  methods: {
    alertInputFile() {
      this.$refs.inputImgFile.click();
    },

    loadImage() {
      this.$refs.inputImgFile.files.forEach((file, i) => {
      
        this.imagesData.imagesFiles.push(file);
        let urlImg = URL.createObjectURL(this.$refs.inputImgFile.files[i]);
        this.imagesData.images.push(urlImg);
      });
    },

    choiceMainImg(image) {
      this.mainImage = image;
      //       
    },

    removeImg(i, array) {
      this.imagesData[array].splice(i, 1);
      if(array === 'images') this.imagesData.imagesFiles.splice(i, 1);
    },

    sendDataToParent(){
      this.$emit('get-photos', this.imagesData)
    }
  },

  mounted(){
      this.$emit('done');
      if(this.ad) {
        this.loadedImagesLength = this.ad.images.length;
        this.imagesData.loadedImages = this.ad.images;
      }    
  },

  watch: {
    imagesData: {
      handler: 'sendDataToParent',
      deep: true
    },

    isIndexImage(idx){
      this.imagesData.mainImageIndex = idx;
      this.defaultMainImage = idx;
    }
  },
};
</script>

<style lang="scss" scoped>
.form-added-images {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
.btn-add-photo {
  width: 200px;
  height: 200px;
}
</style>