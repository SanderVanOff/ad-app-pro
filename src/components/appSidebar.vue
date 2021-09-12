<template>
  <aside
    class="text-light p-0 position-sticky left-0"
  >
    <ul class="nav h-100">
      <li class="nav-item w-100" v-for="link of links" :key="link.name">
        <router-link
          class="
            nav-link
            link-light
            bg-dark
            border border-white
            rounded
            h-100
            w-100
            d-flex
            flex-column
            justify-content-center
            align-items-center
            position-relative
          "
          aria-current="page"
          active-class="active"
          exact
          :to="{ name: link.name}"
        >
          <span
            v-if="link.notify && ActiveMessage.length"
            class="
              badge
              rounded-pill
              bg-warning
              text-dark
              position-absolute
              top-0
              end-0
              mt-2
              me-2
            "
            >{{ showActiveMessages ? ActiveMessage.length : "" }}</span
          >
          <span class="icon"><i class="fs-4" :class="link.icon"></i></span>
          <span class="btn-text">{{ link.title }}</span></router-link
        >
      </li>
    </ul>
  </aside>
</template>

<script>
//Vuex
import { mapGetters } from "vuex";

export default {
  name: "appSidebar",
  data: () => ({
    links: [
      {
        name: "Home",
        title: "Главная",
        icon: "fas fa-campground",
        notify: false,
      },
      { name: "Own", title: "Моё", icon: "fas fa-child", notify: false },
      {
        name: "Favorites",
        title: "Избранное",
        icon: "far fa-heart",
        notify: false,
      },
      {
        name: "MessageList",
        title: "Сообщения",
        icon: "far fa-comment",
        notify: true,
      },
      {
        name: "Profile",
        title: "Профиль",
        icon: "far fa-user-circle",
        notify: false,
      },
    ],
  }),

  computed: {
    ...mapGetters(["ActiveMessage", "currentUser"]),
    showActiveMessages() {
      const ar = this.ActiveMessage.some(
        (item) => item.ownerID !== this.currentUser.id
      );
      return ar;
    },
  },
};
</script>

<style lang="scss" scoped>
aside {
  z-index: 1021;
  height: calc(100vh - 3.5rem); 
  top: 3.5rem
}

@media (max-width: 576px) {
  aside {
    position: fixed !important;
    height: auto;
    bottom: 0;
    width: 100%;
    top: auto;
  }

  .nav {
    height: auto !important;
    flex-wrap: nowrap;
  }
  .nav-item {
    height: 60px;
  }

  .btn-text {
  display: none;
  }
}
</style>