<template>
  <div id="app">
    <app-notification v-if="notification"/>
    <component :is="`${layout}-layout`"></component>
  </div>
</template>

<script>
//components
import MainLayout from "@/layouts/MainLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import AppNotification from '@/components/ui/appNotification.vue';

//Vuex
import {mapGetters} from "vuex"

export default {
  name: "App",
  components: { MainLayout, EmptyLayout, AppNotification },
  computed: {
    ...mapGetters('notification'),
    layout() {
      return this.$route.meta.layout || "empty";
    },
  },

};
</script>

<style>
</style>
