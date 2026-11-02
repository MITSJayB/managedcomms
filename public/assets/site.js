// Shows the days left until the PSTN switch-off. The fallback text stays if the date has passed.
document.querySelectorAll('[data-until]').forEach((el) => {
  const days = Math.ceil((new Date(`${el.dataset.until}T00:00:00Z`) - Date.now()) / 86400000);
  if (days > 1) el.textContent = `${days} days`;
});
