export async function requestNotifyPermission(): Promise<void> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    throw new Error('Notifications not supported in this browser.');
  }
  if (Notification.permission === 'granted') return;
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') {
    throw new Error('Notification permission denied.');
  }
}

export function showLocalNotification(title: string, body: string) {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;
  new Notification(title, { body, icon: '/favicon.ico' });
}
