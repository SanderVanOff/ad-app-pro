export default {
  data: () => ({
    status: {
      moderation: {
        text: "На модерации",
        class: "bg-info"
      },
      active: { text: "Активно", class: "bg-success" },
      cancelled: { text: "Отменено", class: "bg-danger" },
      closed: { text: "Закрыто", class: "bg-danger" }
    }
  }),
  methods: {
    getStatus(value) {
      return this.status[value];
    }
  }
};
