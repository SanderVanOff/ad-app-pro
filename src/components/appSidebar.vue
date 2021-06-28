<template>
  <aside
    class="text-light p-0 position-sticky left-0"
    style="height: calc(100vh - 3.5rem); top: 3.5rem"
  >
    <ul class="nav h-100">
      <li class="nav-item w-100" v-for="link of links" :key="link.name">
        <router-link
          class="nav-link link-light bg-dark border border-white rounded h-100 w-100 d-flex flex-column justify-content-center align-items-center position-relative"
          aria-current="page"
          active-class="active"
          exact
          :to="{ name: link.name }"
        >
          <span
            v-if="link.notify"
            class="badge rounded-pill bg-warning text-dark position-absolute top-0 end-0 mt-2 me-2"
            >2</span
          >
          <span class="icon"><i class="fs-4" :class="link.icon"></i></span>
          <span>{{ link.title }}</span></router-link
        >
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
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
};
</script>

<style lang="scss" scoped>
aside {
  z-index: 2;
}
</style>