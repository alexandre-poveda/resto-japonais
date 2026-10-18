import { RESTAURANT_INFO, MENU_ITEMS, STORY_CONTENT } from './restaurantData';

const MENU_STORAGE_KEY = 'yugen_menu_items_v1';
const INFO_STORAGE_KEY = 'yugen_restaurant_info_v1';
const STORY_STORAGE_KEY = 'yugen_story_content_v1';
const RESERVATIONS_STORAGE_KEY = 'yugen_reservations_v1';

// Initial sample reservations so the manager has data immediately visible
const DEFAULT_RESERVATIONS = [
  {
    id: 'YG-849201',
    name: 'Sophie Marceau',
    email: 'sophie.m@gmail.com',
    phone: '+33 6 42 18 90 12',
    guests: '2',
    date: '2026-10-24',
    time: '20:00',
    notes: 'Anniversaire de mariage, préférence pour le comptoir Omakase.',
    status: 'confirmée',
    createdAt: '2026-10-18T14:30:00.000Z'
  },
  {
    id: 'YG-394812',
    name: 'Kenji Sato',
    email: 'k.sato@tokyo-art.jp',
    phone: '+33 7 89 01 23 45',
    guests: '4',
    date: '2026-10-25',
    time: '19:30',
    notes: 'Sans gluten pour un convive.',
    status: 'en_attente',
    createdAt: '2026-10-18T16:15:00.000Z'
  }
];

// --- MENU STORAGE ---
export function getStoredMenu() {
  if (typeof window === 'undefined') return MENU_ITEMS;
  try {
    const raw = localStorage.getItem(MENU_STORAGE_KEY);
    if (!raw) return MENU_ITEMS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : MENU_ITEMS;
  } catch (e) {
    return MENU_ITEMS;
  }
}

export function saveStoredMenu(items) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('yugen_data_updated'));
  } catch (e) {
    console.error('Failed to save menu:', e);
  }
}

export function resetStoredMenu() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(MENU_STORAGE_KEY);
  window.dispatchEvent(new Event('yugen_data_updated'));
  return MENU_ITEMS;
}

// --- RESTAURANT INFO STORAGE ---
export function getStoredInfo() {
  if (typeof window === 'undefined') return RESTAURANT_INFO;
  try {
    const raw = localStorage.getItem(INFO_STORAGE_KEY);
    if (!raw) return RESTAURANT_INFO;
    const parsed = JSON.parse(raw);
    return { ...RESTAURANT_INFO, ...parsed };
  } catch (e) {
    return RESTAURANT_INFO;
  }
}

export function saveStoredInfo(info) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(INFO_STORAGE_KEY, JSON.stringify(info));
    window.dispatchEvent(new Event('yugen_data_updated'));
  } catch (e) {
    console.error('Failed to save info:', e);
  }
}

export function resetStoredInfo() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(INFO_STORAGE_KEY);
  window.dispatchEvent(new Event('yugen_data_updated'));
  return RESTAURANT_INFO;
}

// --- STORY STORAGE ---
export function getStoredStory() {
  if (typeof window === 'undefined') return STORY_CONTENT;
  try {
    const raw = localStorage.getItem(STORY_STORAGE_KEY);
    if (!raw) return STORY_CONTENT;
    const parsed = JSON.parse(raw);
    return { ...STORY_CONTENT, ...parsed };
  } catch (e) {
    return STORY_CONTENT;
  }
}

export function saveStoredStory(story) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORY_STORAGE_KEY, JSON.stringify(story));
    window.dispatchEvent(new Event('yugen_data_updated'));
  } catch (e) {
    console.error('Failed to save story:', e);
  }
}

export function resetStoredStory() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORY_STORAGE_KEY);
  window.dispatchEvent(new Event('yugen_data_updated'));
  return STORY_CONTENT;
}

// --- RESERVATIONS STORAGE ---
export function getStoredReservations() {
  if (typeof window === 'undefined') return DEFAULT_RESERVATIONS;
  try {
    const raw = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(DEFAULT_RESERVATIONS));
      return DEFAULT_RESERVATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_RESERVATIONS;
  } catch (e) {
    return DEFAULT_RESERVATIONS;
  }
}

export function addReservation(reservation) {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredReservations();
    const updated = [reservation, ...current];
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('yugen_data_updated'));
  } catch (e) {
    console.error('Failed to add reservation:', e);
  }
}

export function updateReservationStatus(id, newStatus) {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredReservations();
    const updated = current.map(r => r.id === id ? { ...r, status: newStatus } : r);
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('yugen_data_updated'));
  } catch (e) {
    console.error('Failed to update reservation:', e);
  }
}

export function deleteReservation(id) {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredReservations();
    const updated = current.filter(r => r.id !== id);
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('yugen_data_updated'));
  } catch (e) {
    console.error('Failed to delete reservation:', e);
  }
}
