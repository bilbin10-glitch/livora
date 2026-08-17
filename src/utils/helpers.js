// Livora helper utilities

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateBookingId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `LVR-${new Date().getFullYear()}-${rand}`;
}

export function downloadICSFile(event, booking) {
  const title = encodeURIComponent(event.title);
  const description = encodeURIComponent(`Livora Booking Pass ID: ${booking.id}\nVenue: ${event.venue}\nSeats: ${booking.selectedSeats.join(', ')}\nTier: ${booking.tier.name}`);
  const location = encodeURIComponent(`${event.venue}, ${event.address}`);
  
  // Format start & end date
  const cleanDate = event.date.replace(/-/g, '');
  const dtStart = `${cleanDate}T190000Z`;
  const dtEnd = `${cleanDate}T220000Z`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Livora Inc//Live Entertainment Pass//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${event.title}`,
    `UID:${booking.id}@livora.app`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `Livora_${booking.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
