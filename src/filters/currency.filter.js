export function formatCurrency(value, currency = "RUB") {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0
  }).format(value);
}

export function formatCurrencyNumbers(value) {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0
  }).format(value);
}
